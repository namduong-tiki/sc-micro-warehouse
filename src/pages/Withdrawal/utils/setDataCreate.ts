/* eslint-disable @typescript-eslint/no-unused-vars */
import get from 'lodash/get'

export let numberWithdrawal = {

}

export const setNumberWithdrawal = (warehouse:any, sku:any, value:any,weight: any,cb: any) => {
    try {
        const valueTemp = { value,weight }
        const tempWarehouse = get(numberWithdrawal, [warehouse], {})

        if(value === 0) {
            delete tempWarehouse[sku]
            numberWithdrawal = {
                ...numberWithdrawal,
                ...{ [warehouse]: tempWarehouse }
            }
        }else{

        const tempWarehouse2 = {
            ...tempWarehouse,
            ...{ [sku]: valueTemp }
        }
        numberWithdrawal = {
            ...numberWithdrawal,
            ...{ [warehouse]: tempWarehouse2 }
        }
    }

        cb(numberWithdrawal)
    } catch (error) {
    }
}

export const getNumberWithdrawal = (warehouse:any, sku:any) => {
    return get(numberWithdrawal, [warehouse, sku, 'value'], 0)
}

export const cleanNumberWithDrawal = () => {
    numberWithdrawal = {}
}

export const getAllNumberWithdrawal = () => numberWithdrawal


export const deleteProductNumberWithdrawal = (sku: number | string,cb : any) => {
    try {
        for (const [_, value] of Object.entries(numberWithdrawal)) {
            const warehouse: any = value
            delete warehouse[sku]
          }
        cb(numberWithdrawal)
    } catch (_) {
        
    }

}