import {SPFI,spfi,ICamlQuery,SPFx} from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFetchingLargeDataState } from "../webparts/fetchLargeData/components/IFetchingLargeDataState";
export class ServiceClass{
    private sp:SPFI;
    constructor(context:WebPartContext){
        this.sp=spfi().using(SPFx(context));
    }
    //Get more than 5000 items

    public async _getAllItems(ListName:string):Promise<IFetchingLargeDataState[]>{
        const _allItems:IFetchingLargeDataState[]=[];
        let position:any=null;
        do{
            const camlQuery:ICamlQuery={
                ViewXml:`
                <View>
                <Query>
                <Where>
                <IsNotNull>
                <FieldRef Name='Title'/>
                </IsNotNull>
             </Where>
                </Query>
                <RowLimit>2000</RowLimit>
                </View>
                `
            };
            const respone=await this.sp.web.lists.getByTitle(ListName).getItemsByCAMLQuery(camlQuery,position);
            console.log(`Fetched batch of ${respone.length} items`);
            _allItems.push(...respone.map((item:any)=>({
                Title:item.Title
            })));
            position=null;
        }
        while(position){
            console.log(`Total items fetched ${_allItems.length}`);
            return _allItems;
        }
    }
}