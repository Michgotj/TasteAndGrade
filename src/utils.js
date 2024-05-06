export const isValidParsed = (object) => {
    return object && Array.isArray(object) && object.length > 0;
  };