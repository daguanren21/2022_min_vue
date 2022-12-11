import { Target } from "./reactive";

const get = createGetter();
const set = createSetter();
function createGetter() {
  return function get(target: Target, key: string | symbol, receiver: object) {
    return Reflect.get(target, key, receiver);
  };
}
function createSetter() {
  return function set(target: Target, key: string | symbol, receiver: object) {
    return Reflect.set(target, key, receiver);
  };
}
export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
};
