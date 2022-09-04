import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { getTotalByStatus } from "@/pages/Withdrawal/services";


export function useTab() {
    const { query, setQuery } = useContext(AppContext);
    const [tabData, setTabData] = useState<any>()

    const onTabChange = (tab: any) => {
        setQuery({
            ...query, tab, status: '', referenceCode: '', code: '', page: 1
        })
    }

    useEffect(() => {
        const getTotalByStatusHandle = async () => {
            try {
                const res = await getTotalByStatus()
                if ('error' in res) {
                    throw new Error(res?.error?.message);
                }
                setTabData(res?.data)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }

        }
        getTotalByStatusHandle()
    }, [])


    return {
        onTabChange,
        tab: query?.tab,
        tabData,
    };
}
