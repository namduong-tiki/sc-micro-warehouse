import BadgeIcon from '@/components/BadgeIcon';
import SizedBox from '@/components/SizedBox';
import { EyeOutlined, ClockCircleOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { HeadTitle2, Link1, SubTitle1, Text1, Title1 } from '@/components/Text';
import { LINK_CDN_IMAGE } from '@/constants/link';
import { useFormatMessage } from '@/utils/locale';
import dayjs from 'dayjs';
import { Row, Tag } from 'antd';
import React from 'react';
import styled from 'styled-components';
import PopupChooseDay from '@/components/PopupChooseDay';
import PopupChooseWarehouse from '@/components/PopupChooseWarehouse';
import PopupEditNote from '@/components/PopupEditNote';
import PopupReferenceCode from '@/components/PopupReferenceCode';
import { POP_UP } from '@/pages/Withdrawal/constants/popup';

const { iconSeller, iconWarehouse, iconNote, iconCode, iconTime } = LINK_CDN_IMAGE;

const Container = styled.div`
  background-color: white;
  padding: 0;
`;
const HeaderContainer = styled.div`
  min-height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 24px;
`;

const ChooseTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`;

const ContentContainer = styled.div`
  padding: 16px 12px;
`;
const SubContentContainer = styled.div`
  padding: 0 12px;
`;
const TimeContainer = styled.div`
  background-color: #e6f7ff;
  padding: 12px;
`;

interface Props {
  [any: string]: any;
}

const LeftColum: React.FC<Props> = ({ record, status = {}, warehouse = [], onSaveInput }) => {
  const formatMessage = useFormatMessage();
  const {
    isDraft,
    isCancel,
    isLiquidated,
    isReadyToReturn,
    isShow10day,
    isSuccess,
    isWaitingConfirm,
    isWaitingPreparing,
    onClosePopup,
    onShowPopup,
    popupName,
    setPopupName,
  } = status;

  if (isDraft) {
    return (
      <Container>
        <HeaderContainer>
          <HeadTitle2>
            {formatMessage({ id: 'Mã phiếu' })}: {record?.code}
          </HeadTitle2>
        </HeaderContainer>
        <ContentContainer>
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Row
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <IconTitle
                    icon={iconWarehouse}
                    title={formatMessage({ id: 'Kho đến rút hàng' })}
                  />
                  <Link1 size="14px" onClick={() => onShowPopup(POP_UP.WAREHOUSE)}>
                    {formatMessage({ id: 'Thay đổi' })}
                  </Link1>
                </Row>
                <PopupChooseWarehouse
                  values={warehouse}
                  onClosePopup={onClosePopup}
                  isShowPopup={popupName === POP_UP.WAREHOUSE}
                  setIsShowPopup={setPopupName}
                  value={record?.warehouse_code}
                  onChangeInput={(value: any) => onSaveInput({warehouseCode:value})}
                />
              </Row>

              <SizedBox height="8px" />
              <Title1>
                {formatMessage({ id: 'Kho' })}{' '}
                {record?.warehouse_code && record?.warehouse_code.toUpperCase()}
              </Title1>
            </SubContentContainer>
          </>

          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconCode} title={formatMessage({ id: 'Mã phiếu rút nhà bán' })} />
              <SizedBox height="8px" />
              {record?.reference_code ? (
                <SubTitle1 style={{ display: 'block' }}>
                  {record?.reference_code}{' '}
                  <Link1 onClick={() => onShowPopup(POP_UP.REFERENCE_CODE)}>
                    <EditOutlined />
                  </Link1>
                </SubTitle1>
              ) : (
                <Link1 size="14px" onClick={() => onShowPopup(POP_UP.REFERENCE_CODE)}>
                  <PlusOutlined style={{ marginRight: 5 }} />{' '}
                  {formatMessage({ id: 'Thêm mã phiếu' })}
                </Link1>
              )}
              <PopupReferenceCode
                onClosePopup={onClosePopup}
                isShowPopup={popupName === POP_UP.REFERENCE_CODE}
                setIsShowPopup={setPopupName}
                value={record?.reference_code}
                onChangeInput={(value: any) => onSaveInput({referenceCode:value})}
              />{' '}
            </SubContentContainer>
          </>

          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconNote} title={formatMessage({ id: 'Ghi chú' })} />
              <SizedBox height="8px" />
              {record?.note ? (
                <SubTitle1 style={{ display: 'block' }}>
                  {record?.note}{' '}
                  <Link1 onClick={() => onShowPopup(POP_UP.NOTE)}>
                    <EditOutlined />
                  </Link1>
                </SubTitle1>
              ) : (
                <Link1 size="14px" onClick={() => onShowPopup(POP_UP.NOTE)}>
                  <PlusOutlined style={{ marginRight: 5 }} />{' '}
                  {formatMessage({ id: 'Thêm ghi chú' })}
                </Link1>
              )}
              <PopupEditNote
                onClosePopup={onClosePopup}
                isShowPopup={popupName === POP_UP.NOTE}
                setIsShowPopup={setPopupName}
                value={record?.note}
                onChangeInput={(value: any) => onSaveInput({note:value})}
              />
            </SubContentContainer>
          </>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <HeadTitle2>
          {formatMessage({ id: 'Mã phiếu' })}: {record?.code}
        </HeadTitle2>
      </HeaderContainer>
      <ContentContainer>
        {isReadyToReturn && (
          <>
            <TimeContainer>
              <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Row
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}
                >
                  <img alt="" src={iconTime} style={{ width: 25, height: 25 }} />
                  <SizedBox width="5px" />
                  <Text1 size="14px">{formatMessage({ id: 'Thời gian rút hàng' })}</Text1>
                  <ChooseTimeContainer>
                    <SubTitle1>
                      <a onClick={() => onShowPopup(POP_UP.LIMIT_DAY)}>{formatMessage({ id: 'Hẹn ngày lấy hàng' })}</a>
                    </SubTitle1>
                  </ChooseTimeContainer>
                  <PopupChooseDay
                    onClosePopup={onClosePopup}
                    isShowPopup={popupName === POP_UP.LIMIT_DAY}
                    setIsShowPopup={setPopupName}
                    value={record?.reference_code}
                    onChangeInput={(value: any) => {}}
                  />
                </Row>
              </Row>
              <SizedBox height="4px" />
              <Tag style={{ borderRadius: 10, backgroundColor: '#ffffff', borderColor: '#91d5ff' }}>
                <Text1 size="14px" color="#1890ff">
                  {' '}
                  {formatMessage({ id: 'Thời gian thanh lý' })}:{' '}
                  {record?.created_at &&
                    dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss')}{' '}
                </Text1>
              </Tag>
              {isShow10day && (
                <>
                  <SizedBox height="6px" />
                  <Tag color={'error'} style={{ borderRadius: 10 }}>
                    <ClockCircleOutlined /> {formatMessage({ id: 'Còn lại 10 ngày' })}
                  </Tag>
                  <SubTitle1>{formatMessage({ id: 'nữa hàng sẽ bị thanh lý' })}</SubTitle1>
                  <SubTitle1 style={{ display: 'block' }} color="#BFBFBF">
                    ({formatMessage({ id: 'Đã gửi yêu cầu gia hạn' })})
                  </SubTitle1>
                </>
              )}

              <SizedBox height="5px" />
            </TimeContainer>
          </>
        )}

        {isSuccess && (
          <>
            <TimeContainer>
              <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Row
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}
                >
                  <img alt="" src={iconTime} style={{ width: 25, height: 25 }} />
                  <SizedBox width="5px" />
                  <Text1 size="14px">{formatMessage({ id: 'Thời gian rút hàng' })}</Text1>
                </Row>
              </Row>
              <SizedBox height="4px" />
              <Tag style={{ borderRadius: 10, backgroundColor: '#ffffff', borderColor: '#91d5ff' }}>
                <Text1 size="14px" color="#1890ff">
                  {' '}
                  {formatMessage({ id: 'Hoàn thành lúc' })}:{' '}
                  {record?.created_at &&
                    dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss')}{' '}
                </Text1>
              </Tag>
              <SizedBox height="5px" />
            </TimeContainer>
          </>
        )}

        {isCancel && (
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconNote} title={formatMessage({ id: 'Lý do thất bại' })} />
              <SizedBox height="8px" />
              <SubTitle1 style={{ textDecoration: 'underline' }}>
                {formatMessage({ id: 'Lý do' })}
              </SubTitle1>
              : {'record?.reason'}
            </SubContentContainer>
          </>
        )}

        {(!isWaitingConfirm ||
          isWaitingPreparing ||
          isReadyToReturn ||
          isCancel ||
          isLiquidated) && (
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconWarehouse} title={formatMessage({ id: 'Kho đến rút hàng' })} />
              <SizedBox height="8px" />
              <Title1>
                {formatMessage({ id: 'Kho' })}{' '}
                {record?.warehouse_code && record?.warehouse_code.toUpperCase()}
              </Title1>
              <SubTitle1 style={{ display: 'block' }}>
                <SubTitle1 style={{ textDecoration: 'underline' }}>
                  {formatMessage({ id: 'Địa chỉ' })}
                </SubTitle1>
                : {'addressGet'}
              </SubTitle1>
              <SubTitle1 style={{ display: 'block' }}>
                <SubTitle1 style={{ textDecoration: 'underline' }}>
                  {formatMessage({ id: 'Nguòi đại diện' })}
                </SubTitle1>
                : {'contactGet'}
              </SubTitle1>
            </SubContentContainer>
          </>
        )}

        {(!isWaitingConfirm ||
          isWaitingPreparing ||
          isReadyToReturn ||
          isCancel ||
          isLiquidated) && (
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle
                icon={iconSeller}
                title={formatMessage({ id: 'Thông tin người rút hàng' })}
              />
              <SizedBox height="8px" />
              <SubTitle1 style={{ display: 'block' }}>
                <SubTitle1 style={{ textDecoration: 'underline' }}>
                  {formatMessage({ id: 'Người uỷ quyền' })}
                </SubTitle1>
                : {'addressGet'}
              </SubTitle1>
              <SubTitle1 style={{ display: 'block' }}>
                <a>
                  <EyeOutlined /> {formatMessage({ id: 'Xem chi tiết' })}
                </a>
              </SubTitle1>
            </SubContentContainer>
          </>
        )}
        {(!isWaitingConfirm ||
          isWaitingPreparing ||
          isReadyToReturn ||
          isCancel ||
          isLiquidated) && (
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconCode} title={formatMessage({ id: 'Mã tham chiếu' })} />
              <SizedBox height="8px" />
              <SubTitle1 style={{ display: 'block' }}>Ma tham chieu</SubTitle1>
            </SubContentContainer>
          </>
        )}
        {(!isWaitingConfirm ||
          isWaitingPreparing ||
          isReadyToReturn ||
          isCancel ||
          isLiquidated) && (
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconNote} title={formatMessage({ id: 'Ghi chú' })} />
              <SizedBox height="8px" />
              <SubTitle1 style={{ display: 'block' }}>note</SubTitle1>
            </SubContentContainer>
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

export default LeftColum;

const IconTitle = ({ icon, title }: any) => {
  return (
    <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <BadgeIcon src={icon} size={15} />
      <SizedBox width="8px" />
      <Text1 size="14px">{title}</Text1>
    </Row>
  );
};
