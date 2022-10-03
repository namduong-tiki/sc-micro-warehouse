import SizedBox from '@/components/SizedBox';
import styled from 'styled-components';
import LeftColum from './LeftColum';
import RightColum from './RightColum';

interface PropsStyled {
  [key: string]: any;
}

const Row = styled.div<PropsStyled>`
  display: flex;
  flex-direction: row;
`;
// const Col = styled.div<PropsStyled>`
//     flex: ${(props) => props.flex};
// `;
const Col1 = styled.div<PropsStyled>`
  flex: 1;
`;
const Col3 = styled.div<PropsStyled>`
  flex: 3;
`;

const MainContent: React.FC<PropsStyled> = ({
  histories,
  record,
  status,
  items,
  isLoadingDraft,
  onChangeValueItem,
  onRemoveItem,
  warehouse,
  onSaveInput,
  onOpenImportProductModal,
  listWarehouseInformation,
  onExport,
}) => {
  return (
    <Row>
      <Col1 flex={1}>
        <LeftColum
          onSaveInput={onSaveInput}
          record={record}
          status={status}
          listWarehouseInformation={listWarehouseInformation}
        />
      </Col1>
      <SizedBox width="24px" />
      <Col3 flex={3}>
        <RightColum
          onExport={onExport}
          onOpenImportProductModal={onOpenImportProductModal}
          onChangeValueItem={onChangeValueItem}
          onRemoveItem={onRemoveItem}
          histories={histories}
          warehouse={warehouse}
          record={record}
          status={status}
          items={items}
          isLoadingDraft={isLoadingDraft}
        />
      </Col3>
    </Row>
  );
};

export default MainContent;
