import SizedBox from '@/components/SizedBox';
import React from 'react'
import Guideline from './Guideline/index' 
import MainContentMobile from './MainContent/mobile'; 
import { useStep2 } from './step2Hook';



const Step3Mobile = () => {
  const {
    listSelected,
    warehouseSelected,
    onRemoveItemListSelected,
    onChangeValueListSelected
  } = useStep2()

    return (
      <div style={{padding:'0 12px'}}>
      <Guideline /> 
        <SizedBox height='16px' />
        <MainContentMobile
          listSelected={listSelected}
          warehouseSelected={warehouseSelected} 
          onRemoveItemListSelected={onRemoveItemListSelected}
          onChangeValueListSelected={onChangeValueListSelected}
        />
        <SizedBox height='16px' />
      </div>

    )
}

export default Step3Mobile


