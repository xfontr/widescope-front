const mockLocalStorage = (() => {
  return {
    setItem(key: string, value: string) {},
    clear() {},
  };
})();

export default mockLocalStorage;
