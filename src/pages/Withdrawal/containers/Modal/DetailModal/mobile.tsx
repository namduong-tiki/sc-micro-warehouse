import { useStatus } from '@/pages/Withdrawal/hook/statusHook';
import { Modal, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';
import ChooseProductModal from '../ChooseProductModal';
import { useDetailHook } from './detailHook';
import Footer from './Footer';
import GuidelineMobile from './Guideline/mobile';
import MainContentMobile from './MainContent/mobile';
import TitleMobile from './Title/mobile';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
`;

const DetailModalMobile: React.FC = () => {
  const {
    isVisible,
    onCloseDetailModal,
    isLoading,
    histories,
    detail,
    items,
    isLoadingDraft,
    warehouse,
    onChangeValueItem,
    onRemoveItem,
    checkIsCanDraft,
    checkIsCanSave,
    onSubmit,
    onSaveInput,
    renderErrorText,
    isShowImportModal,
    onOpenImportProductModal,
    onCloseImportProductModal,
    onChooseProductCB,
    sellerId,
    listWarehouseInformation,
    onCancelBPOR,
    onExport,
  } = useDetailHook();
  const status = useStatus(detail);
  return (
    <>
      <Modal
        title={<TitleMobile record={detail} />}
        visible={isVisible}
        footer={
          <Footer
            renderErrorText={renderErrorText}
            isLoading={isLoading}
            checkIsCanDraft={checkIsCanDraft}
            checkIsCanSave={checkIsCanSave}
            status={status}
            onCloseDetailModal={onCloseDetailModal}
            onSubmit={onSubmit}
            onCancelBPOR={onCancelBPOR}
          />
        }
        onCancel={onCloseDetailModal}
        width="100%"
        bodyStyle={{
          backgroundColor: '#F5F5F5',
          padding: 0,
          margin: 0,
          height: 'calc(100vh - 225px)',
          overflowY: 'scroll',
        }}
        style={{
          maxWidth: '100vw',
          top: 0,
          height: '100vh',
          padding: 0,
          margin: 0,
        }}
      >
        <Spin tip="Loading..." spinning={isLoading}>
          <Container>
            <GuidelineMobile />
            {/* <SizedBox height="24px" /> */}
            <MainContentMobile
              onOpenImportProductModal={onOpenImportProductModal}
              onSaveInput={onSaveInput}
              onChangeValueItem={onChangeValueItem}
              onRemoveItem={onRemoveItem}
              histories={histories}
              record={detail}
              status={status}
              items={items}
              isLoadingDraft={isLoadingDraft}
              warehouse={warehouse}
              listWarehouseInformation={listWarehouseInformation}
              onExport={onExport}
            />
          </Container>
        </Spin>
        {isShowImportModal && (
          <ChooseProductModal
            items={items}
            sellerId={sellerId}
            cb={onChooseProductCB}
            onClose={onCloseImportProductModal}
            isVisible={isShowImportModal}
          />
        )}
      </Modal>
    </>
  );
};

export default DetailModalMobile;
