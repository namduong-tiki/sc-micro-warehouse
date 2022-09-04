import SizedBox from '@/components/SizedBox';
import React from 'react'
import Guideline from './Guideline/index' 
import MainContent from './MainContent/index'; 
import { useStep2 } from './step2Hook';



const Step3 = () => {
  const {
    listSelected,
    warehouseSelected,
    onRemoveItemListSelected,
    onChangeValueListSelected
  } = useStep2()

    return (
      <>
        <Guideline /> 
        <SizedBox height='16px' />
        <MainContent
          listSelected={listSelected}
          warehouseSelected={warehouseSelected} 
          onRemoveItemListSelected={onRemoveItemListSelected}
          onChangeValueListSelected={onChangeValueListSelected}
        />
        <SizedBox height='16px' />
      </>

    )
}

export default Step3


