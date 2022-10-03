import React from 'react';
import { HeadTitle1 } from '@/components/Text';
import { useFormatMessage } from '@/utils/locale';
import { Row, Col } from 'antd';

const Title:React.FC = () => {
  const formatMessage = useFormatMessage();
  return (
    <Row
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}
      gutter={12}
    >
      <Col>
        <HeadTitle1 size="20px">{formatMessage({ id: 'bpor.choose_product' })}</HeadTitle1>
      </Col>
    </Row>
  );
};

export default Title;
