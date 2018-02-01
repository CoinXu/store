import { StateSignature } from "./StateSignature";
export interface StoreObserver<T extends StateSignature> {
    (state?: Partial<T>): void;
}
