import { useFormatMessage } from '@/utils/locale';
import { Input, Popover, Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import SizedBox from '../SizedBox';
import { Title1 } from '../Text';


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

interface Props {
  [key: string]: any;
}

const PopupEditNote: React.FC<Props> = ({
  isMweb,
  children,
  isShowPopup,
  setIsShowPopup,
  onClosePopup,
  value,
  onChangeInput,
}) => {
  const formatMessage = useFormatMessage();
  return (
    <Popover
      visible={isShowPopup}
      title={() => <p>{formatMessage({ id: 'Nhập ghi chú' })}</p>}
      overlayStyle={{ width: 264 }}
      content={
        <Content
          value={value}
          onClosePopup={onClosePopup}
          onChangeInput={onChangeInput}
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

export default PopupEditNote;


const Content: React.FC<Props> = ({ onClosePopup, value, onChangeInput }) => {
  const formatMessage = useFormatMessage();
  const [valueInput, setValueInput] = useState(value);
  const onChange = (input: any) => {
    const valueRaw = input?.target?.value || '';
    const valueFinal = valueRaw.replaceAll(' ', '');
    setValueInput(valueFinal);
  };
  const onSave = () => {
    onClosePopup()
    onChangeInput(valueInput);
  };

  return (
    <>
    <Title1 style={{fontSize:'14px'}}>
      {formatMessage({id:'bpor.note'})}
    </Title1>
    <SizedBox height='6px'/>
      <Input.TextArea
        value={valueInput}
        placeholder={formatMessage({ id: 'Nếu có yêu cầu gì đặc biệt vui lòng cho Tiki biết nhé!' })}
        style={{ width: '100%' }}
        onChange={onChange}
      />
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
