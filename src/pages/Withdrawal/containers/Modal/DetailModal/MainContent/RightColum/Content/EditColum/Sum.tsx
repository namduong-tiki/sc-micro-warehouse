import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import { useFormatMessage } from '@/utils/locale';
import { getAllNumberWithdrawal } from '@/pages/Withdrawal/utils/setDataCreate';

const SumContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SumWarehouseContainer = styled.div`
  display: flex;
`;

export const SumProduct = ({ total }: { total: string }) => {
  const formatMessageText = useFormatMessage();
  return (
    <SumContainer>
      {formatMessageText({ id: 'bpor.sum.total' })}:{' '}
      <b>
        {total} {formatMessageText({ id: 'bpor.sum.product' })}
      </b>
    </SumContainer>
  );
};

interface SumWarehouseProps {
  warehouseCode?: any;
  warehouse?: any;
}

// const convertData = (warehouseCode: string) => {
//   const numberWithdrawalSelected = getAllNumberWithdrawal();
//   let total = 0;
//   let totalWeight = 0;
//   let isVisibleWeight = true;
//   const currentWarehouse = get(numberWithdrawalSelected, [warehouseCode], {});
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   for (const [_, value] of Object.entries(currentWarehouse)) {
//     const product: any = value;
//     const currentValue = product?.value;
//     const currentWeight = product?.weight;
//     total = currentValue + total;
//     if (!currentWeight && currentValue) {
//       isVisibleWeight = false;
//     } else if (currentWeight && isVisibleWeight) {
//       totalWeight = totalWeight + parseFloat((currentWeight * currentValue).toString());
//     }
//   }
//   return {
//     isVisibleWeight,
//     total,
//     totalWeight,
//   };
// };
export const checkIsExistInWarehouse = (warehouse?:any,sku?:any) => {
  const listProductWarehouse = warehouse?.product || {};
  return get(listProductWarehouse, [sku, 'availableQuantity'], 0);
}

const convertDataDetail = (warehouseCode: string, warehouse: any) => {
  const numberWithdrawalSelected = getAllNumberWithdrawal();
  let total = 0;
  let totalWeight = 0;
  let isVisibleWeight = true;
  const currentWarehouse = get(numberWithdrawalSelected, [warehouseCode], {});
  for (const [sku, value] of Object.entries(currentWarehouse)) {
    const isExistInWarehouse = checkIsExistInWarehouse(warehouse,sku);
    if (isExistInWarehouse) {
      const product: any = value;
      const currentValue = product?.value;
      const currentWeight = product?.weight;
      total = currentValue + total;
      if (!currentWeight && currentValue) {
        isVisibleWeight = false;
      } else if (currentWeight && isVisibleWeight) {
        totalWeight = totalWeight + parseFloat((currentWeight * currentValue).toString());
      }
    }
  }
  return {
    isVisibleWeight,
    total,
    totalWeight,
  };
};

export const SumWarehouse: React.FC<SumWarehouseProps> = ({ warehouseCode, warehouse }) => {
  const { isVisibleWeight, total, totalWeight } = convertDataDetail(warehouseCode, warehouse);

  const formatMessageText = useFormatMessage();
  return (
    <SumWarehouseContainer>
      {formatMessageText({ id: 'bpor.number' })}{' '}
      <b style={{ marginLeft: 4 }}>
        {total}
        {isVisibleWeight && `(${totalWeight}kg)`}
      </b>
    </SumWarehouseContainer>
  );
};
