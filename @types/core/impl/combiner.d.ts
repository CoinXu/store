import { StateSignature } from "../inter/StateSignature";
import { MiddlewareCombiner } from "../inter/MiddlewareCombiner";
import { Middleware } from "../inter/Middleware";
export default function <T extends StateSignature>(mws: Middleware<T>[]): MiddlewareCombiner<T>;
