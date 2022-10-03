import CreateContext from '@/pages/Withdrawal/contexts/CreateContext';
import { Modal, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useCreateHook } from './createHook';
import FinishModal from './FinishModal';
import Footer from './Footer';
import StepsMobile from './Steps/mobile';
import StepScreenMobile from './StepScreen/mobile';
import Title from './Title';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateModalMobile: React.FC = () => {
  return (
    <CreateContext>
      <Content />
    </CreateContext>
  );
};

const Content: React.FC = () => {
  const { isVisible, onCloseCreateModal, isLoading, setCurrentStep, currentStep } = useCreateHook();
  return (
    <>
      <Modal
        title={<Title />}
        visible={isVisible}
        footer={<Footer />}
        onCancel={onCloseCreateModal}
        width="100%"
        bodyStyle={{
          backgroundColor: '#F5F5F5',
          padding: 0,
          margin: 0,
          height: 'calc(100vh - 125px)',
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
            <StepsMobile current={currentStep} onChangeStep={setCurrentStep} />
            <StepScreenMobile current={currentStep} />
          </Container>
        <FinishModal/>
          {/* <FinishModal spinning={data?.isLoading} /> */}
        </Spin>
      </Modal>
    </>
  );
};

export default CreateModalMobile;
