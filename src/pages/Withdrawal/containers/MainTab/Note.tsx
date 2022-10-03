import { Text1 } from '@/components/Text';
import React from 'react';
// import { checkIsDraftBPOR } from './helper';

interface Props {
  record: any
}

const Note: React.FC<Props> = ({record}) => {
  // const isDraft = checkIsDraftBPOR(record?.status)
  // if(isDraft){
  //   return(
  //     <>
  //        <Text1>
  //         --
  //        </Text1>
  //     </>
  //   )
  // }
  return (
    <>
    <Text1>
      {record?.note}
    </Text1>
    </>
  );
};

export default Note;
