import SizedBox from '@/components/SizedBox'
import React from 'react'
import styled from 'styled-components'
import { CheckOutlined } from '@ant-design/icons'
import { useFormatMessage } from '@/utils/locale'

type Props = {
  data: any;
  isSelected?: any,
  onClick?: any,
  isMobile?: boolean,
}

type StyledProp = {
isSelected : boolean,
isMobile?: boolean,
}

const Text0 = styled.span`
font-weight: 400;
font-size: 14px;
line-height: 22px;
color: #262626;
`
const QuickFilterContainer = styled.div<StyledProp>`
  min-height: 32px;
  padding: 3px 16px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => props?.isSelected ? '#E6F7FF' : 'white'};
  border: 1px solid #1890FF;
  cursor: pointer;
  flex-shrink: 0;
  margin-right: ${props => props?.isMobile ? '12px' : 0};

`

export default function QuickFilterBox({data, isSelected, onClick,isMobile}: Props) {
  const formatMessage = useFormatMessage();
  return (
    <QuickFilterContainer isSelected={isSelected} onClick={onClick} isMobile={isMobile}>
  {isSelected && <>  
   <CheckOutlined style={{ color: '#1890FF' }} />
    <SizedBox width="5px" />
  </>
    }
    <Text0>{formatMessage({id:data?.label})}</Text0>
  </QuickFilterContainer>  )
}