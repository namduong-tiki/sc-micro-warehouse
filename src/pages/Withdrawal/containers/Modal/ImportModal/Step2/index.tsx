import React, {useState} from 'react'
import { Table } from 'antd';
import get from 'lodash/get'
import Guideline from '../Guideline/index'
import { formatMessage, useFormatMessage } from '@/utils/locale';
import HoverText from '@/components/HoverText';
import { NormalText } from '@/components/Text';
import SizedBox from '@/components/SizedBox';


const columns = (page = 1,selectedSize = 10) =>  ([
  {
    title: '#',
    dataIndex: 'name',
    width: 50,
    render: (_:any,record:any,index:any) => <a>{(index + 1) + ((page -1)* selectedSize)}</a>,
  },
  {
    title: formatMessage({id:'ID'}),
    dataIndex: 'name',
    width: '15%',
    render: (_:any,record:any) => <p>{record?.id}</p>,
  },
  {
    title: 'SKU',
    dataIndex: 'money',
    width: '18%',
    render: (_:any,record:any) => <p>{record?.sku}</p>,
  },
  {
    title: formatMessage({id:'Tên sản phẩm'}),
    dataIndex: 'address',
    width: '25%',
    render: (_:any,record:any) => <HoverText fullText={record?.name}><p>{record?.name}</p></HoverText>,
  },
  // {
  //   title: formatMessage({id:'SL dự kiến'}),
  //   dataIndex: 'address',
  //   render: (_:any,record:any) => <p>{record?.expected_qty}</p>,
  //   width:90

  // },
  {
    title: formatMessage({id:'bpor.status'}),
    dataIndex: 'address',
    render: (_:any,record:any) => {
      const row = get(record,['errors',0,'row'],'')
      const errorText = get(record,['errors',0,'message'],)
      const finalText = errorText ? `${formatMessage({id:'Dòng'})}: ${row}: ${errorText}`  : ''
      if(!finalText) return null;
      return(
        <HoverText fullText={finalText}><NormalText color='red'>{finalText}</NormalText></HoverText>
      )}
  },
]);

const Step2 = ({products = []}) => {
  const [selectedSize, setSelectedSize] = useState(10)
  const [page, setPage] = useState(1)
  const formatMessageHook = useFormatMessage()
    return(
      <>
        <Guideline />
        <SizedBox height='12px' />
        <Table
          columns={columns(page,selectedSize)}
          dataSource={products}
          bordered
          pagination={{ 
            pageSize: selectedSize,
            total: products.length,
            onChange: (_page,pageSize) => {
              setPage(_page)
              setSelectedSize(pageSize)
            },
            showTotal: (total, range) => `${range[0]}-${range[1]}(${formatMessageHook({id:'bpor.sum.total'})}: ${total})`,
        }}
          rowKey='id'
        />
      </>
    )
}

export default Step2

