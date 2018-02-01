import { Model } from "./Model";
import { Description } from "../inter/Description";
import { StateSignature } from "../../../core/inter/StateSignature";
import { Store } from "../../../core/impl/Store";
export declare type CreatorArg<T> = Model<T> | Description<T>;
export default function storeModelCreator<T extends StateSignature>(mods: CreatorArg<T>[], store: Store<any>): Store<any>;
