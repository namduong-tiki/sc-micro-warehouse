import styled from 'styled-components'
import {InfoCircleOutlined} from '@ant-design/icons'
import { Link as UmiLink } from 'react-router-dom';
import React from 'react'
import { LinkURL, NormalText, Text0, Text1, Title1 } from '@/components/Text';
import { FormatHtmlMessage, formatMessage } from '@/utils/locale';


const StyledRow = styled.div`
  background-color: #E6F7FF;
  border: 1px solid #91D5FF;
  padding: 16px 24px  ;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  margin-bottom:18px ;
  margin-top: 18px;

`
const InformationIcon = styled(InfoCircleOutlined)`
  color: #1890FF;
  font-size: 21px;
`



const GuidelineMobile:React.FC = () => {
    return(
      <StyledRow style={{marginLeft:0,marginRight:0}}>
        <div style={{marginRight:12}}>
          <InformationIcon />
        </div>
        <div style={{flex:1}}>
          <Title1 style={{display:'block',marginBottom:6}}>
            {formatMessage({id:'common.guideline'})}
          </Title1>

          <NormalText style={{display:'block'}}>
            <Text1 size='6px'>&#9679;</Text1>
            &ensp;
            <Text0 style={{textDecoration:'underline'}}>{formatMessage({id:'common.step1'})}</Text0>:
            &nbsp;
            <FormatHtmlMessage id='bpor.title_detai_step1' />
            <LinkURL target="_blank" >
            &nbsp;[{formatMessage({id:'bpor.title_detai_step1.1'})}]
            </LinkURL>
          </NormalText>

          <NormalText style={{display:'block'}}>
            <Text1 size='6px'>&#9679;</Text1>
            &ensp;
            <Text0 style={{textDecoration:'underline'}}>{formatMessage({id:'common.step2'})}</Text0>:
            &nbsp;
            <FormatHtmlMessage id='bpor.title_detai_step2' />
            &nbsp;
            <UmiLink
              to={''}
              target="_blank"
            >
              [{formatMessage({ id: 'bpor.title_detai_step2.1' })}]
            </UmiLink>
          </NormalText>
        </div>
   
      </StyledRow>
    )
}

export default GuidelineMobile
