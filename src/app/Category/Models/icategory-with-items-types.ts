import { IItemType } from "./iitem-type";

export interface ICategoryWithItemsTypes {
    id:number;
    name: string;
    categoryItemsTypes :IItemType[];
}
