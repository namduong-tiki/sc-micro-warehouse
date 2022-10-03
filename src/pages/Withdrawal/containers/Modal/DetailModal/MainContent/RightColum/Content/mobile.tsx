import React, { useMemo } from 'react';
import styled from 'styled-components';
import DraftTable from './DraftTable';
import ProductListMobile from './mobile/ProductListMobile';

const ContentContainer = styled.div`
  background-color: white;
`;


interface Props {
  [key: string]: any;
}

const ContentMobile: React.FC<Props> = ({
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
          <ProductListMobile
            dataSource={finalItems}
          />
        </>
      )}
    </ContentContainer>
  );
};

export default ContentMobile;
