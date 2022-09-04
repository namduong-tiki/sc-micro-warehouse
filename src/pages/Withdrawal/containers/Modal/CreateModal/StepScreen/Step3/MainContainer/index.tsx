import SizedBox from '@/components/SizedBox';
import React from 'react';
import Header from '../Header';
import WarehouseTab from '../WarehouseTab';

interface MainContainerProps {
  // sellerId?: any;
  // warehouseSelected: any
  [key: string]: any;
}
const MainContainer: React.FC<MainContainerProps> = ({
  createData,
  tikiReturnWarehouse,
  customerInformation,
  onTabChange,
  onSelectTikiReturnWarehouse,
  onSelectCustomerInformation
}) => {
  return (
    <>
      <Header total={createData?.length} />
      <SizedBox height="16px" />
      <WarehouseTab
        tikiReturnWarehouse={tikiReturnWarehouse}
        customerInformation={customerInformation}
        createData={createData}
        onTabChange={onTabChange}
        onSelectTikiReturnWarehouse={onSelectTikiReturnWarehouse}
        onSelectCustomerInformation={onSelectCustomerInformation}
      />
    </>
  );
};

export default MainContainer;
