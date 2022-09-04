import React from 'react';
import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons'
import { useFormatMessage } from '@/utils/locale';
import { Text0 } from '@/components/Text';
import SizedBox from '@/components/SizedBox';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0px 24px 24px 24px;
    justify-content: center;
    align-items: center;
`
interface Props {
  [any : string] : any
}


const Steps:React.FC<Props> = ({ current, onChangeStep  }) => {
  const formatMessage = useFormatMessage()
  const steps = [
    {
        id: 1,
        title: formatMessage({ id: 'Tải dữ liệu' })
    },
    {
        id: 2,
        title: formatMessage({ id: 'Kiểm tra dữ liệu' })
    },
]
    return (
      <Container>
        <Step
          isFinish={steps[0].id === 1 && current === 2}
          step={steps[0]}
          isActive={current === steps[0].id}
          current={current}
          onChangeStep={onChangeStep}
        />
        <Divider isFinish={steps[0].id === 1 && current === 2} />
        <Step
          step={steps[1]}
          current={current}
          isActive={current === steps[1].id}
          onChangeStep={onChangeStep}
        />
      </Container>
    )
}

export default Steps

const Divider = styled.div<Props>`
    width: 209px;
    border: ${props => props.isFinish ? '1px solid #1890FF' : '1px solid #E8E8E8'} ;
    margin: 0px 20px;
`

const StepBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`

const ValueBox = styled.div<Props>`
    height: 32px;
    width: 32px;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.isActive ? '#1890FF' : 'white'};
    border: ${props => !props.isActive && '1px solid #BFBFBF'};
`
const ValueBoxFinish = styled.div`
height: 32px;
width: 32px;
border-radius: 16px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: white;
border: 1px solid #1890FF;
`

const Text = styled(Text0)`
    font-size: 16px;
    font-weight: ${props => props.isActive ? '600' : '500'};
    color: ${props => props.isActive ? 'white' : '#BFBFBF'};
`

const Title = styled(Text0)`
font-size: 16px;
font-weight: ${props => props.isActive ? '600' : '500'};
color: ${props => props.isActive ? '#595959' : '#8C8C8C'};
`




const Step:React.FC<Props> = ({ step = {}, isActive, onChangeStep, isFinish,current }) => {
    return (
      <StepBox onClick={() => step?.id <=  current && onChangeStep(step.id)}>
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
    )
}
