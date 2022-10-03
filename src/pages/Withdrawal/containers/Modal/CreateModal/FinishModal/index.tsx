import { Modal, Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Title from './Title'
import { useFinishModal } from './finishModalHook'
import Footer from './Footer'
import Body from './Body'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {}

const FinishModal: React.FC<Props> = () => {
    const {isShowModalFinish, data, total,totalError, onSaveAndClose, isDraft, onClose, isLoading} = useFinishModal()
  return (
    <Modal
    title={<Title total={total} totalError={totalError}/>}
    visible={isShowModalFinish}
    footer={<Footer action={onSaveAndClose} />}
    onCancel={onClose}
    width={670}
    bodyStyle={{
      backgroundColor: 'white',

    }}
    style={{
      minHeight: 700,

    }}
  >
    <Spin spinning={isLoading}>
      <Container>
        <Body
          data={data}
          isDraft={isDraft}
        />
      </Container>
    </Spin>

  </Modal>
  )
}

export default FinishModal