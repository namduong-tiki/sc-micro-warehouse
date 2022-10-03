import React from 'react';
import { formatMessage } from '@/utils/locale';
import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons'
import SizedBox from '@/components/SizedBox';
import { Text0 } from '@/components/Text';



const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 24px 24px 24px 24px;
    /* justify-content: center; */
    align-items: center;
    overflow-x: scroll ;
`

const steps = [
    {
        id: 1,
        title:formatMessage({id:'bpor.choose_product'})
    },
    {
        id: 2,
        title:formatMessage({id:'bpor.filter_expected_number'})
    },
    {
        id: 3,
        title:formatMessage({id:'bpor.confirm_information'})
    },
]

interface StepsProps {
  current: string | number,
  onChangeStep: any
}

const StepsMobile: React.FC<StepsProps> = ({current,onChangeStep}) => {
    return (
      <Container>
        {steps.map((step,index) => 
          <SubContainer key={step.id}>
            {index !== 0 && <Divider isFinish={current > (index)} />}
            <Step
              step={step}
              isFinish={current > (index + 1)} 
              key={step.id} 
              isActive={current === step.id}
              current={current}
              onChangeStep={onChangeStep}
            />
          </SubContainer>
)}
      </Container>
    )
}

export default StepsMobile


const SubContainer = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`

interface DividerProps {
  isFinish: Boolean
}

const Divider = styled.div<DividerProps>`
    width: 100px;
    border: ${props => props.isFinish ? '1px solid #1890FF' : '1px solid #E8E8E8'} ;
    margin: 0px 20px;
`

const StepBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-left: 8px;
`

const ValueBox = styled.div<ActiveProps>`
    height: 32px;
    width: 32px;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props?.isActive ? '#1890FF' : 'white'};
    border: ${props => !props?.isActive && '1px solid #BFBFBF'};
`
const ValueBoxFinish = styled.div`
height: 30px;
width: 30px;
border-radius: 15px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: white;
border: 1px solid #1890FF;
`

interface ActiveProps {
  isActive?: Boolean | null
}

const Text = styled(Text0)<ActiveProps>`
    font-size: 16px;
    font-weight: ${props => props?.isActive ? '600' : '500'};
    color: ${props => props?.isActive ? 'white' : '#BFBFBF'};
`


const Title = styled(Text0)<ActiveProps>`
font-size: 16px;
font-weight: ${props => props.isActive ? '600' : '500'};
color: ${props => props.isActive ? '#595959' : '#8C8C8C'};
`


interface StepProps {
  step?:any,
  isActive?: Boolean | null,
  onChangeStep?: any,
  isFinish?: Boolean,
  current?: any,
}

const Step: React.FC<StepProps> = ({ step = {}, isActive, onChangeStep, isFinish,current}) => {
    return (
      <>

        <StepBox onClick={() => step?.id <= current && onChangeStep(step.id)}>
          {isFinish ?
            <ValueBoxFinish>
              <CheckOutlined style={{ color: '#1890FF' }} />
            </ValueBoxFinish>
                :
            <ValueBox isActive={isActive}>
              <Text isActive={isActive}>
                {step.id}
              </Text>
            </ValueBox>
            }

          <SizedBox width='12px' />
          <Title isActive={isActive || isFinish}>
            {step.title}
          </Title>
        </StepBox>
      </>
    )
}
