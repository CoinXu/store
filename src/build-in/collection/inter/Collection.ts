/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { CollectionJSON } from "./CollectionJSON"

export interface Collection<T> {
  reset (mods: T[]): Collection<T>

  remove (keyOrMod: string | T): Collection<T>

  update (primaryValue: string, props: Partial<T>): Collection<T>

  add (mod: T): Collection<T>

  sort (compare: (a: T, b: T) => number): Collection<T>

  at (index: number): T | null

  last (): T

  find (filter: Partial<T>): T | null

  get (): T[]

  toJSON (): CollectionJSON<T>

  toString (): string
}