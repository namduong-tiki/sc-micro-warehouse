import { SubTitle2, Text1, Title1 } from '@/components/Text';
import { Card, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Option } = Select;

const OptionContainer = styled.div`
  margin: 6px 0px;
`;

interface Props {
  [key: string]: any;
}

const WarehouseInfo: React.FC<Props> = ({ tikiReturnWarehouse,warehouseCode,onSelectTikiReturnWarehouse }) => {

  const onSelect = (value:any) => {
    onSelectTikiReturnWarehouse(warehouseCode,value)
  }
  return (
    <>
      <Card
        title="Bạn muốn tới kho Tiki nào để nhận hàng?"
        headStyle={{ backgroundColor: '#E8E8E8' }}
      >
        <Select
          optionLabelProp="label"
          placeholder="Chọn"
          style={{ width: 600 }}
          onChange={onSelect}
        >
          {tikiReturnWarehouse.map((i: any) => {
            return (
              <Option
              label={i?.name}
              key={i?.code} 
              value={i?.code}
              >
                <OptionContainer>
                  <Title1 style={{ display: 'block' }}>{i?.name}</Title1>
                  <Text1 style={{ display: 'block' }}>{i?.address}</Text1>
                  <SubTitle2 style={{ display: 'block' }}>
                    Thông tin liên lạc: {i?.contact}
                  </SubTitle2>
                </OptionContainer>
              </Option>
            );
          })}
        </Select>
      </Card>
    </>
  );
};

export default WarehouseInfo;
