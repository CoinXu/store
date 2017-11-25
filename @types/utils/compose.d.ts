import { Middleware, MiddlewareCompose } from '../interfaces';
export default function <T>(middlewares: Middleware<T>[]): MiddlewareCompose<T>;
