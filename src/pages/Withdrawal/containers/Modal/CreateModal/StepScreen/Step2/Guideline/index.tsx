import styled from 'styled-components'
import {InfoCircleOutlined} from '@ant-design/icons'
import React from 'react'
import { Text1,NormalText } from '@/components/Text';
import { FormatHtmlMessage } from '@/utils/locale';

const StyledRow = styled.div`
  display: flex ;
  flex-direction: row ;
  background-color: #E6F7FF;
  border: 1px solid #91D5FF;
  padding: 12px 16px;
  border-radius: 2px;
`
const Col = styled.div`
  display: flex ;
  flex-direction: column ;
`
const InformationIcon = styled(InfoCircleOutlined)`
  color: #1890FF;
  font-size: 21px;
`

const Guideline = () => {
    return(
      <StyledRow style={{marginLeft:0,marginRight:0}}>
        <Col style={{marginRight:10, marginTop:5}}>
          <InformationIcon />
        </Col>
        
        <Col >
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Text1 size='6px'>&#9679;</Text1>
            &ensp;
            <NormalText>
              <FormatHtmlMessage id='bpor.create.title_create_step2.1'/>
            </NormalText>
          </div>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Text1 size='6px'>&#9679;</Text1>
            &ensp;
            <NormalText>
              <FormatHtmlMessage id='bpor.create.title_create_step2.2' />
            </NormalText>
          </div>
     
        
        </Col>
      </StyledRow>
    )
}

export default Guideline
