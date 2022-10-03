import SizedBox from '@/components/SizedBox';
import { Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { QUICK_FILTER } from '../../constants/quickFilter';
import QuickFilterBox from './QuickFilterBox';
import { useQuickFilterHook } from './quickFilterHook';

const Container = styled.div`
  padding: 0px 24px;
  margin-bottom: 24px;
`;

type Props = {};

export default function QuickFilter({}: Props) {
  const {
    shippingMethod,
    needWithdraw,
    onChangeShippingMethod,
    onChangeNeedWithdraw,
    isShowNeedWithdraw,
    onChangeFilterLiquidated,
    isFilterLiquidated,
    isShowLiquidated,
  } = useQuickFilterHook();

  const onChangeShippingMethodHandle = () => onChangeShippingMethod(shippingMethod ? '' : 'manual');
  const onChangeNeedWithdrawHandle = () => onChangeNeedWithdraw(needWithdraw ? '' : 10);
  const onChangeFilterLiquidatedHandle = () => onChangeFilterLiquidated();

  return (
    <Container>
      <Row>
        <QuickFilterBox
          isSelected={shippingMethod === 'manual'}
          onClick={onChangeShippingMethodHandle}
          data={QUICK_FILTER.TIKI_RETURN}
        />
        {isShowNeedWithdraw && (
          <>
            <SizedBox width="10px" />
            <QuickFilterBox
              data={QUICK_FILTER.NEED_TO_WITHDRAW_SOON}
              isSelected={needWithdraw}
              onClick={onChangeNeedWithdrawHandle}
            />
          </>
        )}
        {isShowLiquidated && (
          <>
            <SizedBox width="10px" />
            <QuickFilterBox
              isSelected={isFilterLiquidated}
              onClick={onChangeFilterLiquidatedHandle}
              data={QUICK_FILTER.OVERDUE_AND_LIQUIDATION}
            />
          </>
        )}
      </Row>
    </Container>
  );
}
