import { Row, Col, Tag } from 'antd';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { HeadTitle2, SubTitle1 } from '@/components/Text';
import SizedBox from '@/components/SizedBox';
import logoSC from '../../../../logo.png';
import { useFormatMessage } from '@/utils/locale';
import { BPOR_STATUS } from '@/pages/Withdrawal/constants/status';

interface Props {
  record: any;
}

const TitleMobile: React.FC<Props> = ({ record }) => {
  const formatMessage = useFormatMessage();
  const rawStatus = record?.status;
  const data = useMemo(() => {
    const status = get(BPOR_STATUS, [rawStatus, 'value'], rawStatus);
    const color = get(BPOR_STATUS, [rawStatus, 'colorTag'], 'processing');
    const isReadyToReturn = rawStatus === BPOR_STATUS.ready_to_return.key;

    return {
      color,
      status,
      isReadyToReturn,
    };
  }, [rawStatus]);

  const createdAt = dayjs.unix(record?.created_at).format('DD/MM/YYYY - HH:mm:ss');
  const code = record?.code;
  return (
    <Row gutter={6}>
      <Col>
        <img src={logoSC} alt="" style={{ width: 30, height: 30 }} />
      </Col>
      <Col>
        <HeadTitle2 style={{ display: 'block' }}>
          {formatMessage({ id: 'bpor' })} {code && code}
        </HeadTitle2>
        <SizedBox width="12px" />
        <Row>
          <Tag color={data?.color} style={{ display: 'block' }}>
            {`${formatMessage({ id: 'bpor.status' })}: `}
            {data?.status}
          </Tag>
        </Row>

        {data?.isReadyToReturn && (
          <Row>
            <Tag color={'warning'} style={{ display: 'block' }}>
              {formatMessage({ id: 'bpor.pickup_time' })}: {dayjs().format('DD/MM/YYYY - HH:mm:ss')}
            </Tag>
          </Row>
        )}
        <SubTitle1 style={{ display: 'block' }}>
          {formatMessage({ id: 'bpor.created_at' })}: {createdAt}
        </SubTitle1>
      </Col>
    </Row>
  );
};

export default TitleMobile;
