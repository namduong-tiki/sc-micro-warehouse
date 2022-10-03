import HoverText from '@/components/HoverText';
import SizedBox from '@/components/SizedBox';
import { SubTitle1, Text0, Title1 } from '@/components/Text';
import UnderlineText from '@/components/UnderlineText';
import { useQuantityHook } from '@/pages/Withdrawal/hook/statusHook';
import { FALLBACK_IMAGE } from '@/utils/image';
import { useFormatMessage } from '@/utils/locale';
import { Divider, Image } from 'antd';
import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  margin-left: 8px;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 41;
  width: 41;
`;

const TotalContainer = styled.div`
  background-color: #e6f7ff;
  padding: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Quantity = ({ record, status, formatMessage }: any) => {
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
          <UnderlineText
            title={formatMessage({ id: 'bpor.warehouse.estimated_qty' })}
            value={estimatedQty}
          />
        </>
      )}

      {isShowActualQty && (
        <>
          <SizedBox height="5px" />
          <UnderlineText
            title={formatMessage({ id: 'bpor.warehouse.actual_qty' })}
            value={actualQty}
          />
        </>
      )}
      {isShowDeviant && (
        <>
          <SizedBox height="5px" />
          <UnderlineText
            title={formatMessage({ id: 'bpor.warehouse.diff_qty' })}
            value={diffQty}
            color="red"
          />
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

const Item = ({ record, formatMessageHook }: any) => {
  if (record?.total) return null;
  return (
    <>
      <SizedBox height="20px" />
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
          <Quantity record={record} status={record?.status} formatMessage={formatMessageHook} />
        </ContentContainer>
      </ProductContainer>
      <Divider />
    </>
  );
};

const ProductListMobile = ({ dataSource }: any) => {
  const formatMessageHook = useFormatMessage();
  const total = get(dataSource, [0], {});
  return (
    <>
      <div style={{ padding: '0 24px' }}>
        {dataSource.map((record: any) => {
          return (
            <Item formatMessageHook={formatMessageHook} key={record?.product_sku} record={record} />
          );
        })}
      </div>
      <TotalContainer>
        <Row>
          <Title1>{formatMessageHook({ id: 'bpor.sum.total' })}</Title1>
          <Text0>
            {total?.total} {formatMessageHook({ id: 'bpor.sum.product' })}
          </Text0>
        </Row>
        <Row>
          <Title1>{formatMessageHook({ id: 'bpor.number' })}</Title1>
          <Text0>{total?.totalUnit}</Text0>
        </Row>
      </TotalContainer>
    </>
  );
};

export default ProductListMobile;
