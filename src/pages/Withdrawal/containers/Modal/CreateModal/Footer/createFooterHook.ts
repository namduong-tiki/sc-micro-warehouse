import { CreateContext } from "@/pages/Withdrawal/contexts/CreateContext";
import { useFormatMessage } from "@/utils/locale";
import { showErrorGeneral } from "@/utils/message";
import { useContext } from "react";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { cleanNumberWithDrawal } from "@/pages/Withdrawal/utils/setDataCreate";
import { Modal } from "antd";
import { renderWarningStep2 } from "./helper";
import { onCreateBPOR } from "@/pages/Withdrawal/services";

const MAX_PRODUCT_PER_REQUEST = 1000;

export const useCreateFooter = () => {
  const {
    currentStep,
    setCurrentStep,
    setIsLoading,
    isLoading,
    onCloseCreateModal,
    listSelected = [],
    setWarehouseSelected,
    numberWithdrawalSelected,
    sellerIdSelected,
    createData,
    setCreateData,
    setFinishModalData
  }
    = useContext(CreateContext);

  const formatMessage = useFormatMessage()

  const onCreateBPORHandle = async (isDraft = false) => {
    const onCreate = async (params: any) => {
      try {

        const response = await onCreateBPOR(params)
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        return response
      } catch (error: any) {
        showErrorGeneral(error)
      }
    }
    setIsLoading(true)

    const createDataFinal = isDraft && currentStep === 2 ? handleConvertCreateData() : createData

    const paramsCreateBPOR = createDataFinal.map((i: any) => {
      const rs: any = {
        seller_id: sellerIdSelected,
        pickup_method: 'supplier',
        warehouse_code: i?.code,
        items: i?.items,
        pickup_warehouse_code: i?.tikiReturnWarehouse
      }
      if (!isDraft) {
        rs.status = 'waiting_for_checking'
      }
      return rs
    })

    const results = await Promise.all(
      paramsCreateBPOR.map(async (params: any) => {
        const rs = await onCreate(params);
        return rs;
      })
    );
    setFinishModalData({
      data:results,
      isVisible:true,
      isDraft
    })

  }

  const handleConvertCreateData = () => {
    const tempArr: any = []
    let index = 0
    for (const property in numberWithdrawalSelected) {
      const warehouseItem = get(numberWithdrawalSelected, [property])
      let total = 0;
      let countProduct = 0
      const items = []

      for (const property2 in warehouseItem) {
        if (property2 !== 'tikiReturnWarehouse') {
          const productItem = get(warehouseItem, [property2])
          total = get(productItem, ['value'], 0) + total
          countProduct = countProduct + 1;
          const itemTemp = {
            product_sku: property2,
            expected_qty: get(productItem, ['value'], 0)
          }
          items.push(itemTemp)
        }
      }
      const tempItem = {
        code: property,
        total,
        countProduct,
        index,
        items
      }
      tempArr.push(tempItem)
      index = index + 1
    }
    return tempArr
  }

  const onDraft = async () => {
    if (isLoading) return;
    try {
      if (currentStep === 2) {

        Modal.confirm({
          title: formatMessage({ id: 'Thông báo' }),
          content: renderWarningStep2(),
          cancelText: formatMessage({ id: 'Kiểm tra' }),
          closable: true,
          okText: formatMessage({ id: 'Tiếp tục' }),
          onOk: () => onCreateBPORHandle(true),
        })
      } if (currentStep === 3) {
        await onCreateBPORHandle(true)
      }
    } catch (error) {
      showErrorGeneral()
    } finally {
      setIsLoading(false)
    }

  }



  const onNext = async () => {
    if (isLoading) return;
    try {
      if (currentStep === 1) {
        setWarehouseSelected([])
        setCurrentStep(2)
      } if (currentStep === 2) {

        const onNextStep = () => {

          const tempArr = handleConvertCreateData()
          setCreateData(tempArr)
          setCurrentStep(3)
        }

        Modal.confirm({
          title: formatMessage({ id: 'Thông báo' }),
          content: renderWarningStep2(),
          cancelText: formatMessage({ id: 'Kiểm tra' }),
          closable: true,
          okText: formatMessage({ id: 'Tiếp tục' }),
          onOk: onNextStep,
        })
      } if (currentStep === 3) {
        await onCreateBPORHandle()
      }
    } catch (error) {
      showErrorGeneral()
    } finally {
      setIsLoading(false)
    }

  }

  const checkIsCanNext = () => {
    try {

      if (currentStep === 1) {
        return (listSelected.length > 0 && listSelected.length <= MAX_PRODUCT_PER_REQUEST)
      } if (currentStep === 2) {
        let rs = false
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, value] of Object.entries(numberWithdrawalSelected)) {
          const currentWarehouse: any = value
          if (!isEmpty(currentWarehouse)) {
            rs = true
          }
        }
        return rs
      } if (currentStep === 3) {
        let rs = true
        createData.forEach((i: any) => {
          if (!i?.tikiReturnWarehouse) {
            rs = false
          }
        })
        return rs
      }

      return false
    } catch (error) {
      return false
    }
  }

  const checkErrorText = (isCanNextParam: any) => {
    if (currentStep === 1) {
      let text = listSelected.length > 0 ? false : formatMessage({ id: 'bpor.please_select_product' })
      if (listSelected.length > MAX_PRODUCT_PER_REQUEST) {
        text = formatMessage({ id: 'Tổng sản phẩm không được lớn hơn 1000' })
      }
      return text
    } if (currentStep === 2) {
      return !isCanNextParam ? formatMessage({ id: 'Vui lòng điền số lượng rút kho dự kiến' }) : false
    }


    return false
  }



  const onCloseModal = () => {
    onCloseCreateModal()
    cleanNumberWithDrawal()
  }

  const onBack = () => {
    if (isLoading) return;
    setCurrentStep(currentStep - 1)
  }

  const checkIsCanBack = () => {
    if (currentStep === 1) {
      return false
    }
    return true
  }

  const isShowDraft = currentStep === 2 || currentStep === 3


  return {
    checkIsCanNext,
    onNext,
    checkErrorText,
    onCloseModal,
    currentStep,
    isLoading,
    onBack,
    checkIsCanBack,
    isShowDraft,
    onDraft,
  }
}