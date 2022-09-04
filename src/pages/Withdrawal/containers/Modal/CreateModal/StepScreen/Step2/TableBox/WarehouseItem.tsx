import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { checkValidate } from './checkValidate';
import { useFormatMessage } from '@/utils/locale';
import SizedBox from '@/components/SizedBox';
import { SubTitle2 } from '@/components/Text';
import { setNumberWithdrawal } from '@/pages/Withdrawal/utils/setDataCreate';

interface DynamicProps {
  [key: string]: any;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ColumContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const WeightContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-left: 8px;
`;

const StyledInput = styled(Input)<DynamicProps>`
  width: 144px;
  height: 32px;
  text-align: end;
  border: ${(props) => props?.isError && '1px solid red'};
  :focus {
    border: ${(props) => props?.isError && '1px solid red'};
  }
  :hover {
    border: ${(props) => props?.isError && '1px solid red'};
  }
`;

const ControlContainer = styled.div<DynamicProps>`
  display: flex;
  flex-direction: column;
  border: ${(props) => (props?.isError ? '1px solid red' : '1px solid #d9d9d9')};
  border-left: 0px;
  cursor: ${(props) => props.isDisable && 'not-allowed'};
  background-color: ${(props) => props.isDisable && '#F5F5F5'};
  :hover {
    border: ${(props) => (props.isDisable || props.isError ? '' : '1px solid #1890ff')};
  }
  height: 32px;
  width: 30px;
`;

const IconContainer = styled.div<DynamicProps>`
  flex: 1;
  border-bottom: ${(props) => props.top && '1px solid #d9d9d9'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const debounceFN = debounce((fn, e) => fn(e), 700);

interface WarehouseItemProps {
  record: any;
  warehouse?: any;
  isDisable?: boolean;
  availableQuantity: number;
  onChangeValueListSelected?: any;
}

const WarehouseItem = ({
  record,
  warehouse,
  isDisable,
  availableQuantity,
  onChangeValueListSelected,
}: WarehouseItemProps) => {
  const formatMessage = useFormatMessage();
  const { valueInit, sku, weight }: any = checkValidate(warehouse?.code, record);
  const [value, setValue] = useState(valueInit);
  if (isDisable)
    return (
      <SubTitle2 style={{ display: 'block' }}>
        {formatMessage({ id: 'bpor.create.step2.empty_product' })}
      </SubTitle2>
    );

  const saveValue = (obj: any) => {
    setNumberWithdrawal(obj?.warehouseCode, obj?.sku, obj?.value,obj?.weight, onChangeValueListSelected);
  };

  const onChangeValue = (e: any, isMinus: any,) => {
    try {
      if (isDisable) return;
      if (e > availableQuantity && !isMinus) return;
      const obj = {
        value: e,
        sku,
        weight,
        warehouseCode: warehouse?.code,
      };
      debounceFN(saveValue, obj);
      setValue(e);
    } catch (error) {}
  };

  const totalWeight =
    !value || value === 0
      ? 0
      : parseFloat((parseInt(value, 10) * parseFloat(weight)).toString()).toFixed(2);
  return (
    <Container>
      <ColumContainer>
        <InputContainer>
          <StyledInput
            onChange={(e: any) => {
              const number: any = e?.target?.value || 0;
              if (!Number.isNaN(number) && number <= availableQuantity) {
                const obj = {
                  value: parseInt(number, 10),
                  sku,
                  weight,
                  warehouseCode: warehouse?.code,
                };
                debounceFN(saveValue, obj);
                setValue(number);
              }
            }}
            value={value}
          />
          <Control onChangeValue={onChangeValue} value={value} />
          {weight && <Weight value={totalWeight} />}
        </InputContainer>
        <SizedBox height="5px" />

        <SubTitle2 style={{ display: 'block' }}>
          {`${formatMessage({ id: 'bpor.create.step2.can_withdraw' })}: <=${availableQuantity}`}
        </SubTitle2>
      </ColumContainer>
    </Container>
  );
};

export default WarehouseItem;

const Control = ({ onChangeValue, value, isDisable, isError }: any) => {
  const valueTemp = parseInt(value, 10);
  return (
    <ControlContainer isDisable={isDisable} isError={isError}>
      <IconContainer top onClick={() => onChangeValue(valueTemp + 1)}>
        <UpOutlined style={{ fontSize: 8 }} />
      </IconContainer>
      <IconContainer onClick={() => onChangeValue(valueTemp === 0 ? 0 : valueTemp - 1, true)}>
        <DownOutlined style={{ fontSize: 8 }} />
      </IconContainer>
    </ControlContainer>
  );
};

const Weight = ({ value = 0 }: any) => {
  return (
    <WeightContainer>
      <SubTitle2>({value} kg)</SubTitle2>
    </WeightContainer>
  );
};
