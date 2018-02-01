import { StateSignature } from "./StateSignature";
export interface NextCallback<T extends StateSignature> {
    (state?: Partial<T>): void;
}
