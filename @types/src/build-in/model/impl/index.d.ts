import { Model } from "./Model";
import { Description } from "../inter/Description";
import { StateSignature } from "../../../inter/StateSignature";
import { Store } from "../../../impl/Store";
export declare type CreatorArg<T> = Model<T> | Description<T>;
export default function storeModelCreator<T extends StateSignature>(mods: CreatorArg<T>[], store: Store<any>): Store<any>;
