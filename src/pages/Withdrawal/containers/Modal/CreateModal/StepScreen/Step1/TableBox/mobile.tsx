import { Image, Tabs, Tooltip, Pagination as PaginationAnt } from 'antd';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import get from 'lodash/get';
import { useFormatMessage } from '@/utils/locale';
import { FakeLink, SubTitle1, Text1, Title1 } from '@/components/Text';
import { FALLBACK_IMAGE, getProductMediaUrl } from '@/utils/image';
import HoverText from '@/components/HoverText';

const StyledTab = styled(Tabs)`
  .ant-tabs-nav-wrap {
    width: 100%;
    justify-content: space-evenly;
  }
  .ant-tabs-tab-btn {
    text-align: center;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  padding: 12px;
`;
const ItemContainer = styled.div<any>`
  border: 1px solid #d9d9d9;
  border-top: 0px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  ${({ isDisable }) =>
    isDisable &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `};
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentContainer = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 40px;
  min-width: 40px;
`;

interface TableBoxProps {
  data?: any;
  onChangeListSelected?: any;
  onChangeQuery?: any;
  limit?: any;
}
const ProductContent = ({ record = {} }: any) => {
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
          SKU: {record?.sku}
          {record?.seller_product_code &&
            ` | ${formatMessageText({ id: 'bpor.product_code' })}: ${
              record?.seller_product_code
            }`}{' '}
          |{' '}
          <SubTitle1 color="orange">
            {formatMessageText({ id: 'bpor.inventory' })}: {record?.inventory?.qty_available || 0}
          </SubTitle1>
        </SubTitle1>
        {record?.isDisable && (
          <Text1 color="red" size="14px">
            &nbsp;{` ${formatMessageText({ id: 'bpor.cant_import' })} `}
            <Tooltip title={formatMessageText({ id: 'bpor.not_current_in_warehouse' })}>
              <InfoCircleOutlined />
            </Tooltip>
          </Text1>
        )}
      </ContentContainer>
    </ProductContainer>
  );
};

const ActionContent = ({ action, isSelected, record }: any) => {
  if (isSelected) {
    return (
      <MinusCircleOutlined
        onClick={() => action('minus', record)}
        style={{
          fontSize: 20,
          cursor: 'pointer',
          color: 'red',
        }}
      />
    );
  }
  if (record?.isDisable) {
    return (
      <CloseCircleOutlined
        style={{
          fontSize: 20,
          cursor: 'pointer',
          color: 'red',
        }}
      />
    );
  }
  return (
    <PlusCircleOutlined
      onClick={() => action('add', record)}
      style={{
        fontSize: 20,
        cursor: 'pointer',
        color: '#1890FF',
      }}
    />
  );
};

const Item = ({ record, onChangeListSelected, isSelected }: any) => {
  return (
    <ItemContainer isDisable={record?.isDisable}>
      <ProductContent record={record} />
      <ActionContent record={record} action={onChangeListSelected} isSelected={isSelected} />
    </ItemContainer>
  );
};

const Table = ({
  formatMessage,
  total = 0,
  totalEnable = 0,
  isSelected,
  data = [],
  onChangeListSelected,
  onPageChange,
  pageProps,
}: any) => {
  return (
    <>
      <HeaderContainer>
        {isSelected ? (
          <Title1>
            {formatMessage({ id: 'common.all_product' })}({total})
          </Title1>
        ) : (
          <Title1>
            {formatMessage({ id: 'common.all_product' })}({total})
          </Title1>
        )}
        {isSelected ? (
          <FakeLink
            onClick={() => onChangeListSelected('all', data, 'minus')}
            style={{ color: 'red' }}
          >
            {formatMessage({ id: 'bpor.delete_all' })}
          </FakeLink>
        ) : (
          <div>
            <FakeLink
              style={{ display: 'block' }}
              onClick={() => onChangeListSelected('all', data, 'add')}
            >
              {formatMessage({ id: 'common.select_all' })}({total})
            </FakeLink>
            <SubTitle1 style={{ display: 'block' }}>
              ({totalEnable} {formatMessage({ id: 'bpor.sum.product' })})
            </SubTitle1>
          </div>
        )}
      </HeaderContainer>
      {data.map((record: any) => {
        return (
          <Item
            key={record?.id}
            record={record}
            onChangeListSelected={onChangeListSelected}
            isSelected={isSelected}
          />
        );
      })}
      <Pagination pageProps={pageProps} onPageChange={onPageChange} />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: white;
  margin: 10px 0;
`;

const Pagination = ({ pageProps, onPageChange }: any) => {
  return (
    <>
      <Container>
        <PaginationAnt {...pageProps} onChange={onPageChange} />
      </Container>
    </>
  );
};

const TableBoxMobile: React.FC<TableBoxProps> = ({
  data,
  onChangeListSelected,
  onChangeQuery,
  limit,
}) => {
  const [selectedSize, setSelectedSize] = useState(20);
  const onPageEnableChange = (page: any, pageSize: any) => onChangeQuery('page', page, pageSize);
  const onPageSelectedChange = (_page: any, pageSize: any) => setSelectedSize(pageSize);

  const formatMessage = useFormatMessage();
  const totalEnable = data?.listProduct?.paging?.total;
  const totalEnableSelect = data?.listProduct?.data.length || 0;
  const totalSelected = data?.listSelected?.data.length || 0;
  const pagePropsSelected = {
    pageSize: selectedSize,
    total: totalSelected,
    showSizeChanger: true,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]}(${formatMessage({ id: 'bpor.sum.total' })}: ${total})`,
  };
  const pagePropsEnable = {
    pageSize: limit,
    total: totalEnable,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]}(${formatMessage({ id: 'bpor.sum.total' })}: ${total})`,
  };
  return (
    <>
      <StyledTab defaultActiveKey="1">
        <Tabs.TabPane
          style={{ textAlign: 'center' }}
          tab={`${formatMessage({ id: 'bpor.mobile.enable_product' })} (${totalEnable})`}
          key="1"
        >
          <Table
            formatMessage={formatMessage}
            data={data?.listProduct?.data}
            total={totalEnable}
            totalEnable={totalEnableSelect}
            onChangeListSelected={onChangeListSelected}
            onPageChange={onPageEnableChange}
            pageProps={pagePropsEnable}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          style={{ textAlign: 'center' }}
          tab={`${formatMessage({ id: 'bpor.mobile.selected_product' })} (${totalSelected})`}
          key="2"
        >
          <Table
            formatMessage={formatMessage}
            data={data?.listSelected?.data}
            isSelected
            total={totalSelected}
            onChangeListSelected={onChangeListSelected}
            onPageChange={onPageSelectedChange}
            pageProps={pagePropsSelected}
          />
        </Tabs.TabPane>
      </StyledTab>
    </>
  );
};

export default TableBoxMobile;
