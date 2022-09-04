import { getNumberWithdrawal } from '@/pages/Withdrawal/utils/setDataCreate'

export const checkValidate = (warehouseCode:string,record:any) => {
    try {
        const sku = record?.sku;
        const weight = record?.attributes?.shipping_weight && parseFloat(record?.attributes?.shipping_weight);
        const valueInit =  getNumberWithdrawal(warehouseCode,sku) || 0
        return{
            valueInit,
            sku,
            weight
        }
    } catch (error) {
        return {}
    }

}

