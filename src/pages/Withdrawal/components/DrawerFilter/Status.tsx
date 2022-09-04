import { Divider,Popover,Button,Checkbox, Tag } from 'antd';
import React, {useState,useEffect} from 'react'
import styled from 'styled-components';
import { formatMessage } from '@/utils/locale';
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import { DownOutlined } from '@ant-design/icons';
import { LIST_STATUS_TAB_SUCCESSFULLY } from '../../constants/status';
import TitleField from './TitleField'
import SizedBox from '@/components/SizedBox';


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
  max-height: 254px;
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
  margin-bottom: 14px;
`

const ContentContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
`

interface StatusProps {
  status?: any,
  onChangeStatus?: any,
}

const Status: React.FC<StatusProps> = ({
  status,
  onChangeStatus,
}) => {
  const LIST_STATUS = LIST_STATUS_TAB_SUCCESSFULLY

  const initStatus = status ? status.split(',') : []

  const [isVisible, setIsVisible] = useState(false)
  const [statusValue,setStatusValue] = useState(initStatus)



  useEffect(() => {
    const temp = status ? status.split(',') : []
    setStatusValue(temp)
  }, [status])

  const onClear = () => {
    setStatusValue([])
    onChangeStatus(null)
  }

  const onClearAll = () => {
      setIsVisible(false)
      onClear()    
    }

  const onApply = () => {
      setIsVisible(false)
      return onChangeStatus([...statusValue])
    }

  const onCheck = (statusParam: any) => {
      const indexStatus = findIndex(statusValue, st => st === statusParam)
      if(indexStatus !== -1 ){
          const temp = statusValue.filter((st:any) => st !== statusParam)
          return  setStatusValue(temp)
      }
      return setStatusValue([...statusValue,statusParam])
  }

    return (
      <>
        <TitleField title={formatMessage({id:'bpor.status'})} action={onClear} />
        <SizedBox height='10px' />

        <Popover
          visible={isVisible}
          placement="bottom"
          title={null}
          content={<SelectStatusContent
            listStatus={LIST_STATUS}
            onApply={onApply}
            onClearAll={onClearAll}
            onCheck={onCheck}
            statusValue={statusValue}
          />}
          onVisibleChange={(value) => {
            setIsVisible(value)
            setStatusValue(initStatus)
              }}
          trigger="click"
        >
          <StyledButton onClick={() => setIsVisible(true)}>
            {statusValue.length > 0 ? 
              <ContentContainer>
                {statusValue.map((i:any,index:number) => {
                  const indexItem = findIndex(LIST_STATUS,e => e?.key === i)

                  return (
                    <Tag key={index}>
                      {get(LIST_STATUS,[indexItem,'value'])}
                    </Tag>
                  )
                }
                )}
              </ContentContainer>
            :  formatMessage({ id: 'bpor.status' })

            }
            <SizedBox width='12px' />
            <IconDropdown />
          </StyledButton>
        </Popover>
        <Divider style={{margin:'16px 0px'}} />


      </>
    )
}

export default Status;

interface SelectStatusContent {
  onApply:any,
  onClearAll:any,
  onCheck:any,
  statusValue:any,
  listStatus:any,

}

const SelectStatusContent: React.FC<SelectStatusContent> = ({ onApply, onClearAll, onCheck, statusValue,listStatus =[], }) => {

  return (
    <SelectContainer>
      <SelectContent>
        {listStatus.map((item:any, key:number) => {
          return (
            <SelectItem
              key={key}
              item={item}
              value={statusValue}
              onCheck={onCheck}
            />
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

interface SelectItem {
  item?:any,
  onCheck: any,
  value:any,
}

const SelectItem: React.FC<SelectItem> = ({item,  onCheck, value = [] }) => {
    const isChecked = value.includes(item?.key)
  return (
    <>
      <CheckboxStyled
        checked={isChecked}
        value={item?.key}
        onChange={() => onCheck(item?.key)}
      >
        {item?.value}
      </CheckboxStyled>
     
    </>
  )
}
