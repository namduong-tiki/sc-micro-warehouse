import { notification } from "antd"
import { useContext } from "react"
// import { formatMessage } from '@/utils/locale';
import { AppContext } from "../../contexts/AppContext"

export const useHeader = () => {
    const {setCreateModalData,query,setQuery} = useContext(AppContext)

    const onOpenCreateModal = () => {
        if(!query?.sellerId){
            notification.error({
                // message: formatMessage({ id: 'Cbpor.create.button.select_seller' }),
                // description: formatMessage({ id: 'bpor.create.button.please_select' })
                message:'Chưa chọn nhà bán ex',
                description:'Chưa chọn nhà bánex'
            });
            return
        }
        setCreateModalData({isVisible:true})
    }

    const onSelectSeller = (sellerIdParam: number | undefined) => {
        setQuery({...query, sellerId:sellerIdParam})
    }

    return {
        onOpenCreateModal,
        onSelectSeller,
        sellerId: query?.sellerId
    }
}