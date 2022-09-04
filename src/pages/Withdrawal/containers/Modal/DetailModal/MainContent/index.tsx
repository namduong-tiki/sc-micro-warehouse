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
const Col = styled.div<PropsStyled>`
  flex: ${(props) => props.flex};
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
}) => {
  return (
    <Row>
      <Col flex={1}>
        <LeftColum
          onSaveInput={onSaveInput}
          record={record}
          status={status}
          warehouse={warehouse}
        />
      </Col>
      <SizedBox width="24px" />
      <Col flex={3}>
        <RightColum
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
      </Col>
    </Row>
  );
};

export default MainContent;
