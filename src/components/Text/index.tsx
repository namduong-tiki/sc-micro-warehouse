import React from 'react';
import styled from 'styled-components';

interface CpnTHeadTittleProps {
    fontWeight?: any,
    size?: string,
    color?: string,
    style?: any
}

interface HeadTitleProps {
    children? : React.ReactNode,
    size?: string,
    style?: any,
    onClick?: any,
    color?: string
    fontWeight?: any,
    [key: string]: any
    
}

const CpnTHeadTittle1 = styled.span<CpnTHeadTittleProps>`
    font-style: normal;
    font-weight: ${props => props?.fontWeight ? props.fontWeight : '600'}; 
    font-size: ${props => props?.size ? props.size : '20px'};
    color: ${props => props?.color ? props.color : '#262626'};
`



export const HeadTitle1: React.FC<HeadTitleProps> = ({children,style = {},...rest}) => {
    return <CpnTHeadTittle1 style={style} {...rest}>{children}</CpnTHeadTittle1>
}

const CpnTHeadTittle2 = styled.span<CpnTHeadTittleProps>`
    font-style: normal;
    font-weight: ${props => props?.fontWeight ? props.fontWeight : '600'}; 
    font-size: ${props => props?.size ? props.size : '16px'};
    color: ${props => props?.color ? props.color : '#262626'};
`

export const HeadTitle2: React.FC<HeadTitleProps>  = ({children,style = {}, ...rest}) => {
    return <CpnTHeadTittle2 style={style} {...rest}>{children}</CpnTHeadTittle2>
}

const CpnTittle1 = styled.span<CpnTHeadTittleProps>`
    font-style: normal;
    font-weight: ${props => props?.fontWeight ? props.fontWeight : '600'}; 
    font-size: ${props => props?.size ? props.size : '14px'};
    color: ${props => props?.color ? props.color : '#262626'};
`

export const Title1: React.FC<HeadTitleProps>  = ({children,style = {}, ...rest}) => {
    return <CpnTittle1 style={style} {...rest}>{children}</CpnTittle1>
}

const CpnSubTitle1 = styled.span<CpnTHeadTittleProps>`
    font-style: normal;
    font-weight: ${props => props?.fontWeight ? props.fontWeight : '400'}; 
    font-size: ${props => props?.size ? props.size : '14px'};
    color: ${props => props?.color ? props.color : '#8C8C8C'};
`

export const SubTitle1: React.FC<HeadTitleProps>  = ({children,style = {}, ...rest}) => {
    return <CpnSubTitle1 style={style} {...rest}>{children}</CpnSubTitle1>
}

const CpnSubTitle2 = styled.span<CpnTHeadTittleProps>`
    font-style: normal;
    font-weight: ${props => props?.fontWeight ? props.fontWeight : '400'}; 
    font-size: ${props => props?.size ? props.size : '12px'};
    color: ${props => props?.color ? props.color : '#8C8C8C'};
`

export const SubTitle2: React.FC<HeadTitleProps>  = ({children,style = {}, ...rest}) => {
    return <CpnSubTitle2 style={style} {...rest}>{children}</CpnSubTitle2>
}

const CpnText0 = styled.span<CpnTHeadTittleProps>`
    font-style: normal;
    font-weight: ${props => props?.fontWeight ? props.fontWeight : '400'}; 
    font-size: ${props => props?.size ? props.size : '14px'};
    color: ${props => props?.color ? props.color : '#262626'};
`

export const Text0: React.FC<HeadTitleProps> = ({children,style = {}, ...rest}) => {
    return <CpnText0 style={style} {...rest}>{children}</CpnText0>
}

const CpnText1 = styled.span<CpnTHeadTittleProps>`
    font-style: normal;
    font-weight: ${props => props?.fontWeight ? props.fontWeight : '400'}; 
    font-size: ${props => props?.size ? props.size : '12px'};
    color: ${props => props?.color ? props.color : '#595959'};
`

export const Text1: React.FC<HeadTitleProps> = ({children,style = {}, ...rest}) => {
    return <CpnText1 style={style} {...rest}>{children}</CpnText1>
}

const CpnNormalText = styled.span<CpnTHeadTittleProps>`
    font-style: normal;
    font-weight: ${props => props?.fontWeight ? props.fontWeight : '500'}; 
    font-size: ${props => props?.size ? props.size : '14px'};
    color: ${props => props?.color ? props.color : '#595959'};
`

export const NormalText: React.FC<HeadTitleProps>  = ({children,style = {}, ...rest}) => {
    return <CpnNormalText style={style} {...rest}>{children}</CpnNormalText>
}

const CpnLink = styled.span<CpnTHeadTittleProps>`
    color: ${props => props?.color ? props.color : '#1890ff'};
    cursor: pointer;
    font-style: normal;
    font-size: ${props => props?.size ? props.size : '14px'};
`

export const Link1: React.FC<HeadTitleProps>  = ({children,style = {}, ...rest}) => {
    return (
      <CpnLink style={style} {...rest}>
        {children}
      </CpnLink>)
}
const CpnFakeLink = styled.span<CpnTHeadTittleProps>`
    color: ${props => props?.color ? props.color : '#1890ff'};
    font-style: normal;
    font-size: ${props => props?.size ? props.size : '14px'};
`

export const FakeLink: React.FC<HeadTitleProps>  = ({children,style = {}, ...rest}) => {
    return (
      <CpnFakeLink style={style} {...rest}>
        {children}
      </CpnFakeLink>)
}





const CpnLinkURL = styled.a<CpnTHeadTittleProps>`
    font-style: normal;
    font-size: ${props => props?.size ? props.size : '14px'};
`

export const LinkURL: React.FC<HeadTitleProps> = ({children,style = {}, ...rest}) => {
    return (
      <CpnLinkURL style={style} {...rest}>
        {children}
      </CpnLinkURL>)
}
