import { SubTitle1, Text0 } from '@/components/Text';
import { useFormatMessage } from '@/utils/locale';
import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

function Warehouse({ warehouseInfo }: any) {
  const {
    warehouse,
    isDraft,
    isCancel,
    expectedQty,
    actualQty,
    diffQty,
    isShowDeviant,
    isShowEnable,
    estimatedQty,
    isShowActualQty,
  } = warehouseInfo;
  const formatMessage = useFormatMessage();

  return (
    <>
      <Row>
        <Col style={{ flex: 1 }}>
          <span>
            <SubTitle1>{formatMessage({ id: 'bpor.warehouse' })}</SubTitle1>:
            <Text0> {warehouse.toUpperCase()}</Text0>
          </span>
        </Col>
        <Col style={{ flex: 1 }}>
          <span>
            <SubTitle1>{formatMessage({ id: 'bpor.warehouse.expected_qty' })}</SubTitle1>:
            <Text0> {expectedQty}</Text0>
          </span>
        </Col>
      </Row>
      {!isDraft && !isCancel && (
        <>
          <Row>
            {isShowEnable && (
              <Col style={{ flex: 1 }}>
                <span>
                  <SubTitle1>{formatMessage({ id: 'bpor.warehouse.estimated_qty' })}</SubTitle1>:
                  <Text0> {estimatedQty}</Text0>
                </span>
              </Col>
            )}
            {isShowActualQty && (
              <Col style={{ flex: 1 }}>
                <span>
                  <SubTitle1>{formatMessage({ id: 'bpor.warehouse.actual_qty' })}</SubTitle1>:
                  <Text0> {actualQty}</Text0>
                </span>
              </Col>
            )}
          </Row>
          <Row>
            {isShowDeviant && (
              <Col style={{ flex: 1 }}>
                <span>
                  <SubTitle1>{formatMessage({ id: 'bpor.warehouse.diff_qty' })}</SubTitle1>:
                  <Text0> {diffQty}</Text0>
                </span>
              </Col>
            )}
          </Row>
        </>
      )}
    </>
  );
}

export default Warehouse;
