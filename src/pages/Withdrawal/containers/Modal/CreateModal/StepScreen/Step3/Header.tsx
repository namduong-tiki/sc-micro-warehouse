import SizedBox from '@/components/SizedBox'
import { HeadTitle2, Text0 } from '@/components/Text'
import { formatMessage } from '@/utils/locale'
import React from 'react'
import styled from 'styled-components' 

const Container = styled.div`
    padding: 24px 24px 0 24px;
    background-color: white;
    border-bottom: 1px solid #D9D9D9;
`

const Header = ({total = 0}) => {
    return(
      <Container>
        <HeadTitle2 style={{display:'block',textAlign:'center'}}>
          {formatMessage({id:'bpor.create.step3.title'},{value:total})}
        </HeadTitle2>
        <SizedBox height='1px' />
        <Text0 size='15px' style={{display:'block',textAlign:'center'}}>
          {formatMessage({id:'bpor.create.step3.subtitle'})}
        </Text0>
        <SizedBox height='16px' />
      </Container>
    )
}

export default Header
