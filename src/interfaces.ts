/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   25/11/2017
 * @description
 */

export interface Action {
  type: string
  payload?: any
}

export interface Next<T> {
  (state: Partial<T>): void
}

export interface Middleware<T> {
  (action: Action, state: T, next: Next<T>): void
}

export interface MiddlewareCompose<T> {
  (
    action: Action,
    state: T,
    processor: (state: Partial<T>) => void,
    complete: (action: Action) => void
  ): void
}

export interface Observer<T> {
  (state: T): void
}

