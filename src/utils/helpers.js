export const convertStringValuesToObjects = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    //  array or object
    if (
      typeof obj[key] === "string" &&
      (obj[key].startsWith("{") || obj[key].startsWith("["))
    ) {
        // to Handle Exception when JSON.parse() fails
        try {
            newObj[key] = JSON.parse(obj[key]);
        }
        catch (e) {
            newObj[key] = obj[key];
        }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      convertStringValuesToObjects(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
