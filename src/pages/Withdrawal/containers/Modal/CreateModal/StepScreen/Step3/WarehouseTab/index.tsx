import SizedBox from '@/components/SizedBox';
import { Tabs } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import ContactInfo from './ContactInfo';
import WarehouseInfo from './WarehouseInfo';

export interface IAppProps {
  [key: string]: any;
}

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

const ContentContainer = styled.div`
  padding: 16px 24px;
`;

const renderTitle = (tab: any) => {
  //   switch (tab.value) {
  //     case TAB_NAME.DRAFT:
  //       return `${tab.title}${tabsData?.draft ? ` (${tabsData?.draft})` : ''}`;
  //       case TAB_NAME.PROCESSING:
  //         return `${tab.title}${tabsData?.processing ? ` (${tabsData?.processing})` : ''}`;
  //     case TAB_NAME.WAITING:
  //       return `${tab.title}${tabsData?.processing ? ` (${tabsData?.processing})` : ''}`;
  //     case TAB_NAME.SUCCESSFULLY:
  //       return `${tab.title}${tabsData?.completed ? ` (${tabsData?.completed})` : ''}`;
  //     case TAB_NAME.LIQUIDATED:
  //       return `${tab.title}${tabsData?.draft ? ` (${tabsData?.draft})` : ''}`;
  //     default:
  //       return tab.title;
  //   }
  return `Kho ${tab.code.toUpperCase()} (${tab.countProduct} sản phẩm - Số lượng: ${tab.total})`;
};

export default function WarehouseTab({
  customerInformation,
  tikiReturnWarehouse,
  createData,
  tab,
  onTabChange,
  onSelectTikiReturnWarehouse,
  onSelectCustomerInformation,
}: IAppProps) {
  return (
    <>
      <SizedBox height="16px  " />
      <StyledTabs
        type="card"
        size="middle"
        activeKey={tab}
        onChange={onTabChange}
        tabPosition="top"
        // animated={!isMobile}
      >
        {createData.map((tab: any) => {
          const title = renderTitle(tab);
          return (
            <StyledTabs.TabPane key={tab.code} tab={<TitleTab>{title}</TitleTab>}>
              <ContentContainer>
                <WarehouseInfo
                  onSelectTikiReturnWarehouse={onSelectTikiReturnWarehouse}
                  warehouseCode={tab.code}
                  tikiReturnWarehouse={tikiReturnWarehouse}
                />
                <ContactInfo
                  warehouseCode={tab.code}
                  onSelectCustomerInformation={onSelectCustomerInformation}
                  customerInformation={customerInformation}
                />
              </ContentContainer>
            </StyledTabs.TabPane>
          );
        })}
      </StyledTabs>
    </>
  );
}
