import { ValidatorDecorate } from "../inter/ValidatorDecorate";
export declare enum DataTypes {
    PRIM_BOOL = "Boolean",
    PRIM_NUM = "Number",
    PRIM_STR = "String",
    PRIM_NL = "Null",
    PRIM_UNDEF = "Undefined",
    PRIM_SYMBOL = "Symbol",
    OBJ_O = "Object",
    OBJ_A = "Array",
}
export default function DataType(type: DataTypes, msg?: string): ValidatorDecorate;
export { DataType };
