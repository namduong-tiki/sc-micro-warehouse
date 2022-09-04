import SizedBox from '@/components/SizedBox';
import { useFormatMessage } from '@/utils/locale';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Footer = ({ onBack, onNext, onSave, isCanFinish, isCanNext, onCancel, currentStep }: any) => {
  const formatMessage = useFormatMessage();
  return (
    <Container>
      <Button onClick={onCancel}>{formatMessage({ id: 'Huỷ bỏ' })}</Button>
      {currentStep === 2 && (
        <>
          <SizedBox width="8px" />
          <Button onClick={onBack}>{formatMessage({ id: 'Quay lại ' })}</Button>
        </>
      )}
      <SizedBox width="8px" />
      {currentStep === 1 ? (
        <Button onClick={onNext} type="primary" disabled={!isCanNext}>
          {formatMessage({ id: 'Tiếp tục' })}
        </Button>
      ) : (
        <Button disabled={!isCanFinish} onClick={onSave} type="primary">
          {formatMessage({ id: 'Xác nhận' })}
        </Button>
      )}
    </Container>
  );
};

export default Footer;
