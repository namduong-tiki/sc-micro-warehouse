import SizedBox from '@/components/SizedBox';
import { Title1 } from '@/components/Text';
import UnderlineText from '@/components/UnderlineText';
import { useFormatMessage } from '@/utils/locale';
import React from 'react';
import { checkIsDraftBPOR } from './helper';

interface Props {
  record: any;
}

const Warehouse: React.FC<Props> = ({ record }) => {
  const formatMessage = useFormatMessage();
  const isDraft = checkIsDraftBPOR(record?.status);
  const warehouse = record?.warehouse_code || '';
  const expectedQty = record?.expected_qty || 0;
  const actualQty = record?.actual_qty || 0;
  const diffQty = expectedQty - actualQty || 0;

  if (isDraft) {
    return (
      <>
        <Title1 style={{ display: 'block' }}>Kho {warehouse.toUpperCase()}</Title1>
        <SizedBox height="5px" />
        <UnderlineText title={formatMessage({ id: 'Yêu cầu rút' })} value={expectedQty} />
      </>
    );
  }
  return (
    <>
      <Title1 style={{ display: 'block' }}>Kho {warehouse.toUpperCase()}</Title1>
      <SizedBox height="5px" />
      <UnderlineText title={formatMessage({ id: 'Yêu cầu rút' })} value={expectedQty} />

      <SizedBox height="5px" />
      <UnderlineText title={formatMessage({ id: 'Có thể rút' })} value={expectedQty} />

      <SizedBox height="5px" />
      <UnderlineText title={formatMessage({ id: 'Thực nhận' })} value={actualQty} />
      {diffQty && (
        <>
          <SizedBox height="5px" />
          <UnderlineText
            color={'red'}
            title={formatMessage({ id: 'Chênh lệch' })}
            value={diffQty}
          />
        </>
      )}
    </>
  );
};

export default Warehouse;
