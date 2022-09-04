import { Button } from 'antd'
import React from 'react'
import { useFormatMessage } from '@/utils/locale';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    align-items: center;
    justify-content:flex-end ;
`

interface Props {
  action: any
}

const Footer:React.FC<Props> = ({action}) => {
  const formatMessage = useFormatMessage()
    return(
      <Container>
        <Button
          onClick={action}
          type='primary'
        >
          {formatMessage({ id: 'Lưu & Đóng' })}
        </Button>
      </Container>
    )
}

export default Footer
