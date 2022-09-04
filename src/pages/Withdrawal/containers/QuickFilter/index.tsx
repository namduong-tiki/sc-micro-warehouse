import SizedBox from '@/components/SizedBox';
import { Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { QUICK_FILTER } from '../../constants/quickFilter';
import QuickFilterBox from './QuickFilterBox'

const Container = styled.div`
  padding: 0px 24px;
  margin-bottom: 24px ;
`;

type Props = {};

export default function QuickFilter({}: Props) {
  return (
    <Container>
      <Row>
        <QuickFilterBox data={QUICK_FILTER.TIKI_RETURN} />
        <SizedBox width="10px" />
        <QuickFilterBox data={QUICK_FILTER.NEED_TO_WITHDRAW_SOON}/>
        <SizedBox width="10px" />
        <QuickFilterBox data={QUICK_FILTER.OVERDUE_AND_LIQUIDATION} />

      </Row>
    </Container>
  );
}
