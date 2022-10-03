import { Button } from 'antd';
import { DownloadOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { HeadTitle2 } from '@/components/Text';
import SizedBox from '@/components/SizedBox';
import { formatMessage } from '@/utils/locale';
import { useActionHook } from '@/pages/Withdrawal/hook/actionHook';

const HeaderContainer = styled.div`
  min-height: 70px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 24px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  align-items: center;
  flex-direction: row;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
interface Props {
  [key: string]: any;
}

const Header: React.FC<Props> = ({ status = {}, onOpenImportProductModal, id, onExport }) => {
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
      <TitleContainer>
        <HeadTitle2 style={{ display: 'block' }}>
          {formatMessage({ id: 'bpor.detail.title' })}
        </HeadTitle2>
      </TitleContainer>

      <ButtonContainer>
        {(isDraft || isWaitingConfirm || isWaitingPreparing || isReadyToReturn || isCancel || isSuccess || isLiquidated) && (
          <>
            <Button onClick={onExport}>
              <DownloadOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'common.export_list_product' })}
            </Button>
            <SizedBox width="12px" />
          </>
        )}

        {isReadyToReturn && (
          <>
            <Button type="primary"  onClick={onOpenPrintBPOR}>
              <PrinterOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'bpor.print_bpor' })}
            </Button>
            <SizedBox width="12px" />
          </>
        )}

        {/* {isReadyToReturn && (
          <>
            <Button type="primary">
              <PrinterOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'bpor.print_authorization' })}
            </Button>
            <SizedBox width="12px" />
          </>
        )} */}

        {isDraft && (
          <>
            <Button onClick={onOpenImportProductModal} type="primary">
              <PlusOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'bpor.choose_product' })}
            </Button>
            <SizedBox width="12px" />
          </>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
