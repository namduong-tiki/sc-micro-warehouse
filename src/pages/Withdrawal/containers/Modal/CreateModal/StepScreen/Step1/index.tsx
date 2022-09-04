import SizedBox from '@/components/SizedBox';
import React from 'react';
import Guideline from './Guideline/index';
import MainContent from './MainContent/index';
import { useStep1 } from './step1Hook';

const Step1 = () => {
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
      <Guideline />
      <SizedBox height="16px" />
      <MainContent
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

export default Step1;
