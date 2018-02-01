import { Descriptor } from "./Descriptor";
export interface TargetValidator {
    target: any;
    validator: {
        [key: string]: Descriptor[];
    };
}
