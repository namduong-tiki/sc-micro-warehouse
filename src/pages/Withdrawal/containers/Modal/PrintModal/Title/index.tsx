import { Row, Col } from 'antd';
import React from 'react';
import { HeadTitle1 } from '@/components/Text';
import logoSC from '../../../../logo.png';
import { useFormatMessage } from '@/utils/locale';

interface Props {}

const Title: React.FC<Props> = () => {
  const formatMessage = useFormatMessage();

  return (
    <Row gutter={12} align='middle'>
      <Col>
        <img src={logoSC} alt="" style={{ width: 40, height: 40 }} />
      </Col>
      <Col>
        <HeadTitle1>{formatMessage({ id: 'bpor.print_bpor' })}</HeadTitle1>
      </Col>
    </Row>
  );
};

export default Title;
