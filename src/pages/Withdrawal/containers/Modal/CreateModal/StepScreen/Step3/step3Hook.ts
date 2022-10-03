import { CreateContext } from "@/pages/Withdrawal/contexts/CreateContext";
import { useContext, useEffect, useState } from "react";
import { getBPORBusiness, getTikiReturnWarehouse } from "@/pages/Withdrawal/services";
import { showErrorGeneral } from "@/utils/message";


export const useStep3 = () => {

    const {
        sellerIdSelected,
        createData,
        setCreateData,
    } = useContext(CreateContext);


    const [tab, setTab] = useState(0)

    const [tikiReturnWarehouse, setTikiReturnWarehouse] = useState([])
    const [customerInformation, setCustomerInformation] = useState()


    useEffect(() => {

        const getTikiReturnWarehouseHandle = async () => {
            try {
                const response = await getTikiReturnWarehouse()
                if ('error' in response) {
                    throw new Error(response?.error?.message);
                }
                setTikiReturnWarehouse(response)
            } catch (error) {
                showErrorGeneral()
            }
        }
        getTikiReturnWarehouseHandle()

    }, [])

    useEffect(() => {

        const getInformationCustomerHandle = async () => {
            try {
                const response = await getBPORBusiness(sellerIdSelected)
                if ('error' in response) {
                    throw new Error(response?.error?.message);
                }
                setCustomerInformation(response)
            } catch (error) {
                showErrorGeneral()
            }
        }
        getInformationCustomerHandle()

    }, [sellerIdSelected])

    useEffect(() => {
        // const tempArr: any = []
        // let index = 0
        // for (const property in numberWithdrawalSelected) {
        //     const warehouseItem = get(numberWithdrawalSelected, [property])
        //     let total = 0;
        //     let countProduct = 0
        //     const items = []

        //     for (const property2 in warehouseItem) {
        //         if(property2 !== 'tikiReturnWarehouse'){
        //             const productItem = get(warehouseItem, [property2])
        //             total = get(productItem, ['value'], 0) + total
        //             countProduct = countProduct + 1;
        //             const itemTemp = {
        //                 product_sku: property2,
        //                 expected_qty: get(productItem, ['value'], 0)
        //             }
        //             items.push(itemTemp)
        //         }
        //     }
        //     const tempItem = {
        //         code: property,
        //         total,
        //         countProduct,
        //         index,
        //         items
        //     }
        //     tempArr.push(tempItem)
        //     index = index + 1
        // }
        // setCreateData(tempArr)

        return () => {
            setCreateData([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    const onTabChange = (value: any) => {
        setTab(value)
    }

    const onSelectTikiReturnWarehouse = (code: any, warehouseSelected: any) => {
        const temp = createData.map((i: any) => {
            if (i?.code === code) {
                return { ...i, tikiReturnWarehouse: warehouseSelected }
            }
            return i
        })
        setCreateData(temp)
    }

    const onSelectCustomerInformation = (code: any, warehouseSelected: any) => {
        return {
            code, warehouseSelected
        }
    }

    return {
        sellerId: 2,
        tab,
        onTabChange,
        tikiReturnWarehouse,
        customerInformation,
        onSelectTikiReturnWarehouse,
        onSelectCustomerInformation,
        createData

    }
}