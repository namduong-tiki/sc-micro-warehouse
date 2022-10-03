import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

export const useEntryApp = () => {
  const { isLoading, createModalData, detailModalData, printModalData, isMobile } = useContext(AppContext);
  const isVisibleCreateModal = createModalData?.isVisible;
  const isVisibleDetailModal = detailModalData?.isVisible;
  const isVisiblePrintModal = printModalData?.isVisible;

  return {
    isLoading,
    isVisibleCreateModal,
    isVisibleDetailModal,
    isVisiblePrintModal,
    isMobile
  };
};
