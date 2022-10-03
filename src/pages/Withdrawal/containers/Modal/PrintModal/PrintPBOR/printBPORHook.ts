import { AppContext } from "@/pages/Withdrawal/contexts/AppContext"
import { getBPORBusiness, getDetailBPOR, getTikiReturnWarehouse } from "@/pages/Withdrawal/services"
import { showErrorGeneral } from "@/utils/message"
import { useContext, useEffect, useState } from "react"

export const usePrintBPOR = () => {
  const {
    printModalData, setPrintModalData,
  } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(true)
  const [detail, setDetail] = useState<any>()
  const [sellerInfo, setSellerInfo] = useState<any>()
  const [warehouseInfo, setWarehouseInfo] = useState<any>()
  const isVisible = printModalData?.isVisible
  const name = printModalData?.name
  const id = printModalData?.id


  useEffect(() => {
    const loadDetail = async () => {
      try {
        setIsLoading(true)
        const response = await getDetailBPOR(id);
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        setDetail(response)
      } catch (error) {
        showErrorGeneral()
      } finally {
        setIsLoading(false)
      }
    }
    if (!id) return;
    loadDetail()
  }, [id])
  

  useEffect(() => {
    const getInformationCustomerHandle = async () => {
      try {
        const response = await getBPORBusiness(detail?.seller_id)
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        setSellerInfo(response)
      } catch (error) {
        showErrorGeneral()
      }
    }
    if (!detail?.seller_id) return;
    getInformationCustomerHandle()

  }, [detail?.seller_id])

  useEffect(() => {

    const getTikiReturnWarehouseHandle = async () => {
      try {
          const response = await getTikiReturnWarehouse()
          if ('error' in response) {
              throw new Error(response?.error?.message);
          }
          const temp = response.find((i:any) => i?.code === detail?.pickup_warehouse_code)
          setWarehouseInfo(temp)
      } catch (error) {
          showErrorGeneral()
      }
  }
  if(!detail?.pickup_warehouse_code) return;
  getTikiReturnWarehouseHandle()

  }, [detail?.pickup_warehouse_code])


  const onClosePrintModal = () => {
    setPrintModalData({ isVisible: false })
  }

  return {
    isVisible,
    name,
    onClosePrintModal,
    isLoading,
    setIsLoading,
    detail,
    sellerInfo,
    warehouseInfo
  }
}