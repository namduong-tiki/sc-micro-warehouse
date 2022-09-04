import React, { useCallback } from 'react'
import { Spin, Modal } from 'antd';
import Step1 from './Step1'
import { useFormatMessage } from '@/utils/locale';
import SizedBox from '@/components/SizedBox';
import { useImport } from './importHook';
import Steps from './Steps';
import Step2 from './Step2';
import Footer from './Footer';

const ImportModal = ({ isVisible, onClose,onImportCB,sellerId }:any) => {
  const formatMessage = useFormatMessage()
  const {
    currentStep,
    setCurrentStep,
    products,
    fileName,
    isLoading,
    onUploadFile,
    onRemoveFile,
    onBack,
    onNext,
    isCanNext,
    onSave,
    onDownloadSample,
    errorUploadMessage,
    isCanFinish
  } = useImport(onImportCB,sellerId)

  const memoizedStep = useCallback(
    () => {
      switch (currentStep) {
        case 1:
          return <Step1
            onDownloadSample={onDownloadSample}
            fileName={fileName}
            onUploadFile={onUploadFile}
            onRemoveFile={onRemoveFile}
            errorUploadMessage={errorUploadMessage}
          />;
        case 2:
          return <Step2 products={products} />;
        default:
          return '';
      }
    },
    [currentStep, errorUploadMessage, fileName, onDownloadSample, onRemoveFile, onUploadFile, products],
  );

  return (
    <Modal
      title={formatMessage({ id: 'Nhập sản phẩm từ file' })}
      visible={isVisible}
      onCancel={onClose}
      footer={<Footer
        isCanFinish={isCanFinish}
        onSave={onSave}
        onBack={onBack}
        onNext={onNext}
        onCancel={onClose}
        isCanNext={isCanNext}
        currentStep={currentStep}
      />}
      width='842px'
      bodyStyle={{
        overflowY:'scroll',
        maxHeight: 'calc(100vh - 150px)',
      }}
      style={{
        maxHeight: '95vh',
        top: 20,
      }}
    >
      <Spin tip="Loading..." spinning={isLoading}>
        <Steps current={currentStep} onChangeStep={setCurrentStep} />
        {memoizedStep()}
        <SizedBox height='16px' />
      </Spin>

    </Modal>

  )
}

export default ImportModal
