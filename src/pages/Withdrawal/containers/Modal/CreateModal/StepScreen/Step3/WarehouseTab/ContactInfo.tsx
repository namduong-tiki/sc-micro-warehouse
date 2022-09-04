import { Text1, Title1 } from '@/components/Text';
import { Card, Radio } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  [key: string]: any;
}

const Container = styled.div<Props>`
  padding: 22px;
  border-radius: 1px;
  border: 1px solid #d9d9d9;
  width: 620px ;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Row = styled.div<Props>`
  display: row ;
`;
const Flex1 = styled.div`flex:1;`

const ContactInfo: React.FC<Props> = ({ customerInformation,warehouseCode,onSelectCustomerInformation }) => {
  useEffect(() => {
    onSelectCustomerInformation(warehouseCode,customerInformation)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <Card title="Thông tin người rút hàng" headStyle={{ backgroundColor: '#E8E8E8' }}>
       <Row>
     <Flex1>
     <Container>
          <Radio checked={true} onChange={() => {}}>
            <Title1 style={{ display: 'block',fontSize:16 }}>Đại diện gian hàng</Title1>
            <span style={{ display: 'block',fontSize:14 }}>
              {' '}
              <Title1 >Họ và tên:</Title1> <Text1>{customerInformation?.business_representative}</Text1>
            </span>
            <span style={{ display: 'block',fontSize:14 }}>
              {' '}
              <Title1>Số điện thoại:</Title1> <Text1>{customerInformation?.contact_phone}</Text1>
            </span>
            <span style={{ display: 'block',fontSize:14 }}>
              {' '}
              <Title1 >Email:</Title1> <Text1>{customerInformation?.contact_email}</Text1>
            </span>
          </Radio>
        </Container>
     </Flex1>
     <Flex1/>
       </Row>
      </Card>
    </>
  );
};

export default ContactInfo;
