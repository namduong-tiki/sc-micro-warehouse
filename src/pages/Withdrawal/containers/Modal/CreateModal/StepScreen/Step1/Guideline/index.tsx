import { Row,Col } from 'antd'
import styled from 'styled-components'
import {InfoCircleOutlined} from '@ant-design/icons'
import React from 'react'
import { Text1,NormalText } from '@/components/Text';
import { FormatHtmlMessage } from '@/utils/locale';

const StyledRow = styled(Row)`
  background-color: #E6F7FF;
  border: 1px solid #91D5FF;
  padding: 16px 24px;
  border-radius: 2px;

`
const InformationIcon = styled(InfoCircleOutlined)`
  color: #1890FF;
  font-size: 21px;
`

const Guideline = () => {
    return(
      <StyledRow gutter={15} style={{marginLeft:0,marginRight:0}}>
        <Col>
          <InformationIcon />
        </Col>
        <Col>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Text1 size='6px'>&#9679;</Text1>
            &ensp;
            <NormalText>
              <FormatHtmlMessage id='bpor.create.title_create_step1.1'/>
            </NormalText>
          </div>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Text1 size='6px'>&#9679;</Text1>
            &ensp;
            <NormalText>
              <FormatHtmlMessage id='bpor.create.title_create_step1.2' />
            </NormalText>
          </div>
     
        
        </Col>
      </StyledRow>
    )
}

export default Guideline
