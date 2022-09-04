import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

export const useEntryApp = () => {
    const { isLoading, createModalData, detailModalData } = useContext(AppContext);
    const isVisibleCreateModal = createModalData?.isVisible;
    const isVisibleDetailModal = detailModalData?.isVisible;
  
    return {
      isLoading,
      isVisibleCreateModal,
      isVisibleDetailModal,
    };
  };
  