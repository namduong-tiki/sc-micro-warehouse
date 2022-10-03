import { CreateContext } from "@/pages/Withdrawal/contexts/CreateContext";
import { removeNullPropertyObject } from "@/utils";
import { useContext, useMemo } from "react";
import isEmpty from 'lodash/isEmpty'
import { updateBPOR } from "@/pages/Withdrawal/services";
import { clearFinishDataModal, getFinishDataModal } from "@/pages/Withdrawal/utils/setDataModal";
import { showErrorGeneral, showSuccessGeneral } from "@/utils/message";
import { useFormatMessage } from "@/utils/locale";
import { TAB_NAME } from "@/pages/Withdrawal/constants/tab";
import { AppContext } from "@/pages/Withdrawal/contexts/AppContext";
import { cleanNumberWithDrawal } from "@/pages/Withdrawal/utils/setDataCreate";

export const useFinishModal = () => {
  const {
    finishModalData, setFinishModalData, setIsLoading, onCloseCreateModal, isLoading
  }
    = useContext(CreateContext);
  const {
    query, setQuery
  } = useContext(AppContext)
  const { sellerId } = query

  const formatMessage = useFormatMessage()

  const isDraft = finishModalData?.isDraft

  const onSaveAndClose = async () => {
    const finishDataModal = getFinishDataModal()
    try {
      if (!isDraft) {
        onClose()
        setQuery({
          sellerId, tab: TAB_NAME.PROCESSING
        })
        return
      }

      const onChangeBPOR = async (id: any, dataPayload: any) => {
        try {
          const data = {
            reference_code: dataPayload?.referenceCode,
            note: dataPayload?.note,
          }

          const dataFinal = removeNullPropertyObject(data)
          if (isEmpty(dataFinal) || isEmpty(dataPayload)) return {}
          const response = await updateBPOR(data, id)
          if ('error' in response) {
            throw new Error(response?.error?.message);
          }
          return response

        } catch (error) {
          return { error }
        }
      };

      setIsLoading(true)

      Promise.all(
        finishDataModal.map(
          async (d) => {
            const id = d?.id;
            const dataPayload = {
              referenceCode: d?.data?.code,
              note: d?.data?.note,
            }
            const rs = await onChangeBPOR(id, dataPayload)

            return rs
          }
        )
      ).then((resArr) => {
        let referenceCodeParam: any
        if (resArr.length === 0) {
          const paramEdit: any = {
            tab: TAB_NAME.DRAFT, sellerId,
          }
          setQuery({ ...paramEdit })
          setIsLoading(false)
          onClose()
          return;
        }
        resArr.forEach(res => {
          const referenceCodeItem = res?.reference_code
          if (referenceCodeItem) {
            referenceCodeParam = !referenceCodeParam ? referenceCodeItem : `${referenceCodeParam},${referenceCodeItem}`
          }
        })
        const paramEdit: any = {
          tab: TAB_NAME.DRAFT, sellerId,
        }
        if (referenceCodeParam) {
          paramEdit.referenceCode = referenceCodeParam
        }
        setQuery({ ...paramEdit })

        setIsLoading(false)
        showSuccessGeneral(formatMessage({ id: 'Lưu nháp thành công' }), `Có ${resArr.length} phiếu rút hàng được lưu nháp`)
        onClose()
      }).catch((e: any) => {
        setIsLoading(false)
        showErrorGeneral('', e?.message)
        onClose()
      })

      // const data = {
      //   reference_code: dataPayload?.referenceCode,
      //   note: dataPayload?.note,
      // }

      // const dataFinal = removeNullPropertyObject(data)
      // if (isEmpty(dataFinal) || isEmpty(dataPayload)) return {}
      // const response = await updateBPOR(data, id)
      // if ('error' in response) {
      //   throw new Error(response?.error?.message);
      // }
      // return response

    } catch (error) {
      return { error }
    }
  };


  const onClose = () => {
    setFinishModalData({
      isVisible: false
    })
    onCloseCreateModal()
    clearFinishDataModal()
    cleanNumberWithDrawal()
  }


  const data = finishModalData?.data || []

  const dataHandle = useMemo(() => {
    let errorItem = 0
    let successItem = 0
    const temp: any = []
    data.forEach((i: any) => {
      if (i?.isError) {
        errorItem += 1;
      } else {
        successItem += 1;
        temp.push(i)
      }
    })
    return {
      errorItem,
      successItem,
      data: temp,
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length])

  return {
    isShowModalFinish: finishModalData?.isVisible,
    data: dataHandle?.data,
    isDraft,
    total: dataHandle?.successItem,
    totalError: dataHandle?.errorItem,
    onSaveAndClose,
    onClose,
    isLoading
  }
}