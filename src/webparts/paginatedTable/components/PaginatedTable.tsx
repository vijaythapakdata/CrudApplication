import * as React from 'react';
// import styles from './PaginatedTable.module.scss';
import type { IPaginatedTableProps } from './IPaginatedTableProps';
// import {sp} from "@pnp/sp/presets/all";
import {spfi,SPFx,SPFI} from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const PaginatedTable:React.FC<IPaginatedTableProps>=(props)=>{
  const[items,setItems]=React.useState<any[]>([]);
  const[searchText,setSearchText]=React.useState<string>('');

  React.useEffect(()=>{
   const _sp:SPFI=spfi().using(SPFx(props.context));
   _sp.web.lists.getByTitle(props.ListName).items.select('Title','EmailAddress','Age').top(4999)
  });
  return(
    <>
    </>
  )
}
export default PaginatedTable;
