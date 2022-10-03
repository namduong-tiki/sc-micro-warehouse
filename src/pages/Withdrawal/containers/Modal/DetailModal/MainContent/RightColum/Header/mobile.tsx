import { Button, Col, Row } from 'antd';
import { DownloadOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { formatMessage } from '@/utils/locale';
import { useActionHook } from '@/pages/Withdrawal/hook/actionHook';

const HeaderContainer = styled.div`
  min-height: 70px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid #d9d9d9;
  padding: 12px;
  justify-content: flex-end;
`;

const ButtonContainer = styled(Row)`
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;
interface Props {
  [key: string]: any;
}

const HeaderMobile: React.FC<Props> = ({ status = {}, onOpenImportProductModal, id, onExport }) => {
  const {
    isDraft,
    isCancel,
    isLiquidated,
    isReadyToReturn,
    isSuccess,
    isWaitingConfirm,
    isWaitingPreparing,
  } = status;

  const { onOpenPrintBPOR: onOpenPrintBPORHook } = useActionHook();
  const onOpenPrintBPOR = () => onOpenPrintBPORHook(id)
  return (
    <HeaderContainer>

      <ButtonContainer gutter={[10,10]}>
        {(isDraft || isWaitingConfirm || isWaitingPreparing || isReadyToReturn || isCancel || isSuccess || isLiquidated) && (
          <>
            <Button onClick={onExport}>
              <DownloadOutlined  />
            </Button>
          </>
        )}

        {isReadyToReturn && (
          <Col>
            <Button type="primary"  onClick={onOpenPrintBPOR}>
              <PrinterOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'bpor.print_bpor' })}
            </Button>
          </Col>
        )}

        {/* {isReadyToReturn && (
          <Col>
            <Button type="primary">
              <PrinterOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'bpor.print_authorization' })}
            </Button>
          </Col>
        )} */}

        {isDraft && (
          <Col>
            <Button onClick={onOpenImportProductModal} type="primary">
              <PlusOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'bpor.choose_product' })}
            </Button>
          </Col>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default HeaderMobile;
