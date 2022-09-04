import { useContext, useMemo, useState } from "react"
import xor from 'lodash/xor';
import { AppContext } from "../../contexts/AppContext"

export const useListingHook = () => {
    const { listing, listingInfo, query, setQuery } = useContext(AppContext)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


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


    return {
        listing,
        listingInfo,
        onPageChange,
        limit: query?.limit,
        selected: selectedRowKeys,
        onSelect,
        isIndeterminate: indeterminate,
        isAllSelected: checked,
    }
}
