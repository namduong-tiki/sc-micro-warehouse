import { useFormatMessage } from '@/utils/locale';
import { Popover, Button, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import SizedBox from '../SizedBox';
import { Title1 } from '../Text';

const Option = Select.Option

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

interface Props {
  [key: string]: any;
}

const PopupChooseWarehouse: React.FC<Props> = ({
  isMweb,
  children,
  isShowPopup,
  setIsShowPopup,
  onClosePopup,
  value,
  values = [],
  onChangeInput,
}) => {
  const formatMessage = useFormatMessage();
  return (
    <Popover
      visible={isShowPopup}
      title={() => <p>{formatMessage({ id: 'Chọn kho hàng' })}</p>}
      overlayStyle={{ width: 264 }}
      content={
        <Content
          value={value}
          onClosePopup={onClosePopup}
          onChangeInput={onChangeInput}
          values={values}
        />
      }
      onVisibleChange={setIsShowPopup}
      trigger="click"
      placement={isMweb ? 'left' : 'right'}
    >
      {children}
    </Popover>
  );
};

export default PopupChooseWarehouse;


const Content: React.FC<Props> = ({ onClosePopup, value, onChangeInput, values }) => {
  const formatMessage = useFormatMessage();
  const [valueInput, setValueInput] = useState(value);
  const onChange = (input: any) => {
    setValueInput(input);
  };
  const onSave = () => {
    onClosePopup()
    onChangeInput(valueInput);
  };

  return (
    <>

    <Title1 style={{fontSize:'14px'}}>
      {formatMessage({id:'Chọn kho để đến rút hàng'})}
    </Title1>
    <SizedBox height='6px'/>
    <Select value={valueInput} placeholder={formatMessage({id:'Chọn'})} style={{ width: '100%' }} onChange={onChange}>
      {values.map((i:any) => {
        return (
          <Option key={i?.code} value={i?.code}>{formatMessage({id:'bpor.warehouse'})} {i?.code.toUpperCase()}</Option>
        )
      })}
    </Select>
    <SizedBox height='6px'/>

      <SizedBox height="16px" />
      <ButtonContainer>
        <Button onClick={onClosePopup}>{formatMessage({ id: 'Huỷ' })}</Button>
        <SizedBox width="8px" />
        <Button type="primary" onClick={onSave}>
          {formatMessage({ id: 'Gửi' })}
        </Button>
      </ButtonContainer>
    </>
  );
};
