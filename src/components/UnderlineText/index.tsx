import React from 'react'
import styled from 'styled-components'
import { Text0 } from '../Text'

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const Dot = styled.div`
  flex: 1;
  border-bottom: 1px dashed #BFBFBF ;
  margin-bottom: 4px;
`


const UnderlineText = ({title, value = 0, color}:any) => {
    return (
      <TextBox>
        <Text0 color={color || '#8C8C8C'}>
          {title}:
        </Text0>
  
        <Dot />
        <Text0 color={color || '#262626'}>
          {value}
        </Text0>
      </TextBox>
    )
  }
  
  export default UnderlineText
