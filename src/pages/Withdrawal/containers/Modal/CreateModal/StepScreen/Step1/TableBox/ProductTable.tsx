import { Table, Image,Empty,Tooltip} from 'antd'
import React, {useState} from 'react'
import { formatMessage, useFormatMessage } from '@/utils/locale';
import styled from 'styled-components';
import { PlusCircleOutlined,MinusCircleOutlined, InfoCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import get from 'lodash/get'
// import { doNothing, FALLBACK_IMAGE } from '@/pages/FBT/constant/proptypes';
import { HeadTitle2, Link1, Text0, Title1, SubTitle1 ,Text1} from '@/components/Text'
import './style.css';
import { FALLBACK_IMAGE, getProductMediaUrl } from '@/utils/image';
import HoverText from '@/components/HoverText';
import { ColumnsType } from 'antd/lib/table';


const EmptyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`


const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ContentContainer = styled.div`
  margin-left: 8px;
`
const StyledTable = styled(Table)`
    width: 49%;
    &&& .ant-table {
      .ant-table-container > .ant-table-body{
        height: 50vh;
      }
    & .ant-table-thead > tr > th.ant-table-cell {
        background-color: #D9D9D9;
    }
    & .ant-table-thead > tr > th.ant-table-cell:nth-child(1)  {
        border-right: 0;
    }
    & .ant-table-tbody > tr > td.ant-table-cell:nth-child(1) {
        border-right: 0;
    }
  }
`
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction:column;
  min-height: 40px;
  min-width: 40px;
`

const HeaderTitleContainer = styled.div`
display: flex;
flex-direction:  column;
align-items: center;
height: 35px;
justify-content: center;
`
const locale = {
  emptyText: (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span>
          <p>
            {formatMessage({id:'bpor.not_yet_selected'})}
          </p>
          <EmptyContainer>
            <Text0>
              {formatMessage({id:'bpor.select_left_and_press'})}
            </Text0>
            <PlusCircleOutlined style={{color:'#1890FF',fontSize:20,margin:'0 5px'}} /> 
            <Text0>{formatMessage({id:'bpor.add_to_list'})}</Text0>
          </EmptyContainer>
        </span>
        }
    />

  )
};


interface ProductTitleProps {
  total: number,
  isSelected?: boolean,
}

const ProductTitle:React.FC<ProductTitleProps> = ({total = 0,isSelected}) => {
    return (
      <HeadTitle2>
        {formatMessage({ id: isSelected ? 'bpor.product_selected' : 'bpor.product_can_choose' })} <Text0 size='16px'>({total})</Text0>
      </HeadTitle2>
    )
}

interface ProductContentProps {
  record: any
}

const ProductContent: React.FC<ProductContentProps> = ({record = {}}) => {
  const image = record?.thumbnail ? getProductMediaUrl(record?.thumbnail) : 'error'
  const cate = get(record,['attributes','catalog_group_name'],'')
  const formatMessageText = useFormatMessage();

  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          width={40}
          height={40}
          src={image}
          fallback={FALLBACK_IMAGE}
        />
      </ImageContainer>
      <ContentContainer>
        <HoverText fullText={record?.name}>
          <Title1 style={{ display: 'block', fontWeight: '600' }}>
            {record?.name}
          </Title1>
        </HoverText>

        <SubTitle1 style={{ display: 'block'}}>
       
          {`${formatMessageText({id:'bpor.category'})}:  ${cate}`}{record?.brand?.value && ` | ${formatMessageText({id:'bpor.trademark'})}: ${record?.brand?.value}`}
        </SubTitle1>
        <SubTitle1>
                    SKU: {record?.sku}{record?.seller_product_code && ` | ${formatMessageText({ id: 'bpor.product_code' })}: ${record?.seller_product_code}`} | <SubTitle1 color='orange'>{formatMessageText({id:'bpor.inventory'})}: {record?.inventory?.qty_available || 0}</SubTitle1>
        </SubTitle1>
        {record?.isDisable && 
        <Text1 color='red' size='14px'>
          &nbsp;{` ${formatMessageText({id:'bpor.cant_import'})} `}   
          <Tooltip title={formatMessageText({id:'bpor.not_current_in_warehouse'})}>
            <InfoCircleOutlined />
          </Tooltip>
        </Text1>}
      </ContentContainer>
    </ProductContainer>)
}

interface ActionContentProps {
  action?: any,
  isSelected?: boolean,
  record?: any,
}

const ActionContent: React.FC<ActionContentProps> = ({action,isSelected,record}) => {
  if(isSelected){
    return(
      <MinusCircleOutlined
        onClick={() => action('minus',record)}
        style={{
              fontSize: 20,
              cursor: 'pointer',
              color:'red'

          }}
      />
    )
  }
  if(record?.isDisable){
    return(
      <CloseCircleOutlined
        style={{
              fontSize: 20,
              cursor: 'pointer',
              color:'red'

          }}
      />
    )
  }
    return (
      <PlusCircleOutlined
        onClick={() => action('add',record)}
        style={{
                fontSize: 20,
                cursor: 'pointer',
                color: '#1890FF',
            }}
      />
    )
}

interface ActionTitleProps {
  isSelected?: boolean,
  action?: any,
  data?: any,
}

const ActionTitle: React.FC<ActionTitleProps> = ({isSelected, action,data = []}) => {
  if(isSelected){
    return (
      <HeaderTitleContainer> 
        <Link1 style={{color:'red'}} onClick={() => action('all',data,'minus')}>
          {formatMessage({ id: 'bpor.delete_all' })}
        </Link1>
      </HeaderTitleContainer>

    )
  }
    return (
      <HeaderTitleContainer> 
        <Link1 onClick={() => action('all',data,'add')} style={{display:'block'}}>
          {formatMessage({ id: 'bpor.select_all' })}
        </Link1>
        <SubTitle1 size='13px'>
        ({data.length} {formatMessage({id:'bpor.product'})})
        </SubTitle1>
      </HeaderTitleContainer>
    )
}
const columns = (total: number,onChangeListSelected: any,isSelected: boolean,data: any)  =>
 [
    {
        title: <ProductTitle total={total} isSelected={isSelected} />,
        render: (_: any,record:any) => <ProductContent record={record} />,
        width: '75%',
      },
    {
        title: <ActionTitle isSelected={isSelected} action={onChangeListSelected} data={data} />,
        dataIndex: 'address',
        width: '25%',
        align: 'center',
        render: (_: any,record:any) => <ActionContent record={record} action={onChangeListSelected} isSelected={isSelected} />
    },
];


interface ProductTableProps {
  data?: any,
  isSelected?: any,
  onChangeListSelected?: any,
  onChangeQuery?: any,
  limit?: any,
}



const ProductTable: React.FC<ProductTableProps> = ({data = {},isSelected,onChangeListSelected,onChangeQuery,limit}) => {
    const [selectedSize, setSelectedSize] = useState(20)
    const formatMessageHook = useFormatMessage()

  if(isSelected) {
    const length = data?.data?.length
    return(
      <StyledTable
        scroll={{y:'50vh'}}
        columns={columns(length,onChangeListSelected,isSelected,data?.data) as ColumnsType<any>}
        dataSource={data?.data}
        bordered
        rowKey="id" 
        locale={locale}  
        pagination={{ 
        pageSize: selectedSize,
        total:data?.data?.length,
        showSizeChanger:true,
        onChange: (_page,pageSize) => setSelectedSize(pageSize),
        showTotal: (total, range) => `${range[0]}-${range[1]}(${formatMessageHook({id:'Tổng cộng'})}: ${total})`,
    }}
      />

    )
  }
  const length = data?.data?.length
  return (
    <StyledTable
      scroll={{y:'50vh'}}
      columns={columns(length,onChangeListSelected,isSelected,data?.data) as ColumnsType<any> }
      dataSource={data?.data}
      rowKey="id" 
      bordered
      rowClassName={(record: any) => record?.isDisable === true ? 'disabledRow' : ''}
      pagination={{ 
          pageSize: limit,
          total:data?.paging?.total,
          showTotal: (total, range) => `${range[0]}-${range[1]}(${formatMessageHook({id:'Tổng cộng'})}: ${total})`,
          onChange: (page,pageSize) => onChangeQuery('page',page,pageSize)
      }}
    />
    )
}
export default ProductTable

