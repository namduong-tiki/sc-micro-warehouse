import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components';
import { formatMessage } from '@/utils/locale';
import SizedBox from '@/components/SizedBox';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`

interface FooterProps {
    onClearFilter: any,
    isDisableButton:boolean,
    onApply:any
}

const Footer = ({onClearFilter,isDisableButton,onApply}:FooterProps) =>
{
    return(
      <Container>
        <Button onClick={onClearFilter}>
          {formatMessage({id:'Bỏ lọc'})}
        </Button>
        <SizedBox width='12px' />
        <Button disabled={isDisableButton} type='primary' onClick={onApply}>
          {formatMessage({id:'Áp dụng'})}
        </Button>
      </Container>
    )
}

export default Footer
