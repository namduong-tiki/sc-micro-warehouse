import SizedBox from '@/components/SizedBox';
import { Col } from 'antd';
import styled from 'styled-components';
import LeftColum from './LeftColum';
import RightColumMobile from './RightColum/mobile';

interface PropsStyled {
  [key: string]: any;
}

// const Col = styled.div<PropsStyled>`
//     flex: ${(props) => props.flex};
// `;
const Col1 = styled.div<PropsStyled>`
  flex: 1;
`;
const Col3 = styled.div<PropsStyled>`
  flex: 3;
`;

const MainContentMobile: React.FC<PropsStyled> = ({
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
    <Col>
      <Col1 flex={1}>
        <LeftColum
          onSaveInput={onSaveInput}
          record={record}
          status={status}
          listWarehouseInformation={listWarehouseInformation}
        />
      </Col1>
      <SizedBox height='24px' />
      <Col3 flex={3}>
        <RightColumMobile
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
    </Col>
  );
};

export default MainContentMobile;
