import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Text0 } from '@/components/Text';
import { formatMessage } from '@/utils/locale';
import ProductContent from './ProductContent';
import WarehouseItem from './WarehouseItem';
import { checkProductInWarehouse } from '@/pages/Withdrawal/containers/Modal/CreateModal/StepScreen/Step2/helper';
import { SumProduct, SumWarehouse } from './Sum';

export const EditColum = ({items = [],warehouse,onChangeValueItem,onRemoveItem}:any) => {
  return [
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'common.number' })}</Text0>,
      dataIndex: 'stt',
      with: '7%',
      align: 'center',
      key: 'stt',
      render: (_: any, record: any, index: any) => {
        if (record?.isSum) return null;
        return <p>{index}</p>;
      },
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'bpor.product' })}</Text0>,
      width: '60%',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => {
        if (record?.isSum) return <SumProduct total={items.length} />;

        return <ProductContent record={record} />;
      },
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'Số lượng rút kho dự kiến' })}
          </Text0>
        </>
      ),
      width: '25%',
      key: 'sl',
      render: (_: any, record: any) => {
        if (record?.isSum)
          return (
            <SumWarehouse warehouseCode={warehouse?.code} warehouse={warehouse}/>
          );
        const { availableQuantity, isDisable } = checkProductInWarehouse(record?.sku, warehouse);

        return (
          <WarehouseItem
            record={record}
            warehouse={warehouse}
            isDisable={isDisable}
            availableQuantity={availableQuantity}
            onChangeValueListSelected={onChangeValueItem}
          />
        );
      },
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'bpor.manipulation' })}
          </Text0>
        </>
      ),
      width: '10%',
      key: 'sl',
      align: 'center',
      render: (_: any, record: any) => {
        if (record?.isSum) return null;
        return <ActionContent record={record} action={onRemoveItem} />;
      },
    },
  ];
};

const ActionContent = ({ record, action }: { record: any; action: any }) => {
  return (
    <CloseCircleOutlined
      onClick={() => action(record)}
      style={{
        color: 'red',
        fontSize: 20,
        cursor: 'pointer',
      }}
    />
  );
};
