import SizedBox from '@/components/SizedBox';
import React from 'react';
import styled from 'styled-components';
import BreadcrumbFBT from '../../components/Breadcrumb';
import TitleField from '../../components/TitleField';
import SellerSelect from '@/components/SellerSelect';
import { useHeader } from './hook';


const Container = styled.div`
  padding: 16px 24px;
`;

const Header: React.FC = () => {

  const {onOpenCreateModal, onSelectSeller,sellerId} = useHeader()
  return (
    <Container>
      <BreadcrumbFBT />
      <SizedBox height="6px" />
      <TitleField onOpenCreateModal={onOpenCreateModal}/>
      <SizedBox height="16px" />
      <SellerSelect style={{width: 256 }} onSelect={onSelectSeller} sellerId={sellerId}/>
    </Container>
  );
};

export default Header;
