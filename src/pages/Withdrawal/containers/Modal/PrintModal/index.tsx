import React from 'react'
import { Modal } from 'antd';
import Footer from './Footer';
import Content from './Content';
import { usePrintModal } from './printModal';
import Title from './Title';

const PrintModal = () => {

  const {         
    isVisible,
    name,
    onClosePrintModal,
    onPrint,
    isPrinting,
    printCpnRef
  } = usePrintModal();


  return (
    <Modal
      title={<Title/>}
      visible={isVisible}
      onCancel={onClosePrintModal}
      footer={<Footer isLoading={isPrinting} onClose={onClosePrintModal} onPrint={onPrint}/>}
      width='1242px'
      bodyStyle={{
        padding: 0,
        margin: 0,
        height: 'calc(100vh - 125px)',
        overflowY: 'scroll',
      }}
      style={{
        top: 0,
        height: '100vh',

      }}
    >
        <Content name={name} printCpnRef={printCpnRef}/>
    </Modal>

  )
}

export default PrintModal
