import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Content from './Content';
// import EditProduct from './EditProduct'
import History from './History';
import SizedBox from '@/components/SizedBox';

const Container = styled.div`
  background-color: white;
  padding: 0;
`;

interface Props {
  [key: string]: any;
}

const RightColum: React.FC<Props> = ({
  histories,
  onChangeValueItem,
  onRemoveItem,
  record,
  status = {},
  items,
  isLoadingDraft,
  warehouse,
  onOpenImportProductModal
}) => {
  return (
    <>
      <Container>
        <Header record={record} status={status} onOpenImportProductModal={onOpenImportProductModal}/>
        <Content
          onChangeValueItem={onChangeValueItem}
          onRemoveItem={onRemoveItem}
          warehouse={warehouse}
          record={record}
          status={status}
          items={items}
          isLoadingDraft={isLoadingDraft}
        />
      </Container>
      <SizedBox height="24px" />
      <History histories={histories} />
      <SizedBox height="16px" />
    </>
  );
};

export default RightColum;
