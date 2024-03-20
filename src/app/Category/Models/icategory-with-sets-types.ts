import { ISetType } from "./iset-type";

export interface ICategoryWithSetsTypes {
    id:number;
    name: string;
    categorySetsTypes: ISetType[];
}
