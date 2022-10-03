import { useFormatMessage } from "@/utils/locale"
import { notification } from "antd"
import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"

export const useHeader = () => {
    const { setCreateModalData, query, setQuery } = useContext(AppContext)
    const formatMessage = useFormatMessage()
    const onOpenCreateModal = () => {
        if (!query?.sellerId) {
            notification.error({
                message: '',
                description: formatMessage({ id: 'Chưa chọn nhà bán' })
            });
            return
        }
        setCreateModalData({ isVisible: true })
    }

    const onSelectSeller = (sellerIdParam: number | undefined) => {
        setQuery({ ...query, sellerId: sellerIdParam })
    }

    return {
        onOpenCreateModal,
        onSelectSeller,
        sellerId: query?.sellerId
    }
}