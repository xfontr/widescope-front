const mockLocalStorage = (() => {
  let store = {} as any;

  return {
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
  };
})();

export default mockLocalStorage;
