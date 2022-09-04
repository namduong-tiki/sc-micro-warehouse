import { FakeLink, Link1, SubTitle1, Text0 } from '@/components/Text';
import { Tag } from 'antd';
import React, { useContext } from 'react';
import {  ShopOutlined } from '@ant-design/icons';
import { AppContext } from '../../contexts/AppContext';
import { checkIsDraftBPOR } from './helper';
import dayjs from 'dayjs';
import { useCanSelectSeller } from '@/components/SellerSelect';
import Copy from '@/components/Copy';

export const useOpenDetail = (id: any) => {
  const canSelectSeller = useCanSelectSeller();

  const { setDetailModalData, query, setQuery } = useContext(AppContext);

  const onOpenDetail = () => {
    setQuery({
      ...query,
      selectedId: id,
    });
    setDetailModalData({
      isVisible: true,
    });
  };

  return {
    onOpenDetail,
    canSelectSeller,
  };
};

interface Props {
  record: any;
}

const Code: React.FC<Props> = ({ record }) => {
  const { onOpenDetail, canSelectSeller } = useOpenDetail(record?.id);
  const isDraft = checkIsDraftBPOR(record?.status);
  if (isDraft) {
    const time = record?.created_at
      ? dayjs.unix(record?.created_at).format('DD/MM/YYYY - HH:mm:ss')
      : '';
    return (
      <>
        <Link1 style={{ display: 'block' }}>
          <Link1 size="14px" fontWeight="600" onClick={onOpenDetail}>
            BPOR nháp - {time}
          </Link1>
        </Link1>
        {canSelectSeller && (
          <Tag style={{ marginTop: 5, borderRadius: 10, backgroundColor: '#F0F0F0' }}>
            <ShopOutlined style={{ color: '#8C8C8C' }} />
            <span style={{ color: '#595959', fontWeight: 400 }}>{record?.seller_name}</span>
          </Tag>
        )}
      </>
    );
  }
  return (
    <>
      <FakeLink size="14px" fontWeight="600" style={{ display: 'block' }}>
        <Link1 onClick={onOpenDetail} style={{ marginRight: 5 }}>
          {record?.code}
        </Link1>
        <Copy text={record?.code} />
      </FakeLink>

      {/* reference_code */}
      {record?.reference_code && 
           <>
           <SubTitle1 style={{ display: 'block' }}>Mã phiếu gửi nhà bán:</SubTitle1>
           <Text0 style={{ display: 'block' }}>
             {record?.reference_code} <Copy text={record?.reference_code} />
           </Text0>

         </>
      
      }
 
      {canSelectSeller && (
        <Tag style={{ marginTop: 5, borderRadius: 10, backgroundColor: '#F0F0F0' }}>
          <ShopOutlined style={{ color: '#8C8C8C' }} />
          <span style={{ color: '#595959', fontWeight: 400 }}>{record?.seller_name}</span>
        </Tag>
      )}
    </>
  );
};

export default Code;
