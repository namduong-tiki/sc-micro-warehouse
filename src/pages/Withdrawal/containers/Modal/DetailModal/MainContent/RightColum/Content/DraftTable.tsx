import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import styled from 'styled-components';
import { EditColum } from './EditColum';
import { Spin, Table } from 'antd';

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

     .ant-table-tbody > tr:nth-child(1) td {
      background-color: #e6f7ff;
    }
  }
`;

interface Props {
  [key: string]: any;
}

const DraftTable: React.FC<Props> = ({ items = [], isLoading, warehouse, record,onChangeValueItem,onRemoveItem }) => {
  const dataSource = handleDataSource({ items });
  const warehouseSelected = warehouse.find((i: any) => i?.code === record?.warehouse_code);
  return (
    <Spin spinning={isLoading}>
      <StyledTable
        dataSource={dataSource}
        columns={EditColum({items,warehouse:warehouseSelected,onChangeValueItem,onRemoveItem}) as ColumnsType<any>}
        bordered
        rowKey="product_sku"
        pagination={false}
      />
    </Spin>
  );
};

export default DraftTable;

const handleDataSource = ({ items = [] }) => {
  return [{ isSum: true }, ...items];
};
