
import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components'

interface EllipsisTextProps {
    numberOfLine?: any
}

const EllipsisText = styled.span<EllipsisTextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:  ${props => props.numberOfLine}; /* number of lines to show */
  -webkit-box-orient: vertical;

  &:hover {
    color: var(--info);
  }
`;

interface HoverTextProps {
    children?: React.ReactNode,
    numberOfLine?:number,
    fullText?:string,
    style?:any,
}


const HoverText:React.FC<HoverTextProps> = ({children, numberOfLine = 2,fullText,style={}}) => {
  return (
    <Tooltip placement="topLeft" title={fullText} trigger="hover">
      <EllipsisText style={style} numberOfLine={numberOfLine}>{children}</EllipsisText>
    </Tooltip>

  )
}

export default HoverText;
