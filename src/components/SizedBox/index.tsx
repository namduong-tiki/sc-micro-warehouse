import styled from 'styled-components'

interface Props {
    color?: string;
    width?: string;
    height?: string;
}
  
const SizedBox = styled.div<Props>`
    background-color: ${props => props.color} ;
    height:  ${props => props.height} ;
    width:  ${props => props.width} ;
`

export default SizedBox
