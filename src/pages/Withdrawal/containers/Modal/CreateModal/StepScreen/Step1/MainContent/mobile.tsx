import SizedBox from '@/components/SizedBox';
import React from 'react';
import styled from 'styled-components';
import ImportModal from '../../../../ImportModal';
import FilterMobile from '../Filter/mobile';
import TableBoxMobile from '../TableBox/mobile';

const Container = styled.div`
  padding: 12px;
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

const MainContentMobile: React.FC<MainContentProps> = ({
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
        <FilterMobile
          query={query}
          onChangeQuery={onChangeQuery}
          isShowCate={isShowCate}
          onOpenImportModal={onOpenImportModal}
        />
        <SizedBox height="18px" />
        <TableBoxMobile
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

export default MainContentMobile;
