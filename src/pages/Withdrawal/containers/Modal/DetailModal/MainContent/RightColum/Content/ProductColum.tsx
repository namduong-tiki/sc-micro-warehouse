import { Image } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { SubTitle1, Text0, Title1 } from '@/components/Text';
import { formatMessage, useFormatMessage } from '@/utils/locale';
import { FALLBACK_IMAGE } from '@/utils/image';
import HoverText from '@/components/HoverText';
import UnderlineText from '@/components/UnderlineText';
import SizedBox from '@/components/SizedBox';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 41;
  width: 41;
`;

export const ProductColum = ({ status }: any) => {
  return [
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'STT' })}</Text0>,
      dataIndex: 'stt',
      with: '7%',
      align: 'center',
      key: 'stt',
      render: (_: any, record: any, index: any) => {
        if (record?.total) return null;
        return <p>{index}</p>;
      },
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'Sản phẩm' })}</Text0>,
      width: '60%',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => {
        if (record?.total)
          return (
            <Text0>
              {formatMessage({ id: 'Tổng cộng' })}: {record?.total}{' '}
              {formatMessage({ id: 'sản phẩm' })}
            </Text0>
          );
        return(
        <Product record={record} />);
      },
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'Số lượng' })}
          </Text0>
        </>
      ),
      width: '22%',
      key: 'sl',
      render: (_: any, record: any) => {
        if (record?.total) return (
          <Text0>
          {formatMessage({ id: 'Số lượng' })}: {record?.totalUnit}
        </Text0>
        );
        return(
        <Quantity record={record} status={status} />);
      },
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'Ghi chú' })}
          </Text0>
        </>
      ),
      width: '18%',
      key: 'sl',
      render: (_: any, record: any) => {
        if (record?.total) return null;
        return <Note record={record} />;
      },
    },
  ];
};

const Note = ({ record }: any) => {
  return (
    <>
      {record?.note && <span style={{ display: 'block' }}>{record?.note}</span>}
      {record.rejected_reason && record.rejected_reason.length > 0 && (
        <span style={{ display: 'block' }}>
          {formatMessage({ id: 'Lý do huỷ' })}:{' '}
          {record.rejected_reason.map((i: any, index: number) => (
            <span>
              {index !== 0 && <span>{', '}</span>}
              {i}
            </span>
          ))}
        </span>
      )}
    </>
  );
};

const Product = ({ record }: any) => {
  const formatMessageHook = useFormatMessage()
  return (
    <ProductContainer>
      <ImageContainer>
        <Image width={40} height={40} src={record?.product_image} fallback={FALLBACK_IMAGE} />
      </ImageContainer>
      <ContentContainer>
        <HoverText fullText={record?.product_name}>
          <Title1 style={{ display: 'block', fontWeight: '600' }}>{record?.product_name}</Title1>
        </HoverText>
        <SubTitle1>
          SKU: {record?.product_sku}
          {` - ${formatMessageHook({ id: 'bpor.order_code' })}: ${record?.product_unit} `}
        </SubTitle1>
      </ContentContainer>
    </ProductContainer>
  );
};

const Quantity = ({ record, status = {} }: any) => {
  const { isSuccess, isLiquidated } = status;
  const expectedQty = record?.expected_qty || 0;
  const actualQty = record?.actualQty || 0;
  // const rejectedQuantity = record?.rejected_quantity || 0
  const diff = expectedQty - actualQty;
  return (
    <>
      <UnderlineText title={formatMessage({ id: 'Yêu cầu' })} value={expectedQty} />
      <SizedBox height="5px" />
      <UnderlineText title={formatMessage({ id: 'Có thể xuất' })} value={actualQty} />
      <>
        <SizedBox height="5px" />
        <UnderlineText title={formatMessage({ id: 'Thực nhận' })} value={actualQty} />
      </>
      {isSuccess && (
        <>
          <SizedBox height="5px" />
          <UnderlineText title={formatMessage({ id: 'Chênh lệch' })} value={diff} color="red" />
        </>
      )}
      {isLiquidated && (
        <>
          <SizedBox height="5px" />
          <UnderlineText title={formatMessage({ id: 'Dã thanh lý' })} value={diff} color="red" />
        </>
      )}
    </>
  );
};

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  margin-left: 8px;
`;
