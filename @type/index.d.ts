// Definitions by: Coinxu <https://github.com/CoinXu>
// TypeScript Version: 2.4

export = store
export as namespace store

declare namespace store {
  interface ActionDesc {
    type: string
    payload?: any
    [key: string]: any
  }

  interface Middleware<T> {
    (action: ActionDesc, state: T, next: () => void): any
  }

  interface Subscriber<T> {
    (state: T): any
  }

  interface StoreNext {
    (state: any): any
  }

  // ======================
  // Store
  // ======================
  interface Store<T> {

    readonly state: T
    readonly observer: (state: T) => any
    readonly mw: Middleware<T>[]

    initialize(action?: ActionDesc): Store<T>
    dispose(action: ActionDesc, callback?: Subscriber<T>): Store<T>
    single(action: ActionDesc, callback?: Subscriber<T>): Store<T>
    multiple(actions: ActionDesc[], callback?: Subscriber<T>): Store<T>
    dispatch(actionOrActions: ActionDesc | ActionDesc[], callback?: Subscriber<T>): Store<T>
    use(mw: Middleware<T>): Store<T>
    getState(): T
    subscribe(observer: Subscriber<T>): Store<T>
  }

  interface StoreConstructor {
    new<T>(state?: T): Store<T>
  }

  export const Store: StoreConstructor

  // ======================
  // middleware
  // ======================

  // storeModelCreator

  interface ModelDesc<T> {
    name: string
    scheduler(this: Model<T>, state: T, action: ActionDesc, done: StoreNext): T | void
    state: T
  }

  interface Model<T> extends ModelDesc<T> {
    receiver(action: ActionDesc, state: any, next: StoreNext): Model<T>
    done(state: T, next: StoreNext): Model<T>
  }

  interface ModelConstructor {
    new<T>(desc: ModelDesc<T>): Model<T>
    isModel(ins: any): boolean
  }

  export const Model: ModelConstructor;

  export function storeModelCreator<T, K, U extends Store<K>> (mods: Array<ModelDesc<T> | Model<T>>, store: U): U

  // storeViewModelCreator
  interface ViewModelDesc<T> extends ModelDesc<T> {
    scheduler(this: ViewModel<T>, state: T, action: ActionDesc, next: StoreNext): T | void
  }

  interface ViewModel<T> extends Model<T> {
    readonly store: Store<any>
  }

  interface ViewModelConstructor {
    new<T>(desc: ModelDesc<T>, store: Store<any>): ViewModel<T>
    isViewModel(ins: any): boolean
  }

  export const ViewModel: ViewModelConstructor

  export function storeViewModelCreator<T, K, U extends Store<K>> (mods: Array<ViewModelDesc<T> | ViewModel<T>>, store: U): U

  // storeCollectionCreator
  interface CollectionJSON<T> {
    models: T[]
    toDelete: T[]
    toUpdate: T[]
    toCreate: T[]
  }

  interface CollectionDesc<T> {
    name: string
    primaryKey: string
    scheduler(action: ActionDesc, col: Collection<T>, next: StoreNext): void
  }

  interface Collection<T> {
    reset(mods: T[]): Collection<T>
    remove(keyOrMod: string): Collection<T>
    remove(keyOrMod: number): Collection<T>
    remove(keyOrMod: T): Collection<T>
    update(primaryValue: number, props: object): Collection<T>
    update(primaryValue: string, props: object): Collection<T>
    add(mod: T): Collection<T>
    sort(compare: (a: T, b: T) => number): Collection<T>
    at(index: number): T | null
    last(): T | null
    find(filter: object): T | null
    toString(): string
    toJSON(): CollectionJSON<T>
  }

  interface CollectionConstructor {
    new<T>(primaryKey: string, mods?: T[]): Collection<T>
  }

  export const Collection: CollectionConstructor

  export function storeCollectionCreator<T, K, U extends Store<K>> (desc: CollectionDesc<T>, store: U): U
}


