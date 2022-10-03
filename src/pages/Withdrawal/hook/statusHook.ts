import { useMemo, useState } from "react";
import { BPOR_STATUS, checkIncludeProcessingTab, checkIsCancelBPOR, checkIsDraftBPOR, checkIsStatusLiquidated, checkIsStatusSuccessful } from "../constants/status";
import get from 'lodash/get'

export const useStatus = (record: any) => {
    const [popupName, setPopupName] = useState<string>();
  
    const rawStatus = record?.status;
  
    const data = useMemo(() => {
      const status = get(BPOR_STATUS, [rawStatus, 'value'], rawStatus);
      const color = get(BPOR_STATUS, [rawStatus, 'colorTag'], 'processing');
      const isDraft = rawStatus === BPOR_STATUS.draft.key;
      const isWaitingConfirm = checkIncludeProcessingTab(rawStatus) 
      const isWaitingPreparing = checkIncludeProcessingTab(rawStatus) 
      const isReadyToReturn = rawStatus === BPOR_STATUS.ready_to_return.key;
      const isSuccess = rawStatus === BPOR_STATUS.successfully_returned.key;
      const isLiquidated = rawStatus === BPOR_STATUS.liquidated.key;
      const isCancel = rawStatus === BPOR_STATUS.cancelled.key;
  
  
      return {
        color,
        status,
        isDraft,
        isWaitingConfirm,
        isWaitingPreparing,
        isSuccess,
        isLiquidated,
        isCancel,
        isReadyToReturn,
      };
    }, [rawStatus]);
  
    const onClosePopup = () => setPopupName('');
    const onShowPopup = (popupName: string) => setPopupName(popupName);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
    return {
      ...data,
      popupName,
      setPopupName,
      onClosePopup,
      onShowPopup,
    };
  };

export const useQuantityHook = (record: any, status: string) => {


    const statusHelper: any = useMemo(() => {
        const isDraft = checkIsDraftBPOR(record?.status);
        const isCancel = checkIsCancelBPOR(record?.status);
        const warehouse = record?.warehouse_code || '';

        const expectedQty = record?.expected_qty || 0;
        const estimatedQty = record?.estimated_qty || 0;
        const actualQty = record?.actual_qty || 0;
        const diffQty = expectedQty - actualQty;
        const liquidatedQty = record?.liquidated_quantity || 0;

        const isShowEnable = !!estimatedQty;
        const isShowActualQty = !!actualQty;
        const isShowDeviant = !!diffQty && checkIsStatusSuccessful(status);
        const isShowLiquidated = !!liquidatedQty && checkIsStatusLiquidated(status);

        return {
            warehouse,
            isDraft,
            isCancel,

            diffQty,
            expectedQty,
            actualQty,
            estimatedQty,
            liquidatedQty,

            isShowEnable,
            isShowActualQty,
            isShowDeviant,
            isShowLiquidated,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return statusHelper
}