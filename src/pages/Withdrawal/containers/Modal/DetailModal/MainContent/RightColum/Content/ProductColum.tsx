import { Image } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { SubTitle1, Text0, Title1 } from '@/components/Text';
import { formatMessage, useFormatMessage } from '@/utils/locale';
import { FALLBACK_IMAGE } from '@/utils/image';
import HoverText from '@/components/HoverText';
import UnderlineText from '@/components/UnderlineText';
import SizedBox from '@/components/SizedBox';
import { useQuantityHook } from '@/pages/Withdrawal/hook/statusHook';

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
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'common.number' })}</Text0>,
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
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'bpor.product' })}</Text0>,
      width: '60%',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => {
        if (record?.total)
          return (
            <Text0>
              {formatMessage({ id: 'bpor.sum.total' })}: {record?.total}{' '}
              {formatMessage({ id: 'bpor.sum.product' })}
            </Text0>
          );
        return <Product record={record} />;
      },
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'bpor.number' })}
          </Text0>
        </>
      ),
      width: '22%',
      key: 'sl',
      render: (_: any, record: any) => {
        if (record?.total)
          return (
            <Text0>
              {formatMessage({ id: 'bpor.number' })}: {record?.totalUnit}
            </Text0>
          );
        return <Quantity record={record} status={status} />;
      },
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'bpor.note' })}
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
  const formatMessageHook = useFormatMessage();
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
          {record?.product_unit &&
            ` - ${formatMessageHook({ id: 'bpor.order_code' })}: ${record?.product_unit} `}
        </SubTitle1>
      </ContentContainer>
    </ProductContainer>
  );
};

const Quantity = ({ record, status }: any) => {
  const {
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
  } = useQuantityHook(record, status);
  if (isCancel) {
    return <UnderlineText title={formatMessage({ id: 'common.request' })} value={expectedQty} />;
  }
  return (
    <>
      <UnderlineText title={formatMessage({ id: 'common.request' })} value={expectedQty} />
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
          <UnderlineText title={formatMessage({ id: 'bpor.warehouse.diff_qty' })} value={diffQty} color="red" />
        </>
      )}
      {isShowLiquidated && (
        <>
          <SizedBox height="5px" />
          <UnderlineText
            title={formatMessage({ id: 'Dã thanh lý' })}
            value={liquidatedQty}
            color="red"
          />
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
