import * as React from 'react';
// import styles from './FetchLargeData.module.scss';
import type { IFetchLargeDataProps } from './IFetchLargeDataProps';
import { ServiceClass } from '../../../Service/service';
import { IFetchingLargeDataState } from './IFetchingLargeDataState';
import { DetailsList } from '@fluentui/react';

const  FetchLargeData :React.FC<IFetchLargeDataProps>=(props)=>{
  const[ListResult,setListResults]=React.useState<IFetchingLargeDataState[]>([]);
  const _service=new ServiceClass(props.context);
  React.useEffect(()=>{
    const fetchData=async()=>{
      try{
        const result=await _service._getAllItems(props.ListName);
        setListResults(result);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[props.ListName,_service]);
  return(
    <>
    <DetailsList
    items={ListResult}
    />
    </>
  )
}
export default  FetchLargeData ;
