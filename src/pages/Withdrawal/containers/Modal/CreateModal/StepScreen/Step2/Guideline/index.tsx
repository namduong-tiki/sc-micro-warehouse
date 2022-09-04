import styled from 'styled-components'
import {Col,Row} from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'
import React from 'react'
import { FormatHtmlMessage } from '@/utils/locale';
import { Text0, Text1 } from '@/components/Text';

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
      <StyledRow gutter={15} style={{marginLeft:0,marginRight:0}} wrap={false}>
        <Col style={{marginRight:15}} flex="none">
          <InformationIcon />
        </Col>
        <Col flex="auto">
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Text1 size='6px'>&#9679;</Text1>
            &ensp;
            <Text0>
              <FormatHtmlMessage id='bpor.create.title_create_step2.1' />
            </Text0>

          </div>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Text1 size='6px'>&#9679;</Text1>
            &ensp;
            <Text0>
              <FormatHtmlMessage id='bpor.create.title_create_step2.2' />
            </Text0>

          </div>
        </Col>
      </StyledRow>
    )
}

export default Guideline
