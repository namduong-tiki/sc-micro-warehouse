import { useContext, useMemo } from "react";
import { BPOR_STATUS } from "../../constants/status";
import { TAB_NAME } from "../../constants/tab";
import { AppContext } from "../../contexts/AppContext";

export const useQuickFilterHook = () => {
    const { query, setQuery } = useContext(AppContext)

    const { shippingMethod, needWithdraw, tab, status = '' } = query

    const renderHelper = useMemo(() => {
        return {
            isShowNeedWithdraw: tab === TAB_NAME.WAITING,
            isShowLiquidated: tab === TAB_NAME.SUCCESSFULLY
        }
    }, [tab])

    const isFilterLiquidated = useMemo(() => {
        const tempData: string = status || ''
        return tempData.includes(BPOR_STATUS.liquidated.key)
    }, [status])


    const onChangeShippingMethod = (val: any) => {
        setQuery({
            ...query,
            shippingMethod: val
        })
    };

    const onChangeNeedWithdraw = (val: any) => {
        setQuery({
            ...query,
            needWithdraw: val
        })
    };

    const onChangeFilterLiquidated = () => {
        let temp;
        if (isFilterLiquidated) {
            const arrayStatus = status.split(',').filter((i: any) => i !== BPOR_STATUS.liquidated.key)
            temp = arrayStatus.toString();
        } else {
            temp = status ? `${status},${BPOR_STATUS.liquidated.key}` : BPOR_STATUS.liquidated.key
        }
        setQuery({
            ...query,
            status: temp
        })
    };

    return {
        onChangeShippingMethod,
        shippingMethod,
        needWithdraw,
        isShowNeedWithdraw: renderHelper?.isShowNeedWithdraw,
        onChangeNeedWithdraw,
        onChangeFilterLiquidated,
        isFilterLiquidated,
        isShowLiquidated: renderHelper?.isShowLiquidated,
    }
}