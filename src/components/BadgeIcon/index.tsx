import React from 'react'
import styled from 'styled-components';

interface Props {
    [any: string]: any
}

const Container = styled.div<Props>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor};
    height: ${props => `${props.size}px`};
    width: ${props => `${props.size}px`};
    border-radius: ${props => `${(props.size)/2}px`};
`

const BadgeIcon:React.FC<Props> = ({size = 32,src,bgColor = '#E6F7FF',style = {} }) => {
    return (
      <Container size={size + 12} bgColor={bgColor} style={style}>
        <img
          height={size}
          width={size}
          src={src}
          alt=''
        />
      </Container>
    )
}

export default BadgeIcon;
