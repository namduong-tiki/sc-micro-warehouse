import React from 'react';
import Warehouse from './Warehouse';
import Status from './Status';
import Type from './Type';
import Reason from './Reason';
import Date from './Date';


interface BodyProps {}

const Body = ({}: BodyProps) => {
  return (
    <>
      <Warehouse />
      <Status/>
      <Type/>
      <Reason/>
      <Date/>
    </>
  );
};

export default Body;
