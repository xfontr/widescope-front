const mockLocalStorage = (() => {
  let store = {} as any;

  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {},
  };
})();

export default mockLocalStorage;
