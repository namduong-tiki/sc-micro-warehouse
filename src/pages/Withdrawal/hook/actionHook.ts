import { useFormatMessage } from "@/utils/locale";
import { showErrorGeneral, showSuccessGeneral } from "@/utils/message";
import { useContext } from "react";
import { PRINT_MODAL_NAME } from "../containers/Modal/PrintModal/constants";
import { AppContext } from "../contexts/AppContext";
import { deleteBPOR,cancelBPOR } from "../services";

export const useActionHook = () => {

  const { setDetailModalData, query, setQuery, setPrintModalData,fetchList, setIsLoading } = useContext(AppContext);
  const formatMessage = useFormatMessage()

  const onOpenDetail = (id: any) => {
    setQuery({
      ...query,
      selectedId: id,
    });
    setDetailModalData({
      isVisible: true,
    });
  };
  const onOpenPrintBPOR = (id: any) => {
    setPrintModalData({
      isVisible: true,
      id,
      name: PRINT_MODAL_NAME.PRINT_BPOR
    });
  };

  const onCancel = async (id: any) => {
    try {
      setIsLoading(true)
      const response = await cancelBPOR(id)
      if ('error' in response) {
        throw new Error(response?.error?.message);
      }
      fetchList()
      showSuccessGeneral(formatMessage({id:'Huỷ thành công '}))
    } catch (error:any) {
      showErrorGeneral(formatMessage({id:'Huỷ thất bại'},error?.message))
    } finally{
      setIsLoading(false)
    }

  }

  const onDelete = async (id: any) => {
    try {
      setIsLoading(true)
      const response = await deleteBPOR(id)
      if ('error' in response) {
        throw new Error(response?.error?.message);
      }
      fetchList()
      showSuccessGeneral(formatMessage({id:'Xoá thành công '}))
    } catch (error:any) {
      showErrorGeneral(formatMessage({id:'Xoá thất bại'},error?.message))
    } finally{
      setIsLoading(false)
    }

  }

  return {
    onOpenDetail,
    onOpenPrintBPOR,
    onCancel,
    onDelete
  }
}