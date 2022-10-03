import { Text1 } from '@/components/Text';
import { Tag } from 'antd';
import { ClockCircleOutlined, InfoCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useFormatMessage } from '@/utils/locale';

const Alert = ({ type, Content }: any) => {
  const isDefault = type === 'default';
  return (
    <div
      style={{
        backgroundColor: isDefault ? '#F5F5F5' : '#E6F7FF',
        border: isDefault ? '1px solid #D9D9D9' : '1px solid #40A9FF',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 12px',
        alignItems: 'center',
      }}
    >
      <InfoCircleFilled
        style={{
          color: isDefault ? '#BFBFBF' : '#1890FF',
          marginRight: 10,
        }}
      />
      {<Content />}
    </div>
  );
};

function Date({ record, statusHelper = {}, liquidatedQty }: any) {
  const formatMessage = useFormatMessage();

  const { isDraft, isSuccess, isLiquidated, isCancel, isReadyToReturn } = statusHelper;
  if (isDraft) {
    const date =
      record?.created_at && dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss');
    const Content = () => (
      <Text1 style={{ display: 'block', alignItems: 'center' }}>
        {formatMessage({ id: 'common.created_at' })}: {date}
      </Text1>
    );
    return <Alert type="default" Content={Content} />;
  }
  if (isReadyToReturn) {
    const slaPickupDate = record?.sla_pickup ? dayjs(record?.sla_pickup).format('DD/MM') : '';
    const slaPickupRemainDays = record?.sla_pickup_remain_days;
    const Content = () => (
      <>
            {slaPickupRemainDays > 10 ? (
            <>
              <Text1 style={{ display: 'block', alignItems: 'center' }}>
                - {formatMessage({ id: 'bpor.will_fee' })}:{` ${record?.sla_pickup ? dayjs(record?.sla_pickup).subtract(10,'day').format('DD/MM') : ''}`}{' '}
                {!!slaPickupRemainDays && (
                  <Tag color={'error'}>
                    <ClockCircleOutlined />{' '}
                    {formatMessage({ id: 'bpor.remain_10' }, { date: slaPickupRemainDays - 10 })}
                  </Tag>
                )}
              </Text1>
            </>
          ) : 
          (
            <Text1 style={{ display: 'block', alignItems: 'center' }}>
            {formatMessage({ id: 'bpor.will_liquidated' })}:{` ${slaPickupDate}`}{' '}
            {!!slaPickupRemainDays && (
              <Tag color={'error'}>
                <ClockCircleOutlined />{' '}
                {formatMessage({ id: 'bpor.remain_10' }, { date: slaPickupRemainDays })}
              </Tag>
            )}
          </Text1>
          )
          }
      </>

    );
    return <Alert type="processing" Content={Content} />;
  }
  if (isCancel || isSuccess) {
    const date =
      record?.created_at && dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss');
    const successDate =
      record?.updated_at && dayjs.unix(record.updated_at).format('DD/MM/YYYY - HH:mm:ss');

    const Content = () => (
      <Text1 style={{ display: 'block', alignItems: 'center' }}>
        {isCancel
          ? `${formatMessage({ id: 'common.created_at' })}: ${date}`
          : `${formatMessage({ id: 'common.finished_at' })}: ${successDate}`}
      </Text1>
    );
    return <Alert type="default" Content={Content} />;
  }
  if (isLiquidated) {
    const liquidatedDate =
      record?.updated_at && dayjs.unix(record.updated_at).format('DD/MM/YYYY - HH:mm:ss');

    const Content = () => (
      <div>
        <Text1 style={{ display: 'block', alignItems: 'center' }}>
          {formatMessage({ id: 'common.liquidated_at' })}: {liquidatedDate}
        </Text1>
        {!!liquidatedQty && (
          <Text1 style={{ display: 'block', alignItems: 'center', color: '#FA8C16' }}>
            {formatMessage({ id: 'bpor.warehouse.number_liquidated_qty' })}: {liquidatedQty}
          </Text1>
        )}
      </div>
    );
    return <Alert type="processing" Content={Content} />;
  }
  const date = record?.created_at && dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss');
  const Content = () => (
    <Text1 style={{ display: 'block', alignItems: 'center' }}>
      {formatMessage({ id: 'common.created_at' })}: {date}
    </Text1>
  );
  return <Alert type="default" Content={Content} />;
}

export default Date;
