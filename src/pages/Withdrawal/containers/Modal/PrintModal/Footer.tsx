import { useFormatMessage } from '@/utils/locale';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Footer = ({ onClose,isLoading, onPrint }: any) => {
  const formatMessage = useFormatMessage();
  return (
    <Container>
      <Button onClick={onClose}>{formatMessage({ id: 'bpor.cancel' })}</Button>
     
        <Button loading={isLoading} onClick={onPrint}  type="primary">
          {formatMessage({ id: 'common.print' })}
        </Button>
    </Container>
  );
};

export default Footer;
