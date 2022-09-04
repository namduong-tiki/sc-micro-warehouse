import { useContext, useMemo, useState } from "react";
import { LIST_STATUS_TAB_CANCELED, LIST_STATUS_TAB_DRAFT, LIST_STATUS_TAB_PROCESSING, LIST_STATUS_TAB_SUCCESSFULLY, LIST_STATUS_TAB_WAITING } from "../../constants/status";
import { TAB_NAME } from "../../constants/tab";
import { AppContext } from "../../contexts/AppContext";

export const useFilterHook = () => {
    const { query, setQuery } = useContext(AppContext)

    const { code, status, expectedPickupDate, tab } = query


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
            expectedPickupDate: val.format('YYYY-MM-DD')
        })
    };

    const searchValue = useMemo(() => {
        return code ? code.split(',') : []
    }, [code])

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
            case TAB_NAME.CANCELED:
                return LIST_STATUS_TAB_CANCELED

            default: return []
        }
    }, [tab])

    const onChangeSearch = (data = []) => {
        setQuery({
            ...query,
            code: data.toString()
        })
    }

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
    }
}