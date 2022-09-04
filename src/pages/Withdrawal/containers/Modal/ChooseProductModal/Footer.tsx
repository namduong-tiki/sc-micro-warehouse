import SizedBox from '@/components/SizedBox';
import { Text0 } from '@/components/Text';
import { useFormatMessage } from '@/utils/locale';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const SuperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 50px;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: white;
`;

const Footer = ({ onClose, onSave, isCanSave, errorText }: any) => {
  const formatMessage = useFormatMessage();

  return (
    <SuperContainer>
      {errorText && <Text0 color="red">{errorText}</Text0>}
      <Container>
        <Button onClick={onClose}>{formatMessage({ id: 'Huỷ' })}</Button>
        <SizedBox width="12px" />
        <Button disabled={!isCanSave} onClick={onSave} type="primary">
          {formatMessage({ id: 'Đồng ý' })}
        </Button>
      </Container>
    </SuperContainer>
  );
};

export default Footer;
