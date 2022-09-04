import { useContext, useEffect } from 'react';
import findIndex from 'lodash/findIndex'
import { CreateContext } from '@/pages/Withdrawal/contexts/CreateContext';
import { message } from 'antd';
import { getListWarehouse } from '@/pages/Withdrawal/services';
import { convertListWarehouse } from './helper';
import { showErrorGeneral } from '@/utils/message';
import { getAllNumberWithdrawal, deleteProductNumberWithdrawal } from '@/pages/Withdrawal/utils/setDataCreate';


export const useStep2 = () => {
  const {
    listSelected,
    setListSelected,
    setIsLoading,
    sellerIdSelected,
    warehouseSelected,
    setWarehouseSelected,
    setNumberWithdrawalSelected
  } = useContext(CreateContext);

  useEffect(() => {
    const skus = listSelected.map((i:any) =>({sku:i?.sku}))

    const onGetListWarehouse = async () => {
      try {
        setIsLoading(true)
        const params = {
          items:skus,
          seller_id: sellerIdSelected
        }
        const response = await getListWarehouse(params)
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
       const warehouseConvert = convertListWarehouse(response?.data)
       setWarehouseSelected(warehouseConvert)
      } catch (error:any) {
        message.error(error.message);
      } finally {
        setIsLoading(false)
      }
    }
    onGetListWarehouse()
    setNumberWithdrawalSelected(getAllNumberWithdrawal())
  }, [])
  

  const onRemoveItemListSelected = (record: any) => {
    try {
      const sku = record?.sku
      const temp = [...listSelected]
      const index = findIndex(temp, i => i?.sku === sku);
      if (index !== -1) {

        temp.splice(index, 1);
        deleteProductNumberWithdrawal(sku,setNumberWithdrawalSelected)
        return setListSelected(temp)
      }
      return null;
    } catch (error) {
      console.log('erroe',error)
      return showErrorGeneral()
    }
  }


  const onChangeValueListSelected = (data:any) => {
    setNumberWithdrawalSelected(data)
  }
 


  return {
    listSelected,
    warehouseSelected,
    onRemoveItemListSelected,
    onChangeValueListSelected
  }
}

