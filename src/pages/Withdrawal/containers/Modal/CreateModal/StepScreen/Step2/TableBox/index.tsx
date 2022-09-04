import React from 'react'
import styled from 'styled-components'
import  ProductTable  from './ProductTable'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    max-height: 1000px;
    width: 100%;
`
const Flex1= styled.div`
    flex:1;
`

interface TableBoxProps {
  listSelected?: any,
  warehouseSelected?: any,
  onRemoveItemListSelected?: any,
  onChangeValueListSelected?: any,
}

const TableBox:React.FC<TableBoxProps> = ({
  listSelected,
  warehouseSelected,
  onRemoveItemListSelected,
  onChangeValueListSelected
}) => {
    return(
      <Container>
        <Flex1>
          <ProductTable
            listSelected={listSelected}
            warehouseSelected={warehouseSelected}
            onRemoveItemListSelected={onRemoveItemListSelected}
            onChangeValueListSelected={onChangeValueListSelected}
          />
        </Flex1>
      </Container>
    )
}

export default TableBox
