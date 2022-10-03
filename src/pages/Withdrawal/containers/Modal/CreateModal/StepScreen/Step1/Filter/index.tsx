import React, { useState } from 'react';
import { Col, Select, Row, Button, Input, Spin } from 'antd';
import { Search } from '@tikivn/sc-frontend-common';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import { useFormatMessage } from '@/utils/locale';
// import CategoriesCascader from '@/components/CategoriesCascader'
// import TagsInput from '@/pages/FBT/pages/Requisition/container/Header/TagsInput'
import { checkPlaceholderFilter } from './helper';
import SizedBox from '@/components/SizedBox';
import CategoriesCascader from '@/components/CategoriesCascader';

const { Option } = Select;

const StyledSelectInputOption = styled(Select)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  > .ant-select-selector {
    border-right: 0;
    display: flex;
    align-items: center;
    height: 40px;
  }
  > .ant-select-selector > span.ant-select-selection-placeholder {
    color: #595959;
    height: 40px;
  }
`;

const Flex1 = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const debounceFn = debounce((fn) => {
  fn();
}, 400);

interface FilterProps {
  onChangeQuery?: any;
  query?: any;
  isShowCate?: any;
  onOpenImportModal?: any;
}

const Filter: React.FC<FilterProps> = ({
  onChangeQuery,
  query = {},
  isShowCate,
  onOpenImportModal,
}) => {
  const { name: nameQuery = '', code: codeQuery = '', sku: skuQuery = [] } = query;
  // eslint-disable-next-line no-nested-ternary
  const [name, setName] = useState(nameQuery);
  const [code, setCode] = useState(codeQuery);
  const [sku, setSku] = useState(skuQuery);

  const [filterInputType, setFilterInputType] = useState('name');
  const formatMessage = useFormatMessage();

  const placeholder = formatMessage({ id: checkPlaceholderFilter(filterInputType) });

  const onSearch = (type: any, value: any) => {
    onChangeQuery(type, value);
  };
  const onInputSkuChange = (value = []) => {
    setSku(value);
    debounceFn(() => onSearch('sku', value));
  };

  const onInputNameChange = (input: any) => {
    const value = input?.target?.value;
    setName(value);
    debounceFn(() => onSearch('name', value));
  };

  const onInputCodeChange = (input: any) => {
    const value = input?.target?.value;
    setCode(value);
    debounceFn(() => onSearch('code', value));
  };

  const onChangeSelect = (value: any) => {
    setFilterInputType(value);
    if (value === 'name') {
      setSku([]);
      debounceFn(() => onSearch('sku', []));
    } else if (value === 'sku') {
      setName('');
      debounceFn(() => onSearch('name', ''));
    } else if (value === 'code') {
      setCode('');
      debounceFn(() => onSearch('code', ''));
    }
  };

  const onCategoriesChange = (val: any) => {
    const tempValue = val && val.length > 0 ? get(val, [0]) : '';
    onChangeQuery('categories', tempValue);
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={9}>
          <Row>
            <Col span={6} style={{ position: 'relative' }}>
              <StyledSelectInputOption
                placeholder={formatMessage({ id: 'bpor.order_code' })}
                style={{ width: '100%' }}
                onChange={onChangeSelect}
                value={filterInputType}
              >
                <Option value="name">{formatMessage({ id: 'bpor.product_name' })}</Option>
                <Option value="sku">SKU</Option>
                <Option value="code">{formatMessage({ id: 'bpor.order_code' })}</Option>
              </StyledSelectInputOption>
            </Col>
            <Col span={18}>
              {
                // eslint-disable-next-line no-nested-ternary
                filterInputType === 'name' ? (
                  <Input
                    allowClear
                    style={{ width: '100%', height: 40 }}
                    value={name}
                    onChange={onInputNameChange}
                    placeholder={placeholder}
                  />
                ) : filterInputType === 'code' ? (
                  <Input
                    allowClear
                    style={{ width: '100%', height: 40 }}
                    value={code}
                    onChange={onInputCodeChange}
                    placeholder={placeholder}
                  />
                ) : (
                  <Search
                    size="large"
                    id="search-1"
                    maxTags={20}
                    placeholder={placeholder}
                    value={sku}
                    onChange={onInputSkuChange}
                  />
                )
              }
            </Col>
          </Row>
        </Col>
        <Col span={15}>
          <Row style={{ display: 'flex', flexDirection: 'row' }}>
            <Spin spinning={!isShowCate}>
              <div
                style={{ width: 350, height: 40, border: !isShowCate ? '1px solid grey' : '0px' }}
              >
                {isShowCate && <CategoriesCascader size="large" onChange={onCategoriesChange} placeholder={formatMessage({id:'bpor.category'})} />}
              </div>
            </Spin>

            <Button onClick={() => onChangeQuery('clearCate')} style={{ height: 40 }}>
              <CloseOutlined />
            </Button>
            <Flex1>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <SizedBox width="7px" />
                <Button type="primary" onClick={onOpenImportModal}>
                  <UploadOutlined style={{ marginRight: 4 }} />
                  {formatMessage({ id: 'bpor.import_from_file' })}
                </Button>
              </div>
            </Flex1>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Filter;
