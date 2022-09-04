import React from 'react'
import { Drawer } from 'antd';
import { formatMessage } from '@/utils/locale';
import Body from './Body'
import Footer from './Footer'

interface DrawerFilterProps {
    isVisible: boolean,
    onClose: any
}
 
const DrawerFilter = ({
  isVisible,
  onClose,
}:DrawerFilterProps) => {

    return (
      <Drawer
        title={formatMessage({id:'bpor.another_filter'})} 
        placement="right"
        onClose={onClose} 
        width={378}
        bodyStyle={{padding:'16px 12px'}}
        visible={isVisible}
        footer={<Footer
          onApply={() => {}}
          onClearFilter={() => {}}
          isDisableButton={false}
        />}
      >
        <Body />
      </Drawer>
    )
}

export default DrawerFilter;
