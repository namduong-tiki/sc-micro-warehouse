import SizedBox from '@/components/SizedBox';
import { NormalText } from '@/components/Text';
import { formatMessage } from '@/utils/locale';
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
// const Divider = styled.div`
//   width: 1px;
//   margin: 0 16px;
//   background-color: #d9d9d9;
//   height: 25px;
// `;

interface Props {
  status: any;
  onCloseDetailModal: any;
  checkIsCanDraft: any;
  checkIsCanSave: any;
  onSubmit: any;
  isLoading: boolean;
  renderErrorText:any;
  onCancelBPOR: any;
}

const Footer: React.FC<Props> = ({
  status = {},
  onCloseDetailModal,
  checkIsCanDraft,
  checkIsCanSave,
  onSubmit,
  isLoading,
  renderErrorText,
  // onCancelBPOR
}) => {
  const { isDraft } = status;
  if (isDraft) {
    const isCanDraft = checkIsCanDraft();
    const isCanSave = checkIsCanSave();
    const errorText = renderErrorText();

    return (
      <SuperContainer>
        {errorText && (
          <NormalText style={{ color: 'red', display: 'block', marginBottom: 5 }}>
            {errorText}
          </NormalText>
        )}
        <Container>
          {/* <Button 
          disabled={isLoading}
          onClick={onCancelBPOR} danger>{formatMessage({ id: 'Huỷ' })}</Button>
          <Divider /> */}
          <Button
            onClick={() => onSubmit(true)}
            style={{ borderColor: isCanDraft ? '#40a9ff' : '', color: isCanDraft ? '#40a9ff' : '' }}
            disabled={!isCanDraft || isLoading}
          >
            {formatMessage({ id: 'Lưu nháp' })}
          </Button>
          <SizedBox width="16px" />
          <Button
            onClick={() => onSubmit(false)}
            style={{ borderColor: isCanSave ? '#40a9ff' : '', color: isCanSave ? '#40a9ff' : '' }}
            disabled={!isCanSave || isLoading}
          >
            {formatMessage({ id: 'Xác nhận' })}
          </Button>
        </Container>
      </SuperContainer>
    );
  }
  return (
    <SuperContainer>
      <Container>
        <Button onClick={onCloseDetailModal}>{formatMessage({ id: 'common.close' })}</Button>
      </Container>
    </SuperContainer>
  );
};

export default Footer;
