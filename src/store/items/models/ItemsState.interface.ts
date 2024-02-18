import {ItemInterface} from "@/models/items";


export interface ItemsStateInterface {
    loading: boolean
    items: ItemInterface[]
}
