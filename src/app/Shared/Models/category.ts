export interface IType {
    id: number,
    name: string
}

export interface ICategorySetsTypes {
    id: number,
    name: string
    categorySetsTypes: IType[];
}

export interface ICategoryItemsTypes {
    id: number,
    name: string
    categoryItemsTypes: IType[];
}