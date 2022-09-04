import SizedBox from '@/components/SizedBox';
import React from 'react';
import styled from 'styled-components';
import ImportModal from '../../../../ImportModal';
import Filter from '../Filter/index';
import TableBox from '../TableBox';

const Container = styled.div`
  padding: 24px;
  background-color: white;
  overflow-y: scroll;
`;

interface MainContentProps {
  data?: any;
  onChangeListSelected?: any;
  query?: any;
  onChangeQuery?: any;
  setIsVisibleImport?: any;
  onImportCB?: any;
  sellerId?: any;
  isShowCate?: any;
  limit?: any;
  onOpenImportModal?: any;
  isVisibleImport?: any;
  onCloseImportModal: any;
}

const MainContent: React.FC<MainContentProps> = ({
  data,
  onChangeListSelected,
  query,
  onChangeQuery,
  onOpenImportModal,
  isShowCate,
  limit,
  isVisibleImport,
  sellerId,
  onImportCB,
  onCloseImportModal,
}) => {
  return (
    <>
      <Container>
        <Filter
          query={query}
          onChangeQuery={onChangeQuery}
          isShowCate={isShowCate}
          onOpenImportModal={onOpenImportModal}
        />
        <SizedBox height="18px" />
        <TableBox
          data={data}
          onChangeListSelected={onChangeListSelected}
          onChangeQuery={onChangeQuery}
          limit={limit}
        />
      </Container>

      {isVisibleImport && (
        <ImportModal
          sellerId={sellerId}
          isVisible={isVisibleImport}
          onClose={onCloseImportModal}
          onImportCB={onImportCB}
        />
      )}
    </>
  );
};

export default MainContent;
