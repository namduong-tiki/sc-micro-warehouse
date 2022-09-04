import SizedBox from '@/components/SizedBox'
import React from 'react'
import styled from 'styled-components'
import { CheckOutlined } from '@ant-design/icons'
import { useFormatMessage } from '@/utils/locale'

type Props = {
  data: any
}

const Text0 = styled.span`
font-weight: 400;
font-size: 14px;
line-height: 22px;
color: #262626;
`
const QuickFilterContainer = styled.div`
  min-height: 32px;
  padding: 3px 16px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #1890FF;
  cursor: pointer;
`

export default function QuickFilterBox({data}: Props) {
  const formatMessage = useFormatMessage();
  return (
    <QuickFilterContainer >
   <CheckOutlined style={{ color: '#1890FF' }} />
    <SizedBox width="5px" />
    <Text0>{formatMessage({id:data?.label})}</Text0>
  </QuickFilterContainer>  )
}