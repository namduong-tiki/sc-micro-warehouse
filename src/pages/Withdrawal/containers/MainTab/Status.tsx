import { Tag } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useFormatMessage } from '@/utils/locale';
import { Text1 } from '@/components/Text';
import SizedBox from '@/components/SizedBox';
import { useStatus } from '../../hook/statusHook';
// import PopupChooseDay from '@/components/PopupChooseDay';
// import { POP_UP } from '../../constants/popup';

interface Props {
  record: any;
}

const Status: React.FC<Props> = ({ record }) => {
  const {
    color,
    status,
    // isWaitingConfirm,
    // isWaitingPreparing,
    isSuccess,
    isLiquidated,
    isCancel,
    isReadyToReturn,
    // popupName,
    // setPopupName,
    // onClosePopup,
    // onShowPopup,
  } = useStatus(record);
  const formatMessage = useFormatMessage();
  const slaPickupDate = record?.sla_pickup ? dayjs(record?.sla_pickup).format('DD/MM') : '';
  
  const slaPickupRemainDays = record?.sla_pickup_remain_days;
  return (
    <>
      <Tag color={color}>{status}</Tag>
      {/* {(isWaitingConfirm || isWaitingPreparing) && ( */}
      <>
        <SizedBox height="6px" />
        <Text1 style={{ display: 'block', alignItems: 'center' }}>
          - {formatMessage({ id: 'common.created_at' })}:{' '}
          {record?.created_at && dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss')}
        </Text1>
      </>
      {/* )} */}
      {isReadyToReturn && (
        <>
          <SizedBox height="6px" />
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
          ) : (
            <>
              <Text1 style={{ display: 'block', alignItems: 'center' }}>
                - {formatMessage({ id: 'bpor.will_liquidated' })}:{` ${slaPickupDate}`}{' '}
                {!!slaPickupRemainDays && (
                  <Tag color={'error'}>
                    <ClockCircleOutlined />{' '}
                    {formatMessage({ id: 'bpor.remain_10' }, { date: slaPickupRemainDays })}
                  </Tag>
                )}
              </Text1>
            </>
          )}

          {/* <Text1 style={{ display: 'block', alignItems: 'center' }}>
            <a onClick={() => onShowPopup(POP_UP.LIMIT_DAY)}>{formatMessage({ id: 'bpor.choose_pickup_date' })}</a>
          </Text1> */}
          {/* <SubTitle2 style={{ display: 'block', alignItems: 'center' }}>
            {formatMessage({ id: 'Đã gửi xác nhận thời gian' })}
          </SubTitle2> */}

          {/* <PopupChooseDay
            onClosePopup={onClosePopup}
            isShowPopup={popupName === POP_UP.LIMIT_DAY}
            setIsShowPopup={setPopupName}
            value={record?.reference_code}
            onChangeInput={() => () => {}}
          /> */}
        </>
      )}

      {isSuccess && (
        <>
          <SizedBox height="6px" />
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'common.finished_at' })}:{' '}
            {record?.updated_at && dayjs.unix(record.updated_at).format('DD/MM/YYYY - HH:mm:ss')}
          </Text1>
        </>
      )}
      {isCancel && (
        <>
          <SizedBox height="6px" />
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'common.cancelled_at' })}:{' '}
            {record?.updated_at && dayjs.unix(record.updated_at).format('DD/MM/YYYY - HH:mm:ss')}
          </Text1>
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'common.reason' })}:{record?.canceled_reason_text}
          </Text1>
        </>
      )}
      {isLiquidated && (
        <>
          <SizedBox height="6px" />
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'common.liquidated_at' })}:{' '}
            {record?.updated_at && dayjs.unix(record.updated_at).format('DD/MM/YYYY - HH:mm:ss')}
          </Text1>
          <Text1 style={{ display: 'block', alignItems: 'center', color: '#FA8C16' }}>
            - {formatMessage({ id: 'bpor.number_liquidated' })}: {record?.liquidated_quantity}
          </Text1>
        </>
      )}
    </>
  );
};

export default Status;
