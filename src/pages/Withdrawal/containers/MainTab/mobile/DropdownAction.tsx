import React from 'react';
import { Dropdown, Menu } from 'antd';
import get from 'lodash/get';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { LIST_ACTION, renderActionMobileHelper } from '../constant';
import { useActionHook } from '@/pages/Withdrawal/hook/actionHook';
import { formatMessage } from '@/utils/locale';

const MoreIcon = styled(MoreOutlined)`
  font-size: 18px;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 0px;
`;

const DropdownAction = ({ record }: any) => {
  const { onOpenDetail, onOpenPrintBPOR, onDelete, onCancel } = useActionHook();

  const actionData = renderActionMobileHelper(record.status, record?.is_allow_cancel);
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
      onCancel(record?.id);
    }
    if (type === get(LIST_ACTION, ['DELETE', 'key'])) {
      onDelete(record?.id);
    }
  };

  return (
    <Dropdown
      overlay={renderAction(listAction, onClick)}
      placement="bottomRight"
      trigger={['click']}
    >
      <IconBox>
        <MoreIcon />
      </IconBox>
    </Dropdown>
  );
};

export default DropdownAction;

const renderAction = (listAction: any, onClick: any) => {
  return (
    <Menu>
      {listAction.map((item: any) => {
        return (
          <Menu.Item key={item.key} onClick={() => onClick(get(item, ['key'], ''))}>
            <a target="_blank" rel="noopener noreferrer">
              {formatMessage({id:item?.text})}
            </a>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
