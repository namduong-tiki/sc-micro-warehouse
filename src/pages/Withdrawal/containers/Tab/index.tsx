import { Tabs } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { useFormatMessage } from '@/utils/locale';
import { TABS, TAB_NAME } from '../../constants/tab';
import { useTab } from './tabHook';

export interface IAppProps {}

const StyledTabs = styled(Tabs)`
  width: 100%;
  background-color: #fff;

  & > .ant-tabs-nav::before {
    border-bottom-color: #d9d9d9;
  }

  & > .ant-tabs-nav {
    margin: 0;
    & .ant-tabs-nav-list {
      & .ant-tabs-tab {
        width: fit-content;
        margin-right: 4px;
        border-radius: 4px 4px 0 0;
        border-color: #d9d9d9;
        background-color: #f5f5f5;
      }

      & .ant-tabs-tab:first-child {
        margin-left: 32px;
      }

      @media screen and (max-width: 991px) {
        & .ant-tabs-tab:first-child {
          margin-left: 8px;
        }
      }

      & .ant-tabs-tab-active {
        border-top-color: #1890ff;
        border-top-width: 3px;
        background-color: #fff;
        border-bottom: none;
      }

      & .ant-tabs-tab:not(.ant-tabs-tab-active) strong {
        color: #262626;
      }
    }
  }
`;

const TitleTab = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const renderTitle = (tab: any, tabData: any, formatMessage: any) => {
  switch (tab.value) {
    case TAB_NAME.DRAFT:
      return `${formatMessage({ id: tab.title })}${
        tabData?.draft || tabData?.draft === 0 ? ` (${tabData?.draft})` : ''
      }`;
    case TAB_NAME.PROCESSING:
      return `${formatMessage({ id: tab.title })}${
        tabData?.processing || tabData?.processing === 0 ? ` (${tabData?.processing})` : ''
      }`;
    case TAB_NAME.WAITING:
      return `${formatMessage({ id: tab.title })}${
        tabData?.done || tabData?.done === 0 ? ` (${tabData?.done})` : ''
      }`;
    case TAB_NAME.SUCCESSFULLY:
      return `${formatMessage({ id: tab.title })}${
        tabData?.completed || tabData?.completed === 0 ? ` (${tabData?.completed})` : ''
      }`;
    case TAB_NAME.CANCELLED:
      return `${formatMessage({ id: tab.title })}${
        tabData?.canceled || tabData?.canceled === 0 ? ` (${tabData?.canceled})` : ''
      }`;
    default:
      return formatMessage({ id: tab.title });
  }
};

export default function Tab({}: IAppProps) {
  const { onTabChange, tab, tabData } = useTab();
  const formatMessage = useFormatMessage();
  return (
    <>
      <StyledTabs
        type="card"
        size="middle"
        activeKey={tab}
        onChange={onTabChange}
        tabPosition="top"
        // animated={!isMobile}
      >
        {TABS.map((item) => {
          const title = renderTitle(item, tabData, formatMessage);
          return <StyledTabs.TabPane key={item?.value} tab={<TitleTab>{title}</TitleTab>} />;
        })}
      </StyledTabs>
    </>
  );
}
