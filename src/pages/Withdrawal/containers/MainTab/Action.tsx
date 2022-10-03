import { Text0 } from '@/components/Text';
import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import get from 'lodash/get';
import SizedBox from '@/components/SizedBox';
import { LIST_ACTION, renderActionHelper } from './constant';
import { Dropdown, Menu } from 'antd';
import { useActionHook } from '../../hook/actionHook';
import { formatMessage } from '@/utils/locale';

interface StyledProps {
  [key: string]: any;
}

const ActionContainer = styled.div<StyledProps>`
  width: 100%;
  min-height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 2px 0px 0px 2px;
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : '1px solid #D9D9D9'};
  cursor: pointer;
`;

const MoreActionBox = styled.div<StyledProps>`
  border-left: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : '1px solid #D9D9D9'};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  width: 32px;
  cursor: -webkit-grab;
  cursor: grab;
`;
const Flex1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  record: any;
}

const renderAction = (listAction: any, onClick: any) => {
  return (
    <Menu>
      {listAction.map((item: any) => (
        <Menu.Item key={item.key} onClick={() => onClick(get(item, ['key'], ''))}>
          <a target="_blank" rel="noopener noreferrer">
            { formatMessage({id: item?.text}) }
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );
};

const Action: React.FC<Props> = ({ record }) => {
  const { onOpenDetail, onOpenPrintBPOR, onDelete, onCancel } = useActionHook();

  const actionData = renderActionHelper(record.status,record?.is_allow_cancel);
  const secondActionText = get(actionData, ['second', 'text'], '');
  const listAction = get(actionData, ['list'], []);

  const onClick = (type: string) => {
    if (
      type === get(LIST_ACTION, ['DETAIL', 'key']) ||
      type === get(LIST_ACTION, ['EDIT', 'key'])
    ) {
      onOpenDetail(record?.id);
    }
    if (type === get(LIST_ACTION, ['PRINT_BPOR', 'key'])) {
      onOpenPrintBPOR(record?.id);
    }
    if (type === get(LIST_ACTION, ['CANCEL', 'key'])) {
        onCancel(record?.id)
    }
    if (type === get(LIST_ACTION, ['DELETE', 'key'])) {
      onDelete(record?.id);
    }
  };

  return (
    <>
      <ActionContainer
        borderColor="#1890FF"
        onClick={() => onClick(get(actionData, ['first', 'key'], ''))}
      >
        <Flex1>
          <Text0 color="#1890FF">{formatMessage({id: get(actionData, ['first', 'text'], '')})}</Text0>
        </Flex1>
      </ActionContainer>
      {secondActionText && (
        <>
          <SizedBox height="4px" />
          <ActionContainer>
            <Flex1 onClick={() => onClick(get(actionData, ['second', 'key'], ''))}>
              <Text0>{formatMessage({id:secondActionText})}</Text0>
            </Flex1>

            {listAction.length > 0 && (
              <Dropdown
                overlay={renderAction(listAction, onClick)}
                placement="bottomRight"
                trigger={['hover']}
              >
                <MoreActionBox>
                  <MoreOutlined />
                </MoreActionBox>
              </Dropdown>
            )}
          </ActionContainer>
        </>
      )}
    </>
  );
};

export default Action;
