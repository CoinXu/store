import { StateSignature } from "./StateSignature";
export interface DispatchCallback<T extends StateSignature> {
    (state?: Partial<T>): void;
}
