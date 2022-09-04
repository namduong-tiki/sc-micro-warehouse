import { Button } from 'antd';
import { DownloadOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { HeadTitle2 } from '@/components/Text';
import SizedBox from '@/components/SizedBox';
import { formatMessage } from '@/utils/locale';

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

const Header: React.FC<Props> = ({ status = {}, onOpenImportProductModal }) => {
  const {
    isDraft,
    isCancel,
    isLiquidated,
    isReadyToReturn,
    isSuccess,
    isWaitingConfirm,
    isWaitingPreparing,
  } = status;

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
            <Button>
              <DownloadOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'Xuất danh sách sản phẩm' })}
            </Button>
            <SizedBox width="12px" />
          </>
        )}

        {isReadyToReturn && (
          <>
            <Button type="primary">
              <PrinterOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'In phiếu rút hàng' })}
            </Button>
            <SizedBox width="12px" />
          </>
        )}

        {isReadyToReturn && (
          <>
            <Button type="primary">
              <PrinterOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'In uỷ quyền' })}
            </Button>
            <SizedBox width="12px" />
          </>
        )}

        {isDraft && (
          <>
            <Button onClick={onOpenImportProductModal} type="primary">
              <PlusOutlined style={{ marginRight: 5 }} />
              {formatMessage({ id: 'Chọn sản phẩm' })}
            </Button>
            <SizedBox width="12px" />
          </>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
