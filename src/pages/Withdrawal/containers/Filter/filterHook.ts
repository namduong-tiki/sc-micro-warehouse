import { useContext, useMemo, useState } from "react";
import { LIST_STATUS_TAB_CANCELLED, LIST_STATUS_TAB_DRAFT, LIST_STATUS_TAB_PROCESSING, LIST_STATUS_TAB_SUCCESSFULLY, LIST_STATUS_TAB_WAITING } from "../../constants/status";
import { TAB_NAME } from "../../constants/tab";
import { AppContext } from "../../contexts/AppContext";

export const useFilterHook = () => {
    const { query, setQuery } = useContext(AppContext)

    const { code, status, expectedPickupDate, tab, referenceCode } = query


    const [isOpenDrawer, setIsOpenDrawer] = useState(false);


    const onOpenDrawer = () => setIsOpenDrawer(true);
    const onCloseDrawer = () => setIsOpenDrawer(false);


    const onSelectStatus = (val: any) => {
        setQuery({
            ...query,
            status: val.toString()
        })
    };

    const onSelectDate = (val: any) => {
        setQuery({
            ...query,
            expectedPickupDate: val ? val.format('YYYY-MM-DD') : null
        })
    };

    const placeholderInput = useMemo(() => {
        return TAB_NAME.DRAFT === tab ? 'Nhập tối đa 50 mã tham chiếu nhà bán cách nhau bằng dấu ‘ , ‘' : 'Nhập tối đa 50 mã phiếu rút cách nhau bằng dấu ‘ , ‘'
    }, [tab])

    const searchValue = useMemo(() => {
        if (tab === TAB_NAME.DRAFT) {
            return referenceCode ? referenceCode.split(',') : []
        }
        return code ? code.split(',') : []


    }, [referenceCode, tab, code])

    const onChangeSearch = (data = []) => {
        if (tab === TAB_NAME.DRAFT) {
            return setQuery({
                ...query,
                referenceCode: data.toString()
            })

        }
        return setQuery({
            ...query,
            code: data.toString()
        })
    }

    const statusValue = useMemo(() => {
        return status ? status.split(',') : []
    }, [status])

    const optionsStatus = useMemo(() => {
        switch (tab) {
            case TAB_NAME.DRAFT:
                return LIST_STATUS_TAB_DRAFT
            case TAB_NAME.PROCESSING:
                return LIST_STATUS_TAB_PROCESSING
            case TAB_NAME.WAITING:
                return LIST_STATUS_TAB_WAITING
            case TAB_NAME.SUCCESSFULLY:
                return LIST_STATUS_TAB_SUCCESSFULLY
            case TAB_NAME.CANCELLED:
                return LIST_STATUS_TAB_CANCELLED

            default: return []
        }
    }, [tab])



    return {
        statusValue,
        onSelectDate,
        onSelectStatus,
        onOpenDrawer,
        onCloseDrawer,
        isOpenDrawer,
        expectedPickupDate,
        searchValue,
        onChangeSearch,
        optionsStatus,
        placeholderInput
    }
}