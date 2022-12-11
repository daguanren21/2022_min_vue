import { mutableHandlers } from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}
export interface Target {
  [ReactiveFlags.IS_REACTIVE]?: boolean;
  [ReactiveFlags.IS_READONLY]?: boolean;
}
//是否为只读
export function isReadonly(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY]);
}
//存储已经通过proxy代理过的对象
export const reactiveMap = new WeakMap<Target, any>();
export const shallowReactiveMap = new WeakMap<Target, any>();
export const readonlyMap = new WeakMap<Target, any>();
export const shallowReadonlyMap = new WeakMap<Target, any>();
export function reactive<T extends object>(target: T);

export function reactive(target: object) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, reactiveMap);
}

export function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  //如果用户已经用reactive进行包裹了，再次包裹的话直接将源数据返回
  //eg.  const state = reactive({ name:"zqh" }) ;
  //     const state1 = reactive(state);
  //     console.log(state===state1);
  if (!(isReadonly && target[ReactiveFlags.IS_REACTIVE])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
