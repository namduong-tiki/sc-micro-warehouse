import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import DraftTable from './DraftTable';
import { ProductColum } from './ProductColum';

const ContentContainer = styled.div`
  background-color: white;
  padding: 24px;
`;
const StyledTable = styled(Table)`
   .ant-table {
     .ant-table-thead > tr > th.ant-table-cell {
      background-color: #f5f5f5;
    }
     .ant-table-tbody > tr:nth-child(1) td {
      background-color: #e6f7ff;
    }
  }
`;

interface Props {
  [key: string]: any;
}

const Content: React.FC<Props> = ({
  record = {},
  status = {},
  onChangeValueItem,
  onRemoveItem,
  items,
  isLoadingDraft,
  warehouse,
}) => {
  const { isDraft } = status;
  const { items: itemsNonDraft = [] } = record;

  const finalItems = useMemo(() => {
    let totalUnit = 0;
    itemsNonDraft.forEach((i: any) => {
      totalUnit = totalUnit + (i?.expected_qty || 0);
    });
    const item = {
      total: itemsNonDraft.length,
      totalUnit,
      product_sku:itemsNonDraft.length
    };

    return [item, ...itemsNonDraft];
  }, [itemsNonDraft]);
  return (
    <ContentContainer>
      {isDraft ? (
        <>
          <DraftTable
            onChangeValueItem={onChangeValueItem}
            onRemoveItem={onRemoveItem}
            items={items}
            isLoading={isLoadingDraft}
            record={record}
            warehouse={warehouse}
          />
        </>
      ) : (
        <>
          <StyledTable
            dataSource={finalItems}
            columns={ProductColum({ status:record?.status }) as ColumnsType<any>}
            bordered
            id='product_sku'
            rowKey="product_sku"
            pagination={false}
          />
        </>
      )}
    </ContentContainer>
  );
};

export default Content;
