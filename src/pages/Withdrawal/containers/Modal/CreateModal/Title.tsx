import { Row,Col } from 'antd'
import React from 'react'
import { formatMessage } from '@/utils/locale';
import logoSC from '../../../logo.png'
import styled from 'styled-components';

const HeadTitle1 = styled.span`
  font-style: normal;
  color: #262626;
  font-weight: 600;
  font-size: 20px ;
`

const Title = () => {
    return(
      <Row
        style={{
        display: 'flex',
        alignItems:'center',
        flexDirection:'row'
      }}
        gutter={12}
      >
        <Col>
          <img
            src={logoSC}
            alt=''
            style={{width:40, height:40}}
          />
        </Col>
        <Col>
          <HeadTitle1>
            {formatMessage({id:'bpor.create'})} (BPOR)
          </HeadTitle1>
        </Col>
      </Row>
    )
}

export default Title
