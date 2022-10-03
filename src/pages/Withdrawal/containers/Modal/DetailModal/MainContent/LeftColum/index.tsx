import BadgeIcon from '@/components/BadgeIcon';
import SizedBox from '@/components/SizedBox';
import {  ClockCircleOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { HeadTitle2, Link1, SubTitle1, Text1, Title1 } from '@/components/Text';
import { LINK_CDN_IMAGE } from '@/constants/link';
import { useFormatMessage } from '@/utils/locale';
import dayjs from 'dayjs';
import { Row, Tag } from 'antd';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import PopupChooseWarehouse from '@/components/PopupChooseWarehouse';
import PopupEditNote from '@/components/PopupEditNote';
import PopupReferenceCode from '@/components/PopupReferenceCode';
import { POP_UP } from '@/pages/Withdrawal/constants/popup';

const {  iconWarehouse, iconNote, iconCode, iconTime } = LINK_CDN_IMAGE;

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

// const ChooseTimeContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   flex: 1;
// `;

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

const LeftColum: React.FC<Props> = ({
  record,
  status = {},
  onSaveInput,
  listWarehouseInformation = [],
}) => {
  const formatMessage = useFormatMessage();
  const {
    isDraft,
    isCancel,
    // isLiquidated,
    isReadyToReturn,
    isSuccess,
    // isWaitingConfirm,
    // isWaitingPreparing,
    onClosePopup,
    onShowPopup,
    popupName,
    setPopupName,
  } = status;

  const warehouseCode = record?.warehouse_code;
  const pickupWarehouseCode = record?.pickup_warehouse_code;

  const pickupWarehouseInformation = useMemo(() => {
    const item = listWarehouseInformation.find((i: any) => i?.code === pickupWarehouseCode) || {};
    return item;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listWarehouseInformation.length, pickupWarehouseCode]);

  const warehouseInformation = useMemo(() => {
    const item = listWarehouseInformation.find((i: any) => i?.code === warehouseCode) || {};
    return item;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listWarehouseInformation.length, warehouseCode]);

  if (isDraft) {
    return (
      <Container>
        <HeaderContainer>
          <HeadTitle2>{formatMessage({ id: 'common.order_code' })} ({formatMessage({id:'Nháp'})})</HeadTitle2>
        </HeaderContainer>
        <ContentContainer>
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconWarehouse} title={formatMessage({ id: 'bpor.init_warehouse' })} />
              <SizedBox height="8px" />
              <Title1>
                {formatMessage({ id: 'bpor.warehouse' })}{' '}
                {warehouseInformation &&
                  warehouseInformation.code &&
                  warehouseInformation.code.toUpperCase()}
              </Title1>
              <SubTitle1 style={{ display: 'block' }}>
                <SubTitle1 style={{ textDecoration: 'underline' }}>
                  {formatMessage({ id: 'common.address' })}
                </SubTitle1>
                : {warehouseInformation?.address}
              </SubTitle1>
              <SubTitle1 style={{ display: 'block' }}>
                <SubTitle1 style={{ textDecoration: 'underline' }}>
                  {formatMessage({ id: 'common.representative' })}
                </SubTitle1>
                : {warehouseInformation?.contact_withdrawal}
              </SubTitle1>
            </SubContentContainer>
          </>
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
                    title={formatMessage({ id: 'bpor.warehouse_withdrawal' })}
                  />
                  <Link1 size="14px" onClick={() => onShowPopup(POP_UP.PICKUP_WAREHOUSE)}>
                    {formatMessage({ id: 'Thay đổi' })}
                  </Link1>
                </Row>
                <PopupChooseWarehouse
                  values={listWarehouseInformation}
                  onClosePopup={onClosePopup}
                  isShowPopup={popupName === POP_UP.PICKUP_WAREHOUSE}
                  setIsShowPopup={setPopupName}
                  value={pickupWarehouseCode}
                  onChangeInput={(value: any) => onSaveInput({ pickupWarehouseCode: value })}
                />
              </Row>

              <SizedBox height="8px" />
              {pickupWarehouseCode ? (
                <Title1>
                  {formatMessage({ id: 'bpor.warehouse' })}{' '}
                  {pickupWarehouseInformation &&
                    pickupWarehouseInformation.code &&
                    pickupWarehouseInformation.code.toUpperCase()}
                </Title1>
              ) : (
                <span style={{ color: 'red' }}>
                  {formatMessage({ id: 'bpor.warehouse_withdrawal_placeholder' })}
                </span>
              )}
              {pickupWarehouseCode && (
                <>
                  <SubTitle1 style={{ display: 'block' }}>
                    <SubTitle1 style={{ textDecoration: 'underline' }}>
                      {formatMessage({ id: 'common.address' })}
                    </SubTitle1>
                    : {pickupWarehouseInformation?.address}
                  </SubTitle1>
                  <SubTitle1 style={{ display: 'block' }}>
                    <SubTitle1 style={{ textDecoration: 'underline' }}>
                      {formatMessage({ id: 'common.representative' })}
                    </SubTitle1>
                    : {pickupWarehouseInformation?.contact_withdrawal}
                  </SubTitle1>
                </>
              )}
            </SubContentContainer>
          </>

          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconCode} title={formatMessage({ id: 'bpor.reference_code' })} />
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
                  {formatMessage({ id: 'bpor.input_code' })}
                </Link1>
              )}
              <PopupReferenceCode
                onClosePopup={onClosePopup}
                isShowPopup={popupName === POP_UP.REFERENCE_CODE}
                setIsShowPopup={setPopupName}
                value={record?.reference_code}
                onChangeInput={(value: any) => onSaveInput({ referenceCode: value })}
              />{' '}
            </SubContentContainer>
          </>

          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconNote} title={formatMessage({ id: 'bpor.note' })} />
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
                onChangeInput={(value: any) => onSaveInput({ note: value })}
              />
            </SubContentContainer>
          </>
        </ContentContainer>
      </Container>
    );
  }
  const slaPickupDate = record?.sla_pickup ? dayjs(record?.sla_pickup).format('DD/MM/YYYY') : ''
  const slaPickupRemainDays = record?.sla_pickup_remain_days

  return (
    <Container>
      <HeaderContainer>
        <HeadTitle2>
          {formatMessage({ id: 'common.order_code' })}: {record?.code ? record?.code : 'Đang xử lý'}
        </HeadTitle2>
      </HeaderContainer>
      <ContentContainer>
        {isReadyToReturn && (
        <>
          <TimeContainer>
            <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <img alt="" src={iconTime} style={{ width: 25, height: 25 }} />
                <SizedBox width="5px" />
                <Text1 size="14px">{formatMessage({ id: 'bpor.withdraw_time' })}</Text1>
                {/* <ChooseTimeContainer>
                  <SubTitle1>
                    <a onClick={() => onShowPopup(POP_UP.LIMIT_DAY)}>
                      {formatMessage({ id: 'bpor_choose_pickup_date' })}
                    </a>
                  </SubTitle1>
                </ChooseTimeContainer>
                <PopupChooseDay
                  onClosePopup={onClosePopup}
                  isShowPopup={popupName === POP_UP.LIMIT_DAY}
                  setIsShowPopup={setPopupName}
                  value={record?.reference_code}
                  onChangeInput={() => {}}
                /> */}
              </Row>
            </Row>
            <SizedBox height="4px" />
            <Tag style={{ borderRadius: 10, backgroundColor: '#ffffff', borderColor: '#91d5ff' }}>
              <Text1 size="14px" color="#1890ff">
                {' '}
                {formatMessage({ id: 'bpor.liquidated_time' })}:{' '}
                {/* {record?.created_at &&
                    dayjs.unix(record.created_at).format('DD/MM/YYYY - HH:mm:ss')}{' '} */}
                {slaPickupDate}
              </Text1>
            </Tag>
        {!!(slaPickupRemainDays) && ( 
            <>
              <SizedBox height="6px" />
              <Tag color={'error'} style={{ borderRadius: 10 }}>
                {/* <ClockCircleOutlined /> {formatMessage({ id: 'Còn lại missing ngày' })} */}
                <ClockCircleOutlined /> Còn lại {slaPickupRemainDays} ngày
              </Tag>
              <SubTitle1>{formatMessage({ id: 'bpor.sub_text_liquidated' })}</SubTitle1>
              {/* <SubTitle1 style={{ display: 'block' }} color="#BFBFBF">
                ({formatMessage({ id: 'Đã gửi yêu cầu gia hạn' })})
              </SubTitle1> */}
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
                  <Text1 size="14px">{formatMessage({ id: 'bpor.withdraw_time' })}</Text1>
                </Row>
              </Row>
              <SizedBox height="4px" />
              <Tag style={{ borderRadius: 10, backgroundColor: '#ffffff', borderColor: '#91d5ff' }}>
                <Text1 size="14px" color="#1890ff">
                  {' '}
                  {formatMessage({ id: 'common.finished_at' })}:{' '}
                  {record?.updated_at &&
                    dayjs.unix(record.updated_at).format('DD/MM/YYYY - HH:mm:ss')}{' '}
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
                {formatMessage({ id: 'common.reason' })}
              </SubTitle1>
              : {record?.canceled_reason_text}
            </SubContentContainer>
          </>
        )}

        {/* {(!isWaitingConfirm ||
          isWaitingPreparing ||
          isReadyToReturn ||
          isCancel ||
          isLiquidated) && ( */}
        <>
          <SizedBox height="12px" />
          <SubContentContainer>
            <IconTitle icon={iconWarehouse} title={formatMessage({ id: 'bpor.init_warehouse' })} />
            <SizedBox height="8px" />
            <Title1>
              {formatMessage({ id: 'bpor.warehouse' })}{' '}
              {warehouseInformation &&
                warehouseInformation.code &&
                warehouseInformation.code.toUpperCase()}
            </Title1>
            <SubTitle1 style={{ display: 'block' }}>
              <SubTitle1 style={{ textDecoration: 'underline' }}>
                {formatMessage({ id: 'common.address' })}
              </SubTitle1>
              : {warehouseInformation?.address}
            </SubTitle1>
            <SubTitle1 style={{ display: 'block' }}>
              <SubTitle1 style={{ textDecoration: 'underline' }}>
                {formatMessage({ id: 'common.representative' })}
              </SubTitle1>
              : {warehouseInformation?.contact_withdrawal}
            </SubTitle1>
          </SubContentContainer>
        </>
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
                <IconTitle icon={iconWarehouse} title={formatMessage({ id: 'bpor.warehouse_withdrawal' })} />
              </Row>
            </Row>

            <SizedBox height="8px" />
            {pickupWarehouseCode ? (
              <Title1>
                {formatMessage({ id: 'bpor.warehouse' })}{' '}
                {pickupWarehouseInformation &&
                  pickupWarehouseInformation.code &&
                  pickupWarehouseInformation.code.toUpperCase()}
              </Title1>
            ) : (
              <span style={{ color: 'red' }}>
                {formatMessage({ id: 'bpor.warehouse_withdrawal_placeholder' })}
              </span>
            )}
            {pickupWarehouseCode && (
              <>
                <SubTitle1 style={{ display: 'block' }}>
                  <SubTitle1 style={{ textDecoration: 'underline' }}>
                    {formatMessage({ id: 'common.address' })}
                  </SubTitle1>
                  : {pickupWarehouseInformation?.address}
                </SubTitle1>
                <SubTitle1 style={{ display: 'block' }}>
                  <SubTitle1 style={{ textDecoration: 'underline' }}>
                    {formatMessage({ id: 'common.representative' })}
                  </SubTitle1>
                  : {pickupWarehouseInformation?.contact_withdrawal}
                </SubTitle1>
              </>
            )}
          </SubContentContainer>
        </>

        {/* )} */}

        {/* {(!isWaitingConfirm ||
          isWaitingPreparing ||
          isReadyToReturn ||
          isCancel ||
          isLiquidated) && ( */}
        {/* <>
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
              : {'missing'}
            </SubTitle1>
            <SubTitle1 style={{ display: 'block' }}>
              <a>
                <EyeOutlined /> {formatMessage({ id: 'Xem chi tiết' })}
              </a>
            </SubTitle1>
          </SubContentContainer>
        </> */}
        {/* )} */}
        {record?.reference_code && (
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconCode} title={formatMessage({ id: 'bpor.code_seller' })} />
              <SizedBox height="8px" />
              {record?.reference_code && (
                <SubTitle1 style={{ display: 'block' }}>{record?.reference_code} </SubTitle1>
              )}
            </SubContentContainer>
          </>
        )}

        {record?.note && (
          <>
            <SizedBox height="12px" />
            <SubContentContainer>
              <IconTitle icon={iconNote} title={formatMessage({ id: 'bpor.note' })} />
              <SizedBox height="8px" />
              {record?.note && <SubTitle1 style={{ display: 'block' }}>{record?.note} </SubTitle1>}
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
