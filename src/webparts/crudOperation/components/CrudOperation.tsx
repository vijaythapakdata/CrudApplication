import * as React from 'react';
// import styles from './CrudOperation.module.scss';
import type { ICrudOperationProps } from './ICrudOperationProps';
import {spfi,SPFx,SPFI} from "@pnp/sp/presets/all";
interface ICrudOperationState{
  Title:string;
  EmailAddress:string;
  Id:number
}
interface ICrud{
  title:string;
  emailaddress:string;
  id:number;
}
const  CrudOperation=(props:ICrudOperationProps):React.ReactElement=>{
const _sp:SPFI=spfi().using(SPFx(props.context));
const[reload,setReload]=React.useState<boolean>(false);
const[newTitle,setNewTitle]=React.useState<string>('');
const[newemaiaddress,setNewEmailAddress]=React.useState<string>('');
const[isAddHidden,setIsAddHidden]=React.useState<boolean>(true);
const[currentId,setCurrentId]=React.useState<number|any>()
  const[states,setStates]=React.useState<Array<ICrud>>([]);
  const [editHidden,setIsEditHidden]=React.useState<boolean>(true);
  const[editTitle,setEditTitle]=React.useState<string>('');
const[editemaiaddress,setEditEmailAddress]=React.useState<string>('');

  React.useEffect(()=>{
    _getListItems();
  },[reload]);
  //fetch data;
  const _getListItems=async()=>{
    try{
const _getList=await _sp.web.lists.getByTitle(props.ListName).items();
//setting the values of state
setStates(_getList.map((each:ICrudOperationState)=>({
  title:each.Title,
  emailaddress:each.EmailAddress,
  id:each.Id
})));
    }
    catch(err){
console.log(err);

    }
    finally{
console.log("List item fetched",states);
    }
  }
  //Adding New Title Event
  const handleNewTitle=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setNewTitle(event.target.value);
  }
   const handleNewEmailAddress=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setNewEmailAddress(event.target.value);
  }
  const _createItems=async()=>{
    const _lists=_sp.web.lists.getByTitle(props.ListName);
    try{
      await _lists.items.add({
        Title:newTitle,
        EmailAddress:newemaiaddress
      });
      //close the add modal 
      setIsAddHidden(true);
      setReload(!reload);
      console.log("List item is created successfullly");
    }
    catch(err){
      console.log(err);

    }
    finally{
      setIsAddHidden(true);
    }
  }
  //create dialog while clicking on edit button
  const _openDialog=(id:number)=>{
    setCurrentId(id);
    //this function would modal
    setIsEditHidden(false);
    const items:ICrud|undefined=states.find((each:any)=>each===id);
  }
  const handleEditTitle=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setEditTitle(event.target.value);
  }
   const handleEditEmailAddress=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setEditEmailAddress(event.target.value);
  }
   const _updateItems=async()=>{
    const _lists=_sp.web.lists.getByTitle(props.ListName);
    try{
      await _lists.items.getById(currentId).update({
        Title:editTitle,
        EmailAddress:editemaiaddress
      });
      //close the add modal 
      setIsEditHidden(true);
      setReload(!reload);
      console.log("List item is updated successfullly");
    }
    catch(err){
      console.log(err);

    }
    finally{
      setIsEditHidden(true);
    }
  }
  return(
    <></>
  )
}
export default  CrudOperation;