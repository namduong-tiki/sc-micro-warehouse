import React from 'react';
import { Col, Spin } from 'antd';
import styled from 'styled-components';
import Header from './containers/Header';
import Tab from './containers/Tab';
import Filter from './containers/Filter';
import QuickFilter from './containers/QuickFilter';
import MainTab from './containers/MainTab';
import AppContextProvider from './contexts/AppContext';
import CreateModal from './containers/Modal/CreateModal';
import DetailModal from './containers/Modal/DetailModal';
import { useEntryApp } from './entryHook';
import PrintModal from './containers/Modal/PrintModal';
import HeaderMobile from './containers/Header/mobile';
import FilterMobile from './containers/Filter/mobile';
import QuickFilterMobile from './containers/QuickFilter/mobile';
import MainTabMobile from './containers/MainTab/mobile';
import DetailModalMobile from './containers/Modal/DetailModal/mobile';
import CreateModalMobile from './containers/Modal/CreateModal/mobile';

const Container = styled(Col)`
  background-color: white;
  min-width: 1000px;
  overflow-x: scroll;
`;
const ContainerMobile = styled(Col)`
  background-color: white;
`;

const MainApp = () => {
  const { isLoading, isVisibleCreateModal, isVisibleDetailModal, isVisiblePrintModal, isMobile } =
    useEntryApp();
  if (isMobile)
    return (
      <Spin spinning={isLoading}>
        <ContainerMobile>
          <HeaderMobile />
          <Tab />
          <FilterMobile />
          <QuickFilterMobile />
          <MainTabMobile />
        </ContainerMobile>
        {isVisibleCreateModal && <CreateModalMobile />}
        {isVisibleDetailModal && <DetailModalMobile />}
        {isVisiblePrintModal && <PrintModal />}
      </Spin>
    );

  return (
    <Spin spinning={isLoading}>
      <Container>
        <Header />
        <Tab />
        <Filter />
        <QuickFilter />
        <MainTab />
      </Container>
      {isVisibleCreateModal && <CreateModal />}
      {isVisibleDetailModal && <DetailModal />}
      {isVisiblePrintModal && <PrintModal />}
    </Spin>
  );
};

const Withdrawal: React.FC = () => {
  return (
    <AppContextProvider data={{}}>
      <MainApp />
    </AppContextProvider>
  );
};

export default Withdrawal;
