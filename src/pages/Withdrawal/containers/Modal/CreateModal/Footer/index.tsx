import SizedBox from '@/components/SizedBox';
import { Text0 } from '@/components/Text';
import { formatMessage } from '@/utils/locale';
import { Button } from 'antd';
import React from 'react'
import styled from 'styled-components';
import { useCreateFooter } from './createFooterHook';



const SuperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 50px;
  justify-content: center;
  margin-right: 24px;
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: white;
`

const Divider = styled.div`
  width: 1px;
  margin: 0 16px;
  background-color: #D9D9D9;
  height: 32px;

`

const Footer = () => {
    const {
      checkIsCanNext,
      onNext,
      checkErrorText,
      onCloseModal,
      currentStep,
      isLoading,
      checkIsCanBack,
      onBack,
      onDraft,
      isShowDraft,
    } = useCreateFooter()
    const isCanNext = checkIsCanNext()
    const isCanBack = checkIsCanBack()
    const errorText =  checkErrorText(isCanNext)
    
    return(
      <SuperContainer>
        {errorText &&
         
        <Text0 color='red'>
          {errorText}
        </Text0>}
        <Container>

          {currentStep !== 1 &&
          <>
            <Button 
              disabled={!isCanBack || isLoading}
              onClick={onBack}
            >
              {formatMessage({id: 'bpor.back'})}
            </Button>
            <Divider />
          </>}


          <Button onClick={onCloseModal}>
            {formatMessage({id: 'bpor.cancel'})}
          </Button>
  
          <SizedBox width='8px' />

          {isShowDraft &&
          <>
            <Button
              disabled={!isCanNext || isLoading}
              onClick={onDraft}
              style={{borderColor: isCanNext ? '#40a9ff' : '', color: isCanNext ? '#40a9ff': ''}}
            >       
              {formatMessage({id: 'Lưu nháp'})}
            </Button>
  
            <SizedBox width='8px' />
          </>
          }
          <Button
            onClick={onNext} 
            disabled={!isCanNext || isLoading}
            type='primary'
            loading={isLoading}
          > 
            {formatMessage({id: currentStep === 3 ? 'Hoàn tất' :'bpor.continue'})}
          </Button>
        </Container>
      </SuperContainer>
    )
}

export default Footer;
