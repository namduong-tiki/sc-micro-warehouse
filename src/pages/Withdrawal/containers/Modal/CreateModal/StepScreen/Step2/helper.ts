import get from 'lodash/get'

export const convertListWarehouse = (listProduct: any[] = []) => {
    const tempListWarehouse: any[] = []
    listProduct.forEach((product: any) => {
        const sku = product?.sku
        const warehouses: any[] = product?.warehouses || []
        warehouses.forEach((warehouse: any) => {
            const tempItem = {
                code: warehouse?.code,
                product: {
                    [sku]: {
                        sku,
                        availableQuantity: warehouse?.available_quantity
                    }
                }
            }
            const indexOfWarehouse = tempListWarehouse.findIndex(e => e?.code === tempItem?.code)
            if (indexOfWarehouse === -1) {
                tempListWarehouse.push(tempItem)
            } else {
                const currentItem = tempListWarehouse[indexOfWarehouse]
                const productCurrentItem = currentItem?.product

                tempListWarehouse[indexOfWarehouse] = {
                    ...currentItem,
                    product: {
                        ...productCurrentItem,
                        ...tempItem?.product
                    }
                }
            }
        })
    })
    return tempListWarehouse
}


export const checkProductInWarehouse = (sku:any,warehouse:any) => {
    const products = warehouse?.product
    const availableQuantity = get(products,[sku,'availableQuantity'],0)
    return {
        isDisable : !availableQuantity,
        availableQuantity
    }
}