import { Image } from 'antd';
import React from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { SubTitle1, Title1 } from '@/components/Text';
import { useFormatMessage } from '@/utils/locale';
import { FALLBACK_IMAGE, getProductMediaUrl } from '@/utils/image';
import HoverText from '@/components/HoverText';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 41;
  width: 41;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  margin-left: 8px;
`;

const ProductContent = ({ record = {} }: { record: any }) => {
  const image = record?.thumbnail ? getProductMediaUrl(record?.thumbnail) : 'error';
  const cate = get(record, ['attributes', 'catalog_group_name'], '');
  const formatMessageText = useFormatMessage();

  return (
    <ProductContainer>
      <ImageContainer>
        <Image width={40} height={40} src={image} fallback={FALLBACK_IMAGE} />
      </ImageContainer>
      <ContentContainer>
        <HoverText fullText={record?.name}>
          <Title1 style={{ display: 'block', fontWeight: '600' }}>{record?.name}</Title1>
        </HoverText>

        <SubTitle1 style={{ display: 'block' }}>
          {`${formatMessageText({ id: 'bpor.category' })}:  ${cate}`}
          {record?.brand?.value &&
            ` | ${formatMessageText({ id: 'bpor.trademark' })}: ${record?.brand?.value}`}
        </SubTitle1>
        <SubTitle1>
          SKU: {record?.sku} |{' '}
          {record?.seller_product_code &&
            `${formatMessageText({ id: 'bpor.product_code' })}: ${record?.seller_product_code} | `}
          <SubTitle1 color="orange">
            {formatMessageText({ id: 'bpor.inventory' })}: {record?.inventory?.qty_available || 0}
          </SubTitle1>
        </SubTitle1>
      </ContentContainer>
    </ProductContainer>
  );
};
export default ProductContent;
