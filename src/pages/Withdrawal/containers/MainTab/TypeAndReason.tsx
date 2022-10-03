import { Text1, Text0, SubTitle1 } from '@/components/Text';
import React from 'react';
import { checkIsDraftBPOR } from '../../constants/status';

interface Props {
  record: any;
}

const TypeAndReason: React.FC<Props> = ({ record }) => {
  const isDraft = checkIsDraftBPOR(record?.status);
  if (isDraft) {
    return (
      <>
        <Text1>--</Text1>
      </>
    );
  }
  return (
    <>
      <Text0 style={{ display: 'block' }}>Nhà bán rút hàng</Text0>
      <SubTitle1>Tạo bởi: </SubTitle1>
      <Text0>{record?.created_by}</Text0>
    </>
  );
};

export default TypeAndReason;
