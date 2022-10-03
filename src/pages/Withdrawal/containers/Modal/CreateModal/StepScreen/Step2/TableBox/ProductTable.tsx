import { Table, Image } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import { FALLBACK_IMAGE, getProductMediaUrl } from '@/utils/image';
import HoverText from '@/components/HoverText';
import { SubTitle1, Title1 } from '@/components/Text';
import { formatMessage, useFormatMessage } from '@/utils/locale';
import { ColumnsType } from 'antd/lib/table';
import { SumProduct, SumWarehouse } from './Sum';
import WarehouseItem from './WarehouseItem';
import { checkProductInWarehouse } from '../helper';
import './index.css';

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  margin-left: 8px;
`;
const StyledTable = styled(Table)`
   .ant-table {
    .ant-table-container {
      border-left: 1px solid #d9d9d9;
      border-top: 1px solid #d9d9d9;
    }
     .ant-table-thead > tr:nth-child(1) > th.ant-table-cell:nth-child(3) {
      border-left: 1px solid #d9d9d9;
    }
     .ant-table-thead > tr > th.ant-table-cell {
      background-color: #f5f5f5;
      border-bottom: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
    }
     .ant-table-tbody > tr > td.ant-table-cell {
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }
     .ant-table-tbody > tr > td.ant-table-cell:last-child {
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
      border-left: 1px solid #d9d9d9;
    }

     .ant-table-tbody > tr:nth-child(2) td {
      background-color: #e6f7ff;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 40px;
  min-width: 40px;
`;

const ProductContent = ({ record = {} }: { record: any }) => {
  const image = record?.thumbnail ? getProductMediaUrl(record?.thumbnail) : 'error';
  const cate = get(record, ['attributes', 'catalog_group_name'], '');
  const formatMessageText = useFormatMessage();

  return (
    <ProductContainer>
      <ImageContainer>
        <Image width={40} height={40} src={image} fallback={FALLBACK_IMAGE} />
      </ImageContainer>
      <ContentContainer>
        <HoverText fullText={record?.name}>
          <Title1 style={{ display: 'block', fontWeight: '600' }}>{record?.name}</Title1>
        </HoverText>

        <SubTitle1 style={{ display: 'block' }}>
          {`${formatMessageText({ id: 'bpor.category' })}:  ${cate}`}
          {record?.brand?.value &&
            ` | ${formatMessageText({ id: 'bpor.trademark' })}: ${record?.brand?.value}`}
        </SubTitle1>
        <SubTitle1>
          SKU: {record?.sku} |{' '}
          {record?.seller_product_code &&
            `${formatMessageText({ id: 'bpor.product_code' })}: ${record?.seller_product_code} | `}
          <SubTitle1 color="orange">
            {formatMessageText({ id: 'bpor.inventory' })}: {record?.inventory?.qty_available || 0}
          </SubTitle1>
        </SubTitle1>
      </ContentContainer>
    </ProductContainer>
  );
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

const columns = ({
  warehouseSelected = [],
  onRemoveItemListSelected,
  listSelected = [],
  onChangeValueListSelected,
}: any) => {
  const arr = [
    {
      title: formatMessage({ id: 'bpor.product' }),
      dataIndex: 'name',
      render: (_: any, record: any) => {
        if (record?.isSum) return <SumProduct total={listSelected.length} />;
        return <ProductContent record={record} />;
      },
      width: 400,
      fixed: 'left',
    },
  ];
  const warehouses = {
    title: <WarehouseTitle />,
    children: [],
  };
  const tempChildren = warehouseSelected.map((warehouse: any) => {
    const title = (
      <Title1>
        {formatMessage({ id: 'bpor.warehouse' })} {warehouse?.code.toUpperCase()}
      </Title1>
    );
    return {
      title,
      dataIndex: 'warehouse',
      key: 'warehouse',
      width:300,
      onCell: (record: any) => {
        const { isDisable } = checkProductInWarehouse(record?.sku, warehouse);
        return { className: isDisable ? 'disableRow' : null };
      },
      render: (_: any, record: any) => {
        if (record?.isSum)
          return (
            <SumWarehouse warehouseCode={warehouse?.code}/>
          );
        const { availableQuantity,isDisable } = checkProductInWarehouse(record?.sku, warehouse);
        return (
          <WarehouseItem
            record={record}
            warehouse={warehouse}
            isDisable={isDisable}
            availableQuantity={availableQuantity}
            onChangeValueListSelected={onChangeValueListSelected}
          />
        );
      },
    };
  });
  warehouses.children = tempChildren;
  const action = {
    title: formatMessage({ id: 'bpor.manipulation' }),
    dataIndex: 'address',
    width: 100,
    align: 'center',
    fixed: 'right',
    render: (_: any, record: any) => {
      if (record?.isSum) return null;
      return <ActionContent record={record} action={onRemoveItemListSelected} />;
    },
  };

  return [...arr, warehouses, action];
};

const WarehouseTitle = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <Title1>{formatMessage({ id: 'bpor.estimated_inventory_quantity' })}</Title1>
    </div>
  );
};
interface TableBoxProps {
  listSelected?: any;
  warehouseSelected?: any;
  onRemoveItemListSelected?: any;
  onChangeValueListSelected?:any
}

const ProductTable: React.FC<TableBoxProps> = ({
  listSelected = [],
  warehouseSelected,
  onRemoveItemListSelected,
  onChangeValueListSelected
}) => {
  const dataSource = handleDataSource({ listSelected });
  return (
    <StyledTable
      columns={
        columns({
          warehouseSelected,
          onRemoveItemListSelected,
          listSelected,
          onChangeValueListSelected
        }) as ColumnsType<any>
      }
      dataSource={dataSource}
      bordered
      scroll={{ x: 'calc(700px + 50%)' }}
      pagination={false}
      rowKey="id"
    />
  );
};

export default ProductTable;

const handleDataSource = ({ listSelected = [] }) => {
  return [{ isSum: true }, ...listSelected];
};
