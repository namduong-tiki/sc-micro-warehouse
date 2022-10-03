import HoverText from '@/components/HoverText';
import { SubTitle1, Title1 } from '@/components/Text';
import { CloseCircleOutlined } from '@ant-design/icons';
import { FALLBACK_IMAGE, getProductMediaUrl } from '@/utils/image';
import { useFormatMessage } from '@/utils/locale';
import get from 'lodash/get';
import { Image } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { checkProductInWarehouse } from '../helper';
import WarehouseItem from './WarehouseItem';

const ItemContainer = styled.div`
  padding: 12px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 40px;
  min-width: 40px;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  margin-left: 8px;
`;

interface TableBoxProps {
  listSelected?: any;
  warehouseSelected?: any;
  onRemoveItemListSelected?: any;
  onChangeValueListSelected?: any;
}

const Item = ({ record, onRemoveItemListSelected, onChangeValueListSelected, warehouseSelected = [] }: any) => {
  const image = record?.thumbnail ? getProductMediaUrl(record?.thumbnail) : 'error';
  const cate = get(record, ['attributes', 'catalog_group_name'], '');
  const formatMessageText = useFormatMessage();
  return (
    <ItemContainer>
      <HeaderContainer>
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
                `${formatMessageText({ id: 'bpor.product_code' })}: ${
                  record?.seller_product_code
                } | `}
              <SubTitle1 color="orange">
                {formatMessageText({ id: 'bpor.inventory' })}:{' '}
                {record?.inventory?.qty_available || 0}
              </SubTitle1>
            </SubTitle1>
          </ContentContainer>
        </ProductContainer>
        <CloseCircleOutlined
      onClick={() => onRemoveItemListSelected(record)}
      style={{
        color: 'red',
        fontSize: 20,
        cursor: 'pointer',
        marginLeft:6
      }}
    />
      </HeaderContainer>
      {warehouseSelected.map((warehouse : any) => {
        const { availableQuantity,isDisable } = checkProductInWarehouse(record?.sku, warehouse);

        return (
            <>
                 <Title1>
        {formatMessageText({ id: 'bpor.warehouse' })} {warehouse?.code.toUpperCase()}
      </Title1>
      <WarehouseItem
            isMobile
            record={record}
            warehouse={warehouse}
            isDisable={isDisable}
            availableQuantity={availableQuantity}
            onChangeValueListSelected={onChangeValueListSelected}
          />
            </>
        )
      })}
   
    </ItemContainer>
  );
};

const TableBoxMobile: React.FC<TableBoxProps> = ({
  listSelected,
  warehouseSelected,
  onRemoveItemListSelected,
  onChangeValueListSelected,
}) => {
  return (
    <>
      {/* <ProductTable
            listSelected={listSelected}
            warehouseSelected={warehouseSelected}
            onRemoveItemListSelected={onRemoveItemListSelected}
            onChangeValueListSelected={onChangeValueListSelected}
          /> */}
      {listSelected.map((record: any) => {
        return <Item record={record} onRemoveItemListSelected={onRemoveItemListSelected} warehouseSelected={warehouseSelected}
        onChangeValueListSelected={onChangeValueListSelected}
        />;
      })}
    </>
  );
};

export default TableBoxMobile;
