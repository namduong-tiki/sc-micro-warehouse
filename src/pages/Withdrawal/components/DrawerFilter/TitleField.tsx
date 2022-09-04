import React from 'react';
import styled from 'styled-components';
import { formatMessage } from '@/utils/locale';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TitleBox = styled.div`
  flex: 1;
`;
const ActionBox = styled.div`
  cursor: pointer;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #262626;
`;

interface TitleFieldProps {
  title: string | React.ReactNode;
  action: any;
}

const TitleField = ({ title, action }: TitleFieldProps) => {
  return (
    <Container>
      <TitleBox>
        <Title>{title}</Title>
      </TitleBox>
      <ActionBox onClick={action}>
        <a>{formatMessage({ id: 'Xoá' })}</a>
      </ActionBox>
    </Container>
  );
};

export default TitleField;
