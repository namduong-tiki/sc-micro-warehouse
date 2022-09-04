import React from 'react';
import MainContainer from './MainContainer/index';
import { useStep3 } from './step3Hook';

const Step4 = () => {
  const {
    // warehouseVisible,
    // setWarehouseVisible,
    // onSelectedCB,
    // POData,
    // timeSlotsSelected,
    createData,
    sellerId,
    tab,
    onTabChange,
    tikiReturnWarehouse,
    customerInformation,
    onSelectTikiReturnWarehouse,
    onSelectCustomerInformation
  } = useStep3();
  return (
    <MainContainer
      tab={tab}
      tikiReturnWarehouse={tikiReturnWarehouse}
      customerInformation={customerInformation}
      onTabChange={onTabChange}
      createData={createData}
      sellerId={sellerId}
      onSelectTikiReturnWarehouse={onSelectTikiReturnWarehouse}
      onSelectCustomerInformation={onSelectCustomerInformation}
    />
  );
};

export default Step4;
