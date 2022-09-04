import { CreateContext } from "@/pages/Withdrawal/contexts/CreateContext";
import { removeNullPropertyObject } from "@/utils";
import { useContext } from "react";
import isEmpty from 'lodash/isEmpty'
import { updateBPOR } from "@/pages/Withdrawal/services";
import { clearFinishDataModal, getFinishDataModal } from "@/pages/Withdrawal/utils/setDataModal";
import { showErrorGeneral, showMessageSuccessGeneral } from "@/utils/message";
import { useFormatMessage } from "@/utils/locale";
import { TAB_NAME } from "@/pages/Withdrawal/constants/tab";
export const useFinishModal = () => {
  const {
    finishModalData, setFinishModalData, setIsLoading, onCloseCreateModal, setQuery
  }
    = useContext(CreateContext);

  const formatMessage = useFormatMessage()

  const isDraft = finishModalData?.isDraft

  const onSaveAndClose = async (id: any,) => {
    const finishDataModal = getFinishDataModal()
    try {
      if (!isDraft) {
        return onClose()
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
        resArr.forEach(res => {
          const referenceCodeItem = res?.reference_code
          if (referenceCodeItem) {
            referenceCodeParam = !referenceCodeParam ? referenceCodeItem : `${referenceCodeParam},${referenceCodeItem}`
          }
        })
        const paramEdit = {
          reference_code: referenceCodeParam, tab: TAB_NAME.DRAFT
        }
        // if (referenceCodeParam) {
        //   paramEdit.reference_code = referenceCodeParam
        // }
        setQuery({ ...paramEdit })

        setIsLoading(false)
        showMessageSuccessGeneral(formatMessage({ id: 'Lưu nháp thành công' }))
        onClose()
      }).catch(_ => {
        setIsLoading(false)
        showErrorGeneral()
        onClose()
        return _
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
  }

  // const onSaveAndClose = async () => {
  //   if(!isDraft){
  //     setFinishModalData({
  //       isVisible: false
  //     })
  //     onCloseCreateModal()
  //   }
  //   setIsLoading(true)
  //   await delay(1000)
  //   setIsLoading(false)



  // }

  return {
    isShowModalFinish: finishModalData?.isVisible,
    data: finishModalData?.data,
    isDraft,
    total: finishModalData?.data?.length,
    onSaveAndClose,
    onClose
  }
}