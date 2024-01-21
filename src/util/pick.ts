const pick = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[]
): Pick<T, K> => {
  return keys.reduce((obj, key) => {
    if (object && object[key] !== "") {
      obj[key] = object[key];
    }

    return obj;
  }, {} as Pick<T, K>);
};

export default pick;
