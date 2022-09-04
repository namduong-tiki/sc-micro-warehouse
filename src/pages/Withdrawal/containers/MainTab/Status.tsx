import { Tag } from 'antd';
import React, { useMemo, useState } from 'react';
import get from 'lodash/get';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useFormatMessage } from '@/utils/locale';
import { BPOR_STATUS } from '../../constants/status';
import { Text1 } from '@/components/Text';
import SizedBox from '@/components/SizedBox';
import PopupChooseDay from '@/components/PopupChooseDay';
import { POP_UP } from '../../constants/popup';

interface Props {
  record: any;
}

export const useStatus = (record: any) => {
  const [popupName, setPopupName] = useState<string>();

  const rawStatus = record?.status;
  const createdAt = record?.created_at;

  const data = useMemo(() => {
    const status = get(BPOR_STATUS, [rawStatus, 'value'], rawStatus);
    const color = get(BPOR_STATUS, [rawStatus, 'colorTag'], 'processing');
    const isDraft = rawStatus === BPOR_STATUS.draft.key;
    const isWaitingConfirm = rawStatus === BPOR_STATUS.waiting_for_tnsl_confirmation.key;
    const isWaitingPreparing = rawStatus === BPOR_STATUS.tnsl_preparing_stock.key;
    const isReadyToReturn = rawStatus === BPOR_STATUS.ready_to_return.key;
    const isSuccess = rawStatus === BPOR_STATUS.return_successfully.key;
    const isLiquidated = rawStatus === BPOR_STATUS.liquidated.key;
    const isCancel = rawStatus === BPOR_STATUS.canceled.key || rawStatus === BPOR_STATUS.failed.key;

    const today = dayjs();

    const isShow10day = today.diff(dayjs.unix(createdAt), 'days') < 11;
    return {
      color,
      status,
      isDraft,
      isWaitingConfirm,
      isWaitingPreparing,
      isSuccess,
      isLiquidated,
      isCancel,
      isReadyToReturn,
      isShow10day,
    };
  }, [rawStatus, createdAt]);

  const onClosePopup = () => setPopupName('');
  const onShowPopup = (popupName: string) => setPopupName(popupName);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return {
    ...data,
    popupName,
    setPopupName,
    onClosePopup,
    onShowPopup,
  };
};

const Status: React.FC<Props> = ({ record }) => {
  const {
    color,
    status,
    isWaitingConfirm,
    isWaitingPreparing,
    isSuccess,
    isLiquidated,
    isCancel,
    isReadyToReturn,
    isShow10day,
    popupName,
    setPopupName,
    onClosePopup,
    onShowPopup,
  } = useStatus(record);
  const formatMessage = useFormatMessage();

  return (
    <>
      <Tag color={color}>{status}</Tag>
      {(isWaitingConfirm || isWaitingPreparing) && (
        <>
          <SizedBox height="6px" />
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'Tạo lúc' })}:{' '}
            {record?.created_at && dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss')}
          </Text1>
        </>
      )}
      {isReadyToReturn && (
        <>
          <SizedBox height="6px" />
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'Sẽ thanh lý nếu không nhận hàng trước' })}:{' 10/10 '}
            {isShow10day && (
              <Tag color={'error'}>
                <ClockCircleOutlined /> {formatMessage({ id: 'Còn lại 10 ngày' })}
              </Tag>
            )}
          </Text1>

          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            <a onClick={() => onShowPopup(POP_UP.LIMIT_DAY)}>{formatMessage({ id: 'Hẹn ngày lấy hàng' })}</a>
          </Text1>
          {/* <SubTitle2 style={{ display: 'block', alignItems: 'center' }}>
            {formatMessage({ id: 'Đã gửi xác nhận thời gian' })}
          </SubTitle2> */}

          <PopupChooseDay
            onClosePopup={onClosePopup}
            isShowPopup={popupName === POP_UP.LIMIT_DAY}
            setIsShowPopup={setPopupName}
            value={record?.reference_code}
            onChangeInput={(value: any) => () => {}}
          />
        </>
      )}

      {isSuccess && (
        <>
          <SizedBox height="6px" />
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'Hoàn thành lúc' })}:{' '}
            {record?.finished_at && dayjs.unix(record.finished_at).format('DD/MM/YYYY - HH:mm:ss')}
          </Text1>
        </>
      )}
      {isCancel && (
        <>
          <SizedBox height="6px" />
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'Huỷ lúc' })}:{' '}
            {record?.cancel_at && dayjs.unix(record.cancel_at).format('DD/MM/YYYY - HH:mm:ss')}
          </Text1>
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'Lý do' })}:{' Missing'}
          </Text1>
        </>
      )}
      {isLiquidated && (
        <>
          <SizedBox height="6px" />
          <Text1 style={{ display: 'block', alignItems: 'center' }}>
            - {formatMessage({ id: 'Thanh lý lúc' })}:{' '}
            {record?.created_at && dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss')}
          </Text1>
          <Text1 style={{ display: 'block', alignItems: 'center', color: '#FA8C16' }}>
            - {formatMessage({ id: 'Số lượng thanh lý' })}:{' 0'}
          </Text1>
        </>
      )}
    </>
  );
};

export default Status;
