import { Divider,Popover,Button,Checkbox, Tag } from 'antd';
import React, {useState,useEffect} from 'react'
import styled from 'styled-components';
import { formatMessage } from '@/utils/locale';
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import { DownOutlined } from '@ant-design/icons';
import SizedBox from '@/components/SizedBox';
import TitleField from './TitleField';


const StyledButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  color: rgba(0, 0, 0, 0.25);
  width: 100%;
`;
const IconDropdown = styled(DownOutlined)`
  font-size: 12px;
  margin-top: 4px;
`
const SelectContainer = styled.div`
  width: 292px;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`
const SelectContent = styled.div`
  height: 254px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`
const SelectFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const CheckboxStyled = styled(Checkbox)`
  margin-left: 8px;
  margin-bottom: 8px;
`

const ContentContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
`
const Title1 = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #262626;
`;

interface WarehouseProps {
  warehouses? : any,
  onChangeWarehouseSelected?: any,
  warehouseCode?: any
}

const Warehouse = ({warehouses = [],onChangeWarehouseSelected,warehouseCode}:WarehouseProps) => {
  const valueWarehouseCode = warehouseCode ? warehouseCode.split(',') : []

  const [isVisible, setIsVisible] = useState(false)
  const [valueState,setValueState] = useState(valueWarehouseCode)

  useEffect(() => {
    const temp = warehouseCode ? warehouseCode.split(',') : []
    setValueState(temp)
  }, [warehouseCode])
  
  const onClear = () => {
    setValueState([])
    onChangeWarehouseSelected(null)
    }

  const onClearAll = () => {
      setIsVisible(false)
      onClear()    
    }

  const onApply = () => {
      setIsVisible(false)
      return onChangeWarehouseSelected([...valueState])
    }

  const onCheck = (code: any) => {
      const indexStatus = findIndex(valueState, st => st === code)
      if(indexStatus !== -1 ){
          const temp = valueState.filter((st:any) => st !== code)
          return  setValueState(temp)
      }
      return setValueState([...valueState,code])
  }
    return (
      <>
        <TitleField title={formatMessage({id:'Kho nhập hàng'})} action={onClear} />
        <SizedBox height='10px' />

        <Popover
          visible={isVisible}
          placement="bottom"
          title={null}
          content={<SelectStatusContent
            onApply={onApply}
            warehouses={warehouses}
            onClearAll={onClearAll}
            onCheck={onCheck}
            valueState={valueState}
          />}
          onVisibleChange={(value) => {
            setIsVisible(value)
            setValueState(valueWarehouseCode)
              }}
          trigger="click"
        >
          <StyledButton onClick={() => setIsVisible(true)}>
            {valueState.length > 0 ? 
              <ContentContainer>
                {valueState.map((i: any,index: number) => (
                  <Tag key={index}>
                    {formatMessage({id:'bpor.warehouse'})} {i ? i.toUpperCase() : ''}
                  </Tag>
                ))}
              </ContentContainer>
            :  formatMessage({ id: 'bpor.warehouseCamel' })

            }
            <SizedBox width='12px' />
            <IconDropdown />
          </StyledButton>
        </Popover>
        
        <Divider style={{margin:'16px 0px'}} />
    



      </>
    )
}

export default Warehouse;

interface SelectStatusContent {
  warehouses?:any,
  onApply?:any,
  onClearAll?:any,
  onCheck?:any,
  valueState?:any,
}

const SelectStatusContent: React.FC<SelectStatusContent> = ({warehouses = [], onApply, onClearAll, onCheck, valueState }) => {
  // const finalWarehouse = filterWareHouses(warehouses)
  const finalWarehouse = warehouses

  return (
    <SelectContainer>
      <SelectContent>
        {finalWarehouse.map((domainWarehouse: any, key: number) => {
          const title = get(domainWarehouse,['name'],'empty')
          const data = get(domainWarehouse,['data'],[])
          if(data.length === 0) return null
          return (
            <React.Fragment key={key}>
              <Title1 style={{marginBottom:8}}>
                {formatMessage({id:title})}
              </Title1>
              {data.map((item:any,index:number) => ( <SelectItem
                key={index}
                item={item}
                value={valueState}
                onCheck={onCheck}
              />))}
           
            </React.Fragment>
          )
        })}
      </SelectContent>
      <SelectFooter>
        <Button style={{ flex: 1 }} onClick={onClearAll}>
          {formatMessage({ id: 'Bỏ lọc' })}
        </Button>
        <SizedBox width='20px' />
        <Button type="primary" style={{ flex: 1 }} onClick={onApply}>
          {formatMessage({ id: 'Áp dụng' })}
        </Button>
      </SelectFooter>
    </SelectContainer>


  )
}

interface SelectItemProps {
  item?: any,
  onCheck?: any,
  value?: any,
}

const SelectItem: React.FC<SelectItemProps> = ({item,  onCheck, value = [] }) => {
    const isChecked = value.includes(item?.code)
  return (
    <>
      <CheckboxStyled
        checked={isChecked}
        value={get(item,['code'])}
        onChange={() => onCheck(item?.code)}
      >
        {formatMessage({id:'bpor.warehouse'})} {get(item,['code'],'').toUpperCase()}
      </CheckboxStyled>
     
    </>
  )
}
