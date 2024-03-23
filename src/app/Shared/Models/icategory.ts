import { IItemType } from "./iitem-type";
import { ISetType } from "./iset-type";

export interface ICategory {
    id:number;
    name: string;
    categorySetsTypes: ISetType[];
    categoryItemsTypes :IItemType[];
}
