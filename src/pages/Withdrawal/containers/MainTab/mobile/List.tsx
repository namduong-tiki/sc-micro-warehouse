import React from 'react';
import styled from 'styled-components';
// import { useFormatMessage } from '@/utils/locale';
import DropdownAction from './DropdownAction';
import Code from './Code';
import SizedBox from '@/components/SizedBox';
import Warehouse from './Warehouse';
import { useQuantityHook, useStatus } from '@/pages/Withdrawal/hook/statusHook';
import Date from './Date';
type Props = {
  [any: string]: any;
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const HeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = ({ record }: Props) => {
  const statusHelper = useStatus(record);
  const warehouseInfo = useQuantityHook(record, record?.status);
  return (
    <>
      <HeaderContainer>
        <HeaderColumn>
          <Code record={record} status={statusHelper.status} color={statusHelper.color} />
        </HeaderColumn>
        <HeaderColumn>
          <DropdownAction record={record} />
        </HeaderColumn>
      </HeaderContainer>
      <SizedBox height="12px" />
      <div style={{ height: 2, backgroundColor: '#f5f5f5' }} />
      <SizedBox height="10px" />
      <Warehouse warehouseInfo={warehouseInfo} />
      <SizedBox height="10px" />
      <Date record={record} statusHelper={statusHelper} liquidatedQty={warehouseInfo?.liquidatedQty}/>
      <SizedBox height="20px" />

    </>
  );
};

const List = ({ dataSource }: Props) => {
  return (
    <>
      {dataSource.map((record: any) => {
        return <Item record={record} key={record?.id} />;
      })}
    </>
  );
};

export default List;
