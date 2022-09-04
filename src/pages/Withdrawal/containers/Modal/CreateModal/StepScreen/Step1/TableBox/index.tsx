import React from 'react';
import styled from 'styled-components';
import ProductTable from './ProductTable';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;

  & > * {
    flex-grow: 1;
    flex-shrink: 1;
  }
`;

interface TableBoxProps {
  data?:any,
  onChangeListSelected?:any,
  onChangeQuery?:any,
  limit?:any,
}

const TableBox:React.FC<TableBoxProps> = ({ data, onChangeListSelected, onChangeQuery, limit }) => {
  return (
    <Container>
      <ProductTable
        data={data?.listProduct}
        onChangeListSelected={onChangeListSelected}
        onChangeQuery={onChangeQuery}
        limit={limit}
      />
      <ProductTable
        data={data?.listSelected}
        isSelected
        onChangeQuery={onChangeQuery}
        onChangeListSelected={onChangeListSelected}
        limit={limit}
      />
    </Container>
  );
};

export default TableBox;
