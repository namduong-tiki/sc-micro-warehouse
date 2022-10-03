import SizedBox from '@/components/SizedBox';
import React from 'react';
import styled from 'styled-components';
import { QUICK_FILTER } from '../../constants/quickFilter';
import QuickFilterBox from './QuickFilterBox';
import { useQuickFilterHook } from './quickFilterHook';

const Container = styled.div`
  padding: 0px 24px;
`;

type Props = {};

export default function QuickFilterMobile({}: Props) {
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
    <>

    <Container>
      <div style={{ overflowX: 'scroll', width: '100%', display: 'flex', flexDirection: 'row' }}>
        <QuickFilterBox
          isMobile
          isSelected={shippingMethod === 'manual'}
          onClick={onChangeShippingMethodHandle}
          data={QUICK_FILTER.TIKI_RETURN}
        />
        {isShowNeedWithdraw && (
          <>
            <SizedBox width="10px" />
            <QuickFilterBox
              isMobile
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
              isMobile
              isSelected={isFilterLiquidated}
              onClick={onChangeFilterLiquidatedHandle}
              data={QUICK_FILTER.OVERDUE_AND_LIQUIDATION}
            />
          </>
        )}
      </div>
    </Container>
    <SizedBox height="12px" />

    <div style={{height:12,backgroundColor:'#f5f5f5'}}/>
    <SizedBox height="12px" />

    </>
  );
}
