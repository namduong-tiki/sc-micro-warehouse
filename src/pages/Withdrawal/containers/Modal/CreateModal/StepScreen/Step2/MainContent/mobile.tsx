import React  from 'react'
import styled from 'styled-components'
import TableBoxMobile from '../TableBox/mobile'

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

const MainContentMobile: React.FC<MainContentProps> = ({
  listSelected,
  warehouseSelected,
  onRemoveItemListSelected,
  onChangeValueListSelected,
}) => {
    return(
      <Container>
        <TableBoxMobile
          listSelected={listSelected}
          warehouseSelected={warehouseSelected}
          onRemoveItemListSelected={onRemoveItemListSelected}
          onChangeValueListSelected={onChangeValueListSelected}
        />
      </Container>
    )
}

export default MainContentMobile
