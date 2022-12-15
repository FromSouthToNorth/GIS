import {inject, provide, reactive, readonly as defineReadonly} from "vue";

const key = Symbol();

export function useAppProviderContext(context) {
  return useContext(key);
}

export function createContext(context, key, options) {
  const {readonly = true, createProvider = false, native = false} = options;
  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);

  return {
    state,
  };
}

export function useContext(key, defaultValue) {
  return inject(key, defaultValue || {});
}

export function useDesign(scope) {
  const values = useAppProviderContext();
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
