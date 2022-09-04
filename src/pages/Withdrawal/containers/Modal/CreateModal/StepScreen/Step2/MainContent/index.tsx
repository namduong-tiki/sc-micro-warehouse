import SizedBox from '@/components/SizedBox'
import React  from 'react'
import styled from 'styled-components'
import TableBox from '../TableBox' 

const Container = styled.div`
    padding: 24px;
    background-color: white;
`

interface MainContentProps {
  listSelected?: any,
  warehouseSelected?: any,
  onRemoveItemListSelected?: any,
  onChangeValueListSelected?: any,
}

const MainContent: React.FC<MainContentProps> = ({
  listSelected,
  warehouseSelected,
  onRemoveItemListSelected,
  onChangeValueListSelected,
}) => {
    return(
      <Container>
        <SizedBox height='18px' />
        <TableBox
          listSelected={listSelected}
          warehouseSelected={warehouseSelected}
          onRemoveItemListSelected={onRemoveItemListSelected}
          onChangeValueListSelected={onChangeValueListSelected}
        />
      </Container>
    )
}

export default MainContent
