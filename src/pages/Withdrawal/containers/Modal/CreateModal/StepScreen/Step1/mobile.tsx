import SizedBox from '@/components/SizedBox';
import React from 'react';
import Guideline from './Guideline/index';
import MainContentMobile from './MainContent/mobile';
import { useStep1 } from './step1Hook';

const Step1Mobile = () => {
  const {
    data,
    onChangeListSelected,
    query,
    onChangeQuery,
    selectedId,
    isShowCate,
    isVisibleImport,
    onOpenImportModal,
    onCloseImportModal,
    onImportCB,
  } = useStep1();
  return (
    <>
    <div style={{padding:'0 12px'}}>
    <Guideline />

    </div>
      <SizedBox height="16px" />
      <MainContentMobile
        onOpenImportModal={onOpenImportModal}
        isShowCate={isShowCate}
        sellerId={selectedId}
        data={data}
        onChangeListSelected={onChangeListSelected}
        query={query}
        limit={query?.limit}
        onChangeQuery={onChangeQuery}
        isVisibleImport={isVisibleImport}
        onCloseImportModal={onCloseImportModal}
        onImportCB={onImportCB}
      />
      <SizedBox height="16px" />
    </>
  );
};

export default Step1Mobile;
