import { useFormatMessage } from '@/utils/locale';
import { Input, Popover, Button, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from '../DatePicker';
import SizedBox from '../SizedBox';
import { Text1, Title1 } from '../Text';

const Option = Select.Option

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

interface Props {
  [key: string]: any;
}

const PopupChooseDay: React.FC<Props> = ({
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
      title={() => <p>{formatMessage({ id: 'Hẹn ngày rút hàng' })}</p>}
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

export default PopupChooseDay;

const GuidlelineBox = styled.div`
  background-color:#E6F7FF;
  border-radius:2px ;
  padding: 5px 12px;
  margin-bottom: 12px ;
`


const Content: React.FC<Props> = ({ onClosePopup, value, onChangeInput }) => {
  const formatMessage = useFormatMessage();
  const [valueInput, setValueInput] = useState(value);
  const onChange = (input: any) => {
    const valueRaw = input?.target?.value || '';
    const valueFinal = valueRaw.replaceAll(' ', '');
    setValueInput(valueFinal);
  };
  const onSave = () => {
    onChangeInput(valueInput);
  };

  return (
    <>
    <GuidlelineBox>
      <Text1>
        {formatMessage({id:'Nhập thời gian rút hàng dự kiến để kho Tiki hỗ trợ bạn tốt hơn.'})}
      </Text1>
    </GuidlelineBox>


    <Title1 style={{fontSize:'14px'}}>
      {formatMessage({id:'Ngày đề xuất rút hàng'})}
    </Title1>
    <SizedBox height='6px'/>
    <DatePicker style={{width: '100%' }} placeholder={formatMessage({id:'Chọn ngày rút hàng'})}/>

    <SizedBox height='6px'/>

    <Title1 style={{fontSize:'14px'}}>
      {formatMessage({id:'Giờ đề xuất'})}
    </Title1>
    <SizedBox height='6px'/>
    <Select placeholder={formatMessage({id:'Chọn buổi'})} style={{ width: '100%' }} onChange={onChangeInput}>
      <Option value="am">{formatMessage({id:'Buổi sáng'})}</Option>
      <Option value="am">{formatMessage({id:'Buổi chiều'})}</Option>
    </Select>
    <SizedBox height='6px'/>


    <Title1 style={{fontSize:'14px'}}>
      {formatMessage({id:'Ghi chú'})}
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
