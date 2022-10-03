import SizedBox from '@/components/SizedBox';
import { Title1 } from '@/components/Text';
import UnderlineText from '@/components/UnderlineText';
import { useFormatMessage } from '@/utils/locale';
import React from 'react';
import { useQuantityHook } from '../../hook/statusHook';

interface Props {
  record: any;
}

const Warehouse: React.FC<Props> = ({ record }) => {
  const formatMessage = useFormatMessage();
  const {
    warehouse,
    isDraft,
    isCancel,
    expectedQty,
    actualQty,
    diffQty,
    liquidatedQty,
    isShowDeviant,
    isShowEnable,
    estimatedQty,
    isShowActualQty,
    isShowLiquidated,
  } = useQuantityHook(record,record?.status);

  if (isDraft || isCancel) {
    return (
      <>
        <Title1 style={{ display: 'block' }}>{formatMessage({id:'bpor.warehouse'})} {warehouse.toUpperCase()}</Title1>
        <SizedBox height="5px" />
        <UnderlineText title={formatMessage({ id: 'bpor.warehouse.expected_qty' })} value={expectedQty} />
      </>
    );
  }
  return (
    <>
      <Title1 style={{ display: 'block' }}>{formatMessage({id:'bpor.warehouse'})} {warehouse.toUpperCase()}</Title1>
      <SizedBox height="5px" />
      <UnderlineText title={formatMessage({ id: 'bpor.warehouse.expected_qty' })} value={expectedQty} />

      {isShowEnable && (
        <>
          <SizedBox height="5px" />
          <UnderlineText title={formatMessage({ id: 'bpor.warehouse.estimated_qty' })} value={estimatedQty} />
        </>
      )}

      {isShowActualQty && (
        <>
          <SizedBox height="5px" />
          <UnderlineText title={formatMessage({ id: 'bpor.warehouse.actual_qty' })} value={actualQty} />
        </>
      )}
      {isShowDeviant && (
        <>
          <SizedBox height="5px" />
          <UnderlineText
            color={'red'}
            title={formatMessage({ id: 'bpor.warehouse.diff_qty' })}
            value={diffQty}
          />
        </>
      )}
      {isShowLiquidated && (
        <>
          <SizedBox height="5px" />
          <UnderlineText
            color={'red'}
            title={formatMessage({ id: 'bpor.warehouse.liquidated_qty' })}
            value={liquidatedQty}
          />
        </>
      )}
    </>
  );
};

export default Warehouse;
