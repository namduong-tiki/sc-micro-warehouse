import React from 'react';
import { Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { formatMessage } from '@/utils/locale';
import styled from 'styled-components';
import SizedBox from '@/components/SizedBox';
import { LINK_CDN_IMAGE } from '@/constants/link';
import { GUIDELINE_LINK } from '@/constants/imageLink';
import SellerSelect from '@/components/SellerSelect';
const { logoQuestion, logoCupid } = LINK_CDN_IMAGE;

const Title = styled.span`
  font-weight: 600;
  font-size: 22px;
  color: #262626;
  line-height: 28px;
`;
const ButtonText = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 22px;
`;
const RowText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: center;
`;


interface Props {
  onOpenCreateModal: any;
  [any: string]: any;
}

const TitleFieldMobile: React.FC<Props> = ({ onOpenCreateModal, onSelectSeller, sellerId }) => {
  return (
    <>
      <Row gutter={[12, 4]}>
        <Col flex={1}>
          <Row align="middle" gutter={[12, 4]}>
            <Col>
              <Title>{formatMessage({ id: 'bpor' })}</Title>
            </Col>
          </Row>
        </Col>
      </Row>
      <SizedBox height="5px" />

      {/* Guidleline  */}
      <Row gutter={[12, 4]}>
        <Col>
          <RowText>
            <img alt="tiki_now" width={12} height={12} src={logoQuestion} />
            <SizedBox width="4px" />
            <a target="_blank" href={GUIDELINE_LINK.HUONG_DAN_NHAP_HANG}>
              {formatMessage({ id: 'bpor.guideline' })}
            </a>
          </RowText>
        </Col>
        <Col>
          <RowText>
            <img alt="tiki_now" width={12} height={12} src={logoCupid} />
            <SizedBox width="4px" />

            <a target="_blank" href={GUIDELINE_LINK.HUONG_DAN_DONG_GOI}>
              {formatMessage({ id: 'bpor.guideline.authority' })}
            </a>
          </RowText>
        </Col>
      </Row>
      <SizedBox height="8px" />
      <SellerSelect style={{ width: '100%' }} onSelect={onSelectSeller} sellerId={sellerId} />
      <SizedBox height="8px" />

      <Row justify="end">
        <Col>
          <Button type="primary">
            <PlusOutlined />
            <ButtonText onClick={onOpenCreateModal}>{formatMessage({ id: 'bpor.new' })}</ButtonText>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TitleFieldMobile;
