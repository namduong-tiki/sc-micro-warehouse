import { useContext, useEffect, useMemo, useState } from "react"
import xor from 'lodash/xor';
import { AppContext } from "../../contexts/AppContext"
import { showErrorGeneral } from "@/utils/message";
import { useFormatMessage } from "@/utils/locale";
import { TAB_NAME } from "../../constants/tab";
import { exportBPOR, exportBPORDraft, updateBPOR } from "../../services";
import { downloadFileFromUrl, removeNullPropertyObject } from "@/utils";
import { useCanSelectSeller } from "@/components/SellerSelect";

export const useListingHook = () => {
    const { listing, listingInfo, query, setQuery, setIsLoading } = useContext(AppContext)
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
    const formatMessage = useFormatMessage()

    const tab = query.tab

    useEffect(() => {
        setSelectedRowKeys([])
    }, [tab])



    const onPageChange = (page: number, pageSize: number) => {
        setQuery({ ...query, page, limit: pageSize })
    }

    const checked = useMemo(
        () => {
            return selectedRowKeys.length > 0;
        },
        [selectedRowKeys.length]
    );

    const indeterminate = useMemo(
        () => {
            return selectedRowKeys.length !== 0 && selectedRowKeys.length < listing.length;
        },
        [listing.length, selectedRowKeys.length]
    );

    const onSelect = (id = '') => {
        if (id === '') {
            onSelectAll();
            return;
        }
        setSelectedRowKeys((keys: any) => xor(keys, [id]) as any);
    };

    const onSelectAll = () => {
        if (checked && !indeterminate) {
            setSelectedRowKeys([]);
        } else {
            setSelectedRowKeys(listing.map((item: any) => item.id));
        }
    };

    const onExport = async () => {
        const ids = selectedRowKeys.toString()
        try {
            setIsLoading(true)
            const response = tab === TAB_NAME.DRAFT ? await exportBPORDraft(ids) : await exportBPOR(ids)
            if ('error' in response) {
                throw new Error(response?.error?.message);
            }
            const link = response?.result
            downloadFileFromUrl(link)
        } catch (error: any) {
            showErrorGeneral(formatMessage({ id: 'Xuất danh sách thất bại' }), error?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        listing,
        listingInfo,
        onPageChange,
        limit: query?.limit,
        selected: selectedRowKeys,
        onSelect,
        isIndeterminate: indeterminate,
        isAllSelected: checked,
        isCanExport: !checked,
        onExport
    }
}

export const useOpenDetail = () => {
    const canSelectSeller = useCanSelectSeller();
  
    const {  setIsLoading, fetchList } = useContext(AppContext);
  
  
    const onSaveInput = async (dataPayload: any, id: any) => {
      try {
        setIsLoading(true);
        const data = {
          reference_code: dataPayload?.referenceCode,
          note: dataPayload?.note,
          pickup_warehouse_code: dataPayload?.pickupWarehouseCode,
        };
        const dataFinal = removeNullPropertyObject(data);
  
        const response = await updateBPOR(dataFinal, id);
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        fetchList();
      } catch (error: any) {
        showErrorGeneral('', error?.message);
        return { error };
      } finally {
        setIsLoading(false);
      }
    };
    return {
      canSelectSeller,
      onSaveInput,
    };
  };