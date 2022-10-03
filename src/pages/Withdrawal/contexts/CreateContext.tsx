import React, { createContext, useContext, useState } from 'react';
import { AppContext } from './AppContext';

interface Props {
  children: React.ReactNode;
}


export const CreateContext = createContext<any | null>(null);

const CreateContextProvider: React.FC<Props> = ({ children }) => {

  const state = useCreateContext()

  return (
    <>
      <CreateContext.Provider value={state}>{children}</CreateContext.Provider>
    </>
  );
};

export default CreateContextProvider;

const useCreateContext = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [productListData, setProductListData] = useState({})
  const [listSelected, setListSelected] = useState([])
  const [warehouseSelected, setWarehouseSelected] = useState([])

  const [numberWithdrawalSelected,setNumberWithdrawalSelected] = useState()
  const [createData,setCreateData] = useState([])

  const [finishModalData,setFinishModalData] = useState()

    const { createModalData, setCreateModalData, query } = useContext(AppContext)

    const onCloseCreateModal = () => {
        setCreateModalData({ isVisible: false })
    }

    return {
        isLoading,
        setIsLoading,
        currentStep,
        setCurrentStep,
        productListData,
        setProductListData,
        listSelected,
        setListSelected,
        warehouseSelected,
        setWarehouseSelected,
        numberWithdrawalSelected,
        setNumberWithdrawalSelected,
        isVisible: createModalData?.isVisible,
        onCloseCreateModal,
        sellerIdSelected: query?.sellerId,
        createData,
        setCreateData,
        finishModalData,
        setFinishModalData,
    }
}