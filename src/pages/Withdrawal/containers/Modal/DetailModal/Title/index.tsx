import { Row, Col, Tag } from 'antd';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { HeadTitle1, SubTitle1 } from '@/components/Text';
import SizedBox from '@/components/SizedBox';
import logoSC from '../../../../logo.png';
import { useFormatMessage } from '@/utils/locale';
import { BPOR_STATUS } from '@/pages/Withdrawal/constants/status';

interface Props {
  record: any;
}

const Title: React.FC<Props> = ({ record }) => {
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
    <Row gutter={12}>
      <Col>
        <img src={logoSC} alt="" style={{ width: 40, height: 40 }} />
      </Col>
      <Col>
        <Row>
          <HeadTitle1>
            {formatMessage({ id: 'Phiếu rút hàng' })} {code && code}
          </HeadTitle1>
          <SizedBox width="12px" />
          <Tag color={data?.color}>
            {`${formatMessage({ id: 'Trạng thái' })}: `}
            {data?.status}
          </Tag>
          {data?.isReadyToReturn && (
            <Tag color={'warning'}>
              {formatMessage({ id: 'Lịch lấy hàng' })}: {dayjs().format('DD/MM/YYYY - HH:mm:ss')}
            </Tag>
          )}
        </Row>
        <SubTitle1>
          {formatMessage({ id: 'bpor.created_at' })}: {createdAt}
        </SubTitle1>
      </Col>
    </Row>
  );
};

export default Title;
