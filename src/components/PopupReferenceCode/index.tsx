import { useFormatMessage } from '@/utils/locale';
import { Input, Popover, Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import SizedBox from '../SizedBox';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

interface Props {
  [key: string]: any;
}

const PopupReferenceCode: React.FC<Props> = ({
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
      title={() => <p>{formatMessage({ id: 'Mã tham chiếu nhà bán' })}</p>}
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

export default PopupReferenceCode;

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
      <Input
        value={valueInput}
        placeholder={formatMessage({ id: 'Nhập mã tham chiếu nhà bán' })}
        style={{ width: '100%' }}
        onChange={onChange}
      />
      <SizedBox height="16px" />
      <ButtonContainer>
        <Button onClick={onClosePopup}>{formatMessage({ id: 'Huỷ bỏ' })}</Button>
        <SizedBox width="8px" />
        <Button type="primary" onClick={onSave}>
          {formatMessage({ id: 'Lưu' })}
        </Button>
      </ButtonContainer>
    </>
  );
};
