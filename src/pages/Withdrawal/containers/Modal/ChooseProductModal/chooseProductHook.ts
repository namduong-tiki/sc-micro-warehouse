/* eslint-disable react-hooks/exhaustive-deps */
import { getListProductBySellerId } from "@/pages/Withdrawal/services"
import { delay, removeNullPropertyObject } from "@/utils"
import { useEffect, useMemo, useState } from "react"
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import { message } from "antd"
import { cleanNumberWithDrawal } from "@/pages/Withdrawal/utils/setDataCreate"
import { useFormatMessage } from "@/utils/locale"

export const useChooseProduct = ({ sellerId, items = [], onClose, cb }: any) => {
    const skus = items.map((i: any) => i.sku)

    const formatMessage = useFormatMessage()
    const sellerIdParam = sellerId
    const [isVisibleImport, setIsVisibleImport] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [productListData, setProductListData] = useState<any>([])
    const [listSelected, setListSelected] = useState<any>([])


    const [query, setQuery] = useState({
        name: null,
        code: null,
        sku: [],
        categories: null,
        brand: null,
        page: 1,
        selectedId: sellerIdParam,
        limit: 20
    })

    const { name, code, sku, page, selectedId, categories, limit } = query


    useEffect(() => {
        const getListProduct = async () => {
            try {
                setIsLoading(true)
                const dataPayload = {
                    seller_ids: [sellerId],
                    skus,
                }
                const response = await getListProductBySellerId({ cursor: 0, dataPayload, limit: 1000 })
                if ('error' in response) {
                    throw new Error(response?.error?.message);
                }

                const dataListProduct = response?.data || []

                const newDataListProduct = dataListProduct.map((d: any) => {
                    const tempD = { ...d }

                    tempD.isDisable = !(tempD?.inventory?.qty_available)
                    return tempD
                })
                setListSelected(newDataListProduct)
                return setIsLoading(false)

            } catch (e) {
                return setIsLoading(false)
            }
        }
        if (!skus || skus.length === 0) return;
        getListProduct()
    }, [])


    useEffect(() => {
        const getListProduct = async () => {
            try {
                setIsLoading(true)
                const cursor = (page - 1) * limit
                const tempDataPayload = {
                    seller_ids: [selectedId],
                    name,
                    seller_product_code: code,
                    skus: sku.length > 0 ? sku : null,
                    categories,
                }
                const dataPayload = removeNullPropertyObject(tempDataPayload);

                const response = await getListProductBySellerId({ cursor, dataPayload, limit })
                if ('error' in response) {
                    throw new Error(response?.error?.message);
                }
                const dataListProduct = response?.data.map((i: any) => {
                    const tempItem = { ...i }
                    const qtyAvailable = tempItem?.inventory?.qty_available
                    if (!qtyAvailable || qtyAvailable <= 0) {
                        tempItem.isDisable = true
                    }
                    return tempItem
                })

                const tempProductListData = { data: dataListProduct, paging: { total: response?.total } }
                setProductListData(tempProductListData)
                return setIsLoading(false)
            } catch (error: any) {
                message.error(error.message);
                return setIsLoading(false)
            }
        }
        getListProduct()
    }, [name, code, page, selectedId, sku, categories, setIsLoading, setProductListData, limit])



    const [isShowCate, setIsShowCate] = useState(true)


    const onChangeQuery = async (type: any, value: any, pageSize: any) => {
        if (type === 'clearCate') {
            const temp = { ...query }
            setIsShowCate(false)
            await delay(300)
            setIsShowCate(true)
            return setQuery({ ...temp, categories: value, page: 1 })
        }
        if (type === 'page') {
            const temp = { ...query }
            return setQuery({ ...temp, page: value, limit: pageSize })
        }
        if (type === 'sku') {
            const temp = { ...query }
            return setQuery({ ...temp, sku: value, name: null, code: null, page: 1 })
        }
        if (type === 'name') {
            const temp = { ...query }
            return setQuery({ ...temp, name: value, sku: [], code: null, page: 1 })
        }
        if (type === 'code') {
            const temp = { ...query }
            return setQuery({ ...temp, code: value, sku: [], name: null, page: 1 })
        }
        if (type === 'categories') {
            const temp = { ...query }
            return setQuery({ ...temp, categories: value, page: 1 })
        }
        if (type === 'brand') {
            const temp = { ...query }
            return setQuery({ ...temp, brand: value, page: 1 })
        }
        return null;
    }

    const onChangeListSelected = (type: any, record: any = [], operation: any) => {
        if (type === 'all') {
            const tempData = record.filter((r: any) => !(r?.isDisable)) || []
            const temp = operation === 'add' ? [...listSelected, ...tempData] : []
            return setListSelected(temp)
        }
        if (type === 'add') {
            const temp = [record, ...listSelected]
            return setListSelected(temp)
        }
        const temp = [...listSelected]
        const index = findIndex(temp, i => i?.sku === record?.sku);
        if (index > -1) {
            temp.splice(index, 1);
            return setListSelected(temp)
        }
        return null;
    }

    const onImportCB = (dataImport: any) => {
        const getLisSelected = (skus: any) => {
            const getListProduct = async () => {
                try {
                    setIsLoading(true)

                    const dataPayload = {
                        seller_ids: [selectedId],
                        skus,
                    }
                    const res = await getListProductBySellerId({ cursor: 0, dataPayload, limit: 1000 })
                    if ('error' in res) {
                        throw new Error(res?.error?.message);
                    }

                    const dataListProductTemp = res?.data || []
                    const dataListProduct = dataListProductTemp.map((i: any) => {
                        const temp = { ...i }
                        const weight = i?.attributes?.shipping_weight || 0
                        temp.weight = weight
                        return temp
                    })


                    if (skus.length === 0) return null;

                    const tempListSelected = [...listSelected]

                    const newDataListProduct = dataListProduct.map((d: any) => {

                        const indexItemSelected = tempListSelected.findIndex(e => e?.sku === d?.sku)
                        if (indexItemSelected > -1) {
                            tempListSelected.splice(indexItemSelected, 1)
                        }

                        const tempD = { ...d }
                        const currentSku = tempD?.sku

                        tempD.isDisable = !(tempD.quantity)
                        tempD.valueQty = get(valueListImport, [currentSku], 0)
                        return tempD
                    })
                    setListSelected([...tempListSelected, ...newDataListProduct])
                    return null;

                } catch (e) {
                    return null;
                } finally {
                    setIsLoading(false)
                }
            }
            getListProduct()
        }

        setIsVisibleImport(false)
        const valueListImport: any = {}

        const skus = dataImport.map((i: any) => {
            const skuItem = i?.sku || 0
            valueListImport[skuItem] = i?.expected_qty
            return skuItem
        })
        //clear Qty item value 
        cleanNumberWithDrawal();

        getLisSelected(skus)
    }
    const onOpenImportModal = () => setIsVisibleImport(true)
    const onCloseImportModal = () => setIsVisibleImport(false)



    const data = useMemo(() => {
        const listProduct = productListData?.data ? productListData?.data.filter((e: any) => {
            const i = findIndex(listSelected, (element: any) => e.sku === element.sku)
            if (i === -1) return true
            return false
        }) : []
        return {
            listProduct: {
                ...productListData,
                data: listProduct
            },
            listSelected: {
                data: listSelected
            }
        }
    }, [productListData, listSelected])

    const onSave = () => {
        cb(listSelected)
        onClose()
    }

    const isCanSave = listSelected.length < 1001 && listSelected.length > 0
    const errorText = listSelected.length > 1000 ? formatMessage({ id: 'Tổng sản phẩm không được lớn hơn 1000' }) : false

    return {
        data,
        onChangeListSelected,
        query,
        onChangeQuery,
        isVisibleImport,
        selectedId,
        isShowCate,
        onCloseImportModal,
        onOpenImportModal,
        onImportCB,
        isLoading,
        isCanSave,
        errorText,
        onSave,
    }
}