import SizedBox from '@/components/SizedBox';
import React from 'react';
import styled from 'styled-components';
import BreadcrumbFBT from '../../components/Breadcrumb';
import { useHeader } from './hook';
import TitleFieldMobile from '../../components/TitleField/mobile';


const Container = styled.div`
  padding: 16px 24px;
`;

const HeaderMobile: React.FC = () => {

  const {onOpenCreateModal, onSelectSeller,sellerId} = useHeader()
  return (
    <Container>
      <BreadcrumbFBT />
      <SizedBox height="6px" />
      <TitleFieldMobile onOpenCreateModal={onOpenCreateModal} onSelectSeller={onSelectSeller} sellerId={sellerId}/>
    </Container>
  );
};

export default HeaderMobile;
