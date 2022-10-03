import { SubTitle1 } from '@/components/Text';
import { useFormatMessage } from '@/utils/locale';
import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import logo from './fininshModal.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubContainer = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  background-color: #e6f7ff;
`;

const Title = styled.span`
  font-size: 14px;
  color: #262626;
  margin-bottom: 12px;
`;

interface Props {
  [any: string]: any;
}

const Body: React.FC<Props> = ({ data = [], isDraft, }) => {
  const formatMessage = useFormatMessage();
  if(data.length === 0){
    return (
      <Container
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          style={{
            height: 186,
            width: 186,
            marginBottom: 10,
          }}
          alt="fininshModal"
          src={logo}
        />
        <SubTitle1>
          Tạo thất bại vui lòng thử lại sau
        </SubTitle1>
      </Container>
    );
  }
  if (!isDraft) {
    return (
      <Container
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          style={{
            height: 186,
            width: 186,
            marginBottom: 10,
          }}
          alt="fininshModal"
          src={logo}
        />
        <SubTitle1>
          Tiki đã nhận được yêu cầu, phiếu rút hàng đang được tạo, sẽ thông báo với Nhà bán sau.
        </SubTitle1>
      </Container>
    );
  }
  return (
    <Container>
      <Title>{formatMessage({ id: 'bpor.finish_modal_title_draft' })}</Title>
      <SubContainer>
        {data.map((item: any, index: any) => (
          <Item key={index} index={index} item={item} />
        ))}
      </SubContainer>
    </Container>
  );
};

export default Body;
