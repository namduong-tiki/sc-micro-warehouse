import React from 'react';
import { FakeLink, Link1, SubTitle1, Text0 } from '@/components/Text';
import { Row, Tag } from 'antd';
import { ShopOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { POP_UP } from '../../../constants/popup';
import { useFormatMessage } from '@/utils/locale';
import PopupReferenceCode from '@/components/PopupReferenceCode';
import dayjs from 'dayjs';
import { useActionHook } from '../../../hook/actionHook';
import { useOpenDetail } from '../mainTabHook';
import { checkIsDraftBPOR } from '@/pages/Withdrawal/constants/status';
import Copy from '@/components/Copy';
import SizedBox from '@/components/SizedBox';
import { useStatus } from '@/pages/Withdrawal/hook/statusHook';

const Code = ({ record, color, status }: any) => {
  const formatMessage = useFormatMessage();
  const { canSelectSeller, onSaveInput } = useOpenDetail();
  const { onOpenDetail: onOpenDetailHook } = useActionHook();
  const onOpenDetail = () => onOpenDetailHook(record?.id);

  const { onShowPopup, onClosePopup, popupName, setPopupName } = useStatus(record);
  const isDraft = checkIsDraftBPOR(record?.status);
  const time = record?.created_at
    ? dayjs.unix(record?.created_at).format('DD/MM/YYYY - HH:mm:ss')
    : '';
  if (isDraft) {
    return (
      <>
        <Link1 style={{ display: 'block' }}>
          <Link1 size="14px" fontWeight="600" onClick={onOpenDetail}>
            BPOR {formatMessage({ id: 'bpor.tabs.title.draft' }).toLocaleLowerCase()} - {time}
          </Link1>
        </Link1>
        {/* reference_code */}
        <SubTitle1 style={{ display: 'block' }}>
          {formatMessage({ id: 'bpor.reference_code' })}:
        </SubTitle1>
        {record?.reference_code ? (
          <SubTitle1 style={{ display: 'block' }}>
            {record?.reference_code}{' '}
            <Link1 onClick={() => onShowPopup(POP_UP.REFERENCE_CODE)}>
              <EditOutlined />
            </Link1>
          </SubTitle1>
        ) : (
          <Link1 size="14px" onClick={() => onShowPopup(POP_UP.REFERENCE_CODE)}>
            <PlusOutlined style={{ marginRight: 5 }} /> {formatMessage({ id: 'bpor.input_code' })}
          </Link1>
        )}
        <PopupReferenceCode
          onClosePopup={onClosePopup}
          isShowPopup={popupName === POP_UP.REFERENCE_CODE}
          setIsShowPopup={setPopupName}
          value={record?.reference_code}
          onChangeInput={(value: any) => onSaveInput({ referenceCode: value }, record?.id)}
        />

        {canSelectSeller && (
          <Row>
            <Tag style={{ marginTop: 5, borderRadius: 10, backgroundColor: '#F0F0F0' }}>
              <ShopOutlined style={{ color: '#8C8C8C' }} />
              <span style={{ color: '#595959', fontWeight: 400 }}>{record?.seller_name}</span>
            </Tag>
          </Row>
        )}
        <SizedBox height="8px" />
        <Row>
          <Tag color={color}>{status}</Tag>
        </Row>
      </>
    );
  }
  return (
    <>
      {record?.code ? (
        <FakeLink size="14px" fontWeight="600" style={{ display: 'block' }}>
          <Link1 onClick={onOpenDetail} style={{ marginRight: 5 }}>
            {record?.code}
          </Link1>
          <Copy text={record?.code} />
        </FakeLink>
      ) : (
        <Link1 onClick={onOpenDetail} style={{ fontStyle: 'italic', display: 'block' }}>
          {formatMessage({ id: 'bpor.code_proccessing' })}
        </Link1>
      )}
      {/* reference_code */}
      {record?.reference_code && (
        <>
          <SubTitle1 style={{ display: 'block' }}>Mã phiếu nhà bán:</SubTitle1>
          <Text0 style={{ display: 'block' }}>
            {record?.reference_code} <Copy text={record?.reference_code} />
          </Text0>
        </>
      )}

      {canSelectSeller && (
        <Row>
          <Tag style={{ marginTop: 5, borderRadius: 10, backgroundColor: '#F0F0F0' }}>
            <ShopOutlined style={{ color: '#8C8C8C' }} />
            <span style={{ color: '#595959', fontWeight: 400 }}>{record?.seller_name}</span>
          </Tag>
        </Row>
      )}
      <SizedBox height="8px" />
      <Row>
        <Tag color={color}>{status}</Tag>
      </Row>
    </>
  );
};

export default Code;
