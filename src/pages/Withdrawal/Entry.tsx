import React  from 'react';
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

const Container = styled(Col)`
  background-color: white;
  min-width: 1000px;
  overflow-x: scroll;
`;


const MainApp = () => {
  const { isLoading, isVisibleCreateModal, isVisibleDetailModal } = useEntryApp();

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
