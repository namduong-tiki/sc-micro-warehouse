import React from 'react';
import { Spin, Modal } from 'antd';
import styled from 'styled-components';
import Title from './Title';
// import Footer from './Footer';
import { useChooseProduct } from './chooseProductHook';
import MainContent from '../CreateModal/StepScreen/Step1/MainContent';
import Footer from './Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
`;

const ChooseProductModal = ({
  isVisible,
  sellerId,
  cb,
  onClose,
  items = [],
}: any) => {
  const {
    data,
    onChangeListSelected,
    query,
    onChangeQuery,
    selectedId,
    isShowCate,
    isVisibleImport,
    onOpenImportModal,
    onCloseImportModal,
    onImportCB,
    isLoading,
    isCanSave,
    errorText,
    onSave,
  } = useChooseProduct({ sellerId, items, onClose, cb });

  return (
    <Modal
      title={<Title />}
      visible={isVisible}
      footer={<Footer
        isCanSave={isCanSave}
        errorText={errorText}
        onClose={onClose}
        onSave={onSave}
      />}
      onCancel={onClose}
      width="90%"
      bodyStyle={{
        backgroundColor: '#F5F5F5',
        padding: 0,
        overflowY: 'scroll',
        height: 'calc(100vh - 150px)',
        maxHeight: '95vh',
      }}
      style={{
        maxHeight: '95vh',
        top: 20,
        minWidth: '1158px',
      }}
    >
      <Spin tip="Loading..." spinning={isLoading}>
      <Container>
        <MainContent
          onOpenImportModal={onOpenImportModal}
          isShowCate={isShowCate}
          sellerId={selectedId}
          data={data}
          onChangeListSelected={onChangeListSelected}
          query={query}
          limit={query?.limit}
          onChangeQuery={onChangeQuery}
          isVisibleImport={isVisibleImport}
          onCloseImportModal={onCloseImportModal}
          onImportCB={onImportCB}
        />
      </Container>
      </Spin>
    </Modal>
  );
};

export default ChooseProductModal;
