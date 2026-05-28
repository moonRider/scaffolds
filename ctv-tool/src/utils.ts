type MapLoop = Map<string | number, Map<string, any>>
type EntriesRecord = Record<string, any>

const fromEntries = <T extends any[] | MapLoop>(arrArg: T) => {
  if (Object.prototype.toString.call(arrArg) === '[object Map]') {
      const resMap: EntriesRecord = {};
      for (const key of arrArg.keys()) {
          resMap[key] = (arrArg as MapLoop).get(key);
      }
      return resMap;
  }
  if (Array.isArray(arrArg)) {
      const resArr: EntriesRecord = {};
      arrArg.map(([key, value]) => {
          resArr[key] = value;
      });
      return resArr;
  }
  throw 'Uncaught TypeError: argument is not iterable';
};

/**
 * 获取style属性配置的值
 * @param item
 */
export const getItemStyleValue = (style: any): Record<string, any> => {
  if (!style) {
      return {};
  }
  const arr = Object.entries(style).map((item: any) => {
      const [key, value] = item;
      if (value.children) {
          return [key, getItemStyleValue(value.children)];
      }
      return [key, value.value];
  });
  return fromEntries(arr);
}