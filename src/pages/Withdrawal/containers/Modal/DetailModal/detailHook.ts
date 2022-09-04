import { AppContext } from "@/pages/Withdrawal/contexts/AppContext"
import { getDetailBPOR, getDetailBPORDraft, getHistoriesDetail, getListProductBySellerId, getListWarehouse, updateBPOR } from "@/pages/Withdrawal/services"
import checkIsUseV2EndPoint from "@/pages/Withdrawal/utils/checkIsUseV2EndPoint"
import { deleteProductNumberWithdrawal, setNumberWithdrawal } from "@/pages/Withdrawal/utils/setDataCreate"
import { removeNullPropertyObject } from "@/utils"
import { useFormatMessage } from "@/utils/locale"
import { showErrorGeneral } from "@/utils/message"
import { message, Modal } from "antd"
import { useContext, useEffect, useState } from "react"
import { renderWarningStep2 } from "../CreateModal/Footer/helper"
import { convertListWarehouse } from "../CreateModal/StepScreen/Step2/helper"

export const useDetailHook = () => {
  const formatMessage = useFormatMessage()
  const { detailModalData, setDetailModalData, query, setQuery, fetchList: fetchListing } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDraft, setIsLoadingDraft] = useState(false)
  const [isChange, setIsChange] = useState(false)

  const [detail, setDetail] = useState<any>()
  const [warehouse, setWarehouse] = useState<any[]>([])
  const [items, setItems] = useState([])

  const [histories, setHistories] = useState()

  const [isShowImportModal, setIsShowImportModal] = useState(false)



  const { tab, selectedId } = query;
  const sellerId = query?.sellerId

  const getListProduct = async (skus: any = [], itemsParam = [], warehouseCode: any) => {
    try {
      setIsLoadingDraft(true)
      const cursor = 0
      const tempDataPayload = {
        seller_ids: [sellerId],
        skus,
      }
      const dataPayload = removeNullPropertyObject(tempDataPayload);

      const response = await getListProductBySellerId({ cursor, dataPayload, limit: 1000 })
      if ('error' in response) {
        throw new Error(response?.error?.message);
      }
      const dataListProduct = response?.data.map((i: any) => {
        const tempItem = { ...i }
        const qtyAvailable = tempItem?.inventory?.qty_available
        if (!qtyAvailable || qtyAvailable <= 0) {
          tempItem.isDisable = true
        }
        const itemHaveInitValue: any = itemsParam.find((i: any) => i?.product_sku === tempItem?.sku)
        if (itemHaveInitValue) {
          tempItem.qty = itemHaveInitValue?.expected_qty
          setNumberWithdrawal(warehouseCode, tempItem?.sku, itemHaveInitValue?.expected_qty, undefined, undefined)
        }
        return tempItem
      })

      setItems(dataListProduct)
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoadingDraft(false)
    }
  }


  const onGetListWarehouse = async (skus: any) => {
    try {
      setIsLoading(true)
      const params = {
        items: skus,
        seller_id: sellerId
      }
      const response = await getListWarehouse(params)
      if ('error' in response) {
        throw new Error(response?.error?.message);
      }
      const warehouseConvert: any[] = convertListWarehouse(response?.data)
      //  setWarehouseSelected(warehouseConvert)
      setWarehouse(warehouseConvert)
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }



  const getItemsDataInit = async (response: any) => {
    try {
      const paramsGetListProduct: any[] = []
      const paramsGetListWarehouse: any[] = []

      response?.items.forEach((i: any) => {
        const sku = i?.product_sku
        paramsGetListProduct.push(sku)
        paramsGetListWarehouse.push({ sku: sku })
      })
      getListProduct(paramsGetListProduct, response?.items, response.warehouse_code)
      onGetListWarehouse(paramsGetListWarehouse)
    } catch (error) {
      showErrorGeneral()
    }


  }





  const fetchHistories = async () => {
    try {
      const isCallV2Api = checkIsUseV2EndPoint(tab);
      if (isCallV2Api) {
        const response = await getHistoriesDetail(selectedId);
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        setHistories(response?.data)
      }

    } catch (error: any) {
      showErrorGeneral();
    }
  };

  const fetchDetail = async () => {
    try {
      setIsLoading(true);
      const isCallV2Api = checkIsUseV2EndPoint(tab);
      if (isCallV2Api) {
        const response = await getDetailBPOR(selectedId);
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        setDetail(response)

      } else {
        const response = await getDetailBPORDraft(selectedId);
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        setDetail(response)
        getItemsDataInit(response)
      }


    } catch (error: any) {
      showErrorGeneral();
    } finally {
      setIsLoading(false)
    }
  };

  const initData = () => {
    fetchDetail();
    fetchHistories();
  }

  useEffect(() => {
    initData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])






  const onChangeValueItem = ({ sku, value }: any) => {
    const temp: any = [...items]
    const index = temp.findIndex((i: any) => i?.sku === sku);
    const tempItem = temp[index]
    temp[index] = { ...tempItem, qty: value }
    setIsChange(true)
    setItems(temp)
  }

  const onRemoveItem = (record: any) => {
    try {
      const sku = record?.sku
      const temp = [...items]
      const index = temp.findIndex((i: any) => i?.sku === sku);
      if (index !== -1) {
        temp.splice(index, 1);
        deleteProductNumberWithdrawal(sku, undefined)
        setIsChange(true)
        setItems(temp)
      }
      return null;
    } catch (error) {
      return showErrorGeneral()
    }
  }

  const onCloseDetailModal = () => {
    setDetailModalData({
      isVisible: false
    })
    setQuery({ ...query, selectedId: null })
  }

  const onCloseCondition = () => {
    if (!isChange) return onCloseDetailModal()
    return Modal.confirm({
      title: formatMessage({ id: 'Thoát' }),
      content: formatMessage({ id: 'Có thay đổi chưa lưu. Bạn vẫn muốn thoát?' }),
      okText: formatMessage({ id: 'Đóng' }),
      cancelText: formatMessage({ id: 'Quay lại' }),
      onOk: () => onCloseDetailModal()
    })
  }

  const renderErrorText = () => {
    if (!items || items.length === 0) return formatMessage({ id: 'Vui lòng thêm sản phẩm' })
    let isMissingValue = true
    items.forEach((i: any) => {
      if (i.qty) {
        isMissingValue = false
      }
    })
    return isMissingValue ? formatMessage({ id: 'Vui lòng thêm số lượng mong muốn' }) : ''
  }

  const checkIsCanDraft = () => {
    if (!isChange) return false
    let rs = false
    items.forEach((i: any) => {
      if (i.qty) {
        rs = true
      }
    })
    return rs
  }

  const checkIsCanSave = () => {
    let rs = false
    items.forEach((i: any) => {
      if (i.qty) {
        rs = true
      }
    })
    return rs
  }

  const onSubmit = (isDraft: boolean) => {
    const onEditBPOR = async (isDraftParam: boolean) => {
      try {
        setIsLoading(true)
        const itemsParams: any = []
        items.forEach((i: any) => {
          if (i?.qty) {
            itemsParams.push({
              product_sku: i?.sku,
              expected_qty: i?.qty
            })
          }
        })
        const data: any = {
          items: itemsParams
        }
        if (!isDraftParam) {
          data.status = 'waiting_for_checking'
        }
        const response = await updateBPOR(data, detail?.id)
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        setIsChange(false)
        await initData()
        fetchListing()
      } catch (error) {
        return { error }
      } finally {
        setIsLoading(false)
      }
    }
    let missingValue = false
    items.forEach((i: any) => {
      if (!(i.qty)) {
        missingValue = true
      }
    })

    Modal.confirm({
      title: formatMessage({ id: 'Thông báo' }),
      content: missingValue ? renderWarningStep2() : formatMessage({ id: 'Bạn có muốn tiếp tục' }),
      cancelText: formatMessage({ id: 'Kiểm tra' }),
      closable: true,
      okText: formatMessage({ id: 'Tiếp tục' }),
      onOk: () => onEditBPOR(isDraft),
    })

  }


  const onSaveInput = async (dataPayload: any) => {
    try {
      setIsLoading(true)
      const data = {
        reference_code: dataPayload?.referenceCode,
        note: dataPayload?.note,
        warehouse_code: dataPayload?.warehouseCode
      }
      const dataFinal = removeNullPropertyObject(data)

      const response = await updateBPOR(dataFinal, detail?.id)
      if ('error' in response) {
        throw new Error(response?.error?.message);
      }
      await initData()
      fetchListing()
    } catch (error) {
      return { error }
    } finally {
      setIsLoading(false)
    }
  }

  const onOpenImportProductModal = () => setIsShowImportModal(true)
  const onCloseImportProductModal = () => setIsShowImportModal(false)

  const onChooseProductCB = (data = []) => {
    try {
      const paramsGetListWarehouse: any[] = []

      data.forEach((i: any) => {
        const sku = i?.sku
        paramsGetListWarehouse.push({ sku: sku })
      })
      onGetListWarehouse(paramsGetListWarehouse)

      const dataListProduct: any = data.map((i: any) => {
        const tempItem = { ...i }
        const qtyAvailable = tempItem?.inventory?.qty_available
        if (!qtyAvailable || qtyAvailable <= 0) {
          tempItem.isDisable = true
        }
        const itemHaveInitValue: any = items.find((i: any) => i?.sku === tempItem?.sku)

        if (itemHaveInitValue) {
          tempItem.qty = itemHaveInitValue?.qty
          setNumberWithdrawal(detail?.warehouse_code, tempItem?.sku, itemHaveInitValue?.qty, undefined, undefined)
        }
        return tempItem
      })

      setItems(dataListProduct)
      setIsChange(true)

    } catch (error) {
      showErrorGeneral()
    }
  }



  return {
    isVisible: detailModalData?.isVisible,
    onCloseDetailModal: onCloseCondition,
    isLoading,
    detail,
    histories,
    warehouse,
    items,
    isLoadingDraft,
    onChangeValueItem,
    onRemoveItem,
    isChange,
    checkIsCanDraft,
    checkIsCanSave,
    onSubmit,
    onSaveInput,
    renderErrorText,
    isShowImportModal,
    onOpenImportProductModal,
    onCloseImportProductModal,
    onChooseProductCB,
    sellerId
  }
}