/*
: This function filters out objects from the input data that contain keys with zero values. 
It also removes empty objects from the data, returning a new array that contains only the objects with at least one non-zero value.
*/
export function removeZeroValuesAndEmptyObjects(data) {
  let filteredData = data.map(obj => {
      let newObj = {};
      for(let key in obj) {
          if(!obj[key].includes(0)) {
              newObj[key] = obj[key];
          }
      }
      return (Object.keys(newObj).length > 0) ? newObj : null;
  }).filter(Boolean); // Remove undefined and null elements

  return filteredData;
}


/*
This function finds the minimum values for each object in the input data. It goes through each object, finds the minimum value among its properties, 
and then pushes an object containing this minimum value and the index of the object into the result array.
*/
export function findMinimums(data) {
  let result = [];

  data.forEach((obj, index) => {
    Object.keys(obj).forEach((key) => {
      let minimum = Math.min(...obj[key]);
      result.push({
        "x": index,
        "y": minimum,
        "c": Number(key)+1,
      });
    });
  });

  return result;
}


/*
 This function classifies the input data by the 'c' property of each element. 
 It creates a new object where the keys are the unique 'c' values and the values are arrays of elements that 
 have the same 'c' value. The result is then sorted based on the smallest 'x' value and the length of the arrays.
*/
// export function classifyData(data) {
//   let result = {};

//   for(let i = 0; i < data.length; i++) {
//       let cValue = data[i].c;
//       if(!result[cValue]) {
//           result[cValue] = [];
//       }
//       result[cValue].push(data[i]);
//   }

//   let keys = Object.keys(result);
//   keys.sort((a, b) => {
//       let minXa = Math.min(...result[a].map(item => item.x));
//       let minXb = Math.min(...result[b].map(item => item.x));

//       if (minXa !== minXb) return minXa - minXb;

//       return result[a].length - result[b].length;
//   });

//   let sortedResult = keys.map(key => [key, result[key]]);

//   return sortedResult;
// }
// export function classifyData(data) {
//   let result = {};

//   // Classify data
//   for(let i = 0; i < data.length; i++) {
//     let cValue = data[i].c;
//     if(!result[cValue]) {
//       result[cValue] = [];
//     }
//     result[cValue].push(data[i]);
//   }

//   function hslToHex(h, s, l) {
//     l /= 100;
//     const a = s * Math.min(l, 1 - l) / 100;
//     const f = n => {
//       const k = (n + h / 30) % 12;
//       const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
//       return Math.round(255 * color).toString(16).padStart(2, '0'); // Convert to Hex and pad with 0 if needed
//     };
//     return `#${f(0)}${f(8)}${f(4)}`;
//   }

//   // Calculate average y and add to each item
//   for(let cValue in result) {
//     // Calculate average
//     let sum = 0;
//     let count = result[cValue].length;
//     for(let item of result[cValue]) {
//       sum += item.y;
//     }
//     let avg = sum / count; 

//     // Add avg to each item
//     for(let i = 0; i < result[cValue].length; i++) {
//       let item = result[cValue][i];
//       item.avg = avg;
      
//       // Assign a distinct color to each item
//       let hue = Math.floor((i / result[cValue].length) * 360);
//       item.color = hslToHex(hue, 100, 50);
//     }
//   }

//   // Sort the keys
//   let keys = Object.keys(result);
//   keys.sort((a, b) => {
//     let minXa = Math.min(...result[a].map(item => item.x));
//     let minXb = Math.min(...result[b].map(item => item.x));

//     if (minXa !== minXb) return minXa - minXb;

//     return result[a].length - result[b].length;
//   });

//   let sortedResult = keys.map(key => [key, result[key]]);

//   // console.log("当前测试",sortedResult);
//   return sortedResult;
// }
// const colors = [
//   "#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#00FFFF", "#000000",
//   "#800000", "#008000", "#000080", "#800080", "#008080", "#808080",
//   "#C00000", "#00C000", "#0000C0", "#C000C0", "#00C0C0", "#C0C0C0",
//   "#400000", "#004000", "#000040", "#400040", "#004040", "#404040",
//   "#200000", "#002000", "#000020", "#200020", "#002020", "#202020",
//   "#600000", "#006000", "#000060", "#600060", "#006060", "#606060",
//   "#A00000", "#00A000", "#0000A0", "#A000A0", "#00A0A0", "#A0A0A0",
//   "#E00000", "#00E000", "#0000E0", "#E000E0", "#00E0E0", "#E0E0E0",
//   "#100000", "#001000", "#000010", "#100010", "#001010", "#101010"
// ];
// export function classifyData(data) {
//   let result = {};
//   let colorIndex = 0;

//   // Classify data
//   for(let i = 0; i < data.length; i++) {
//     let cValue = data[i].c;
//     if(!result[cValue]) {
//       result[cValue] = [];

//       // Assign a distinct color to each cValue
//       result[cValue].color = colors[colorIndex++ % colors.length];
//     }
//     result[cValue].push(data[i]);
//   }

//   // Calculate average y and add to each item
//   for(let cValue in result) {
//     // Calculate average
//     let sum = 0;
//     let count = result[cValue].length;
//     for(let item of result[cValue]) {
//       sum += item.y;
//     }
//     let avg = sum / count;

//     // Add avg and distinct color to each item
//     for(let item of result[cValue]) {
//       item.avg = avg;
//       item.color = result[cValue].color;
//     }
//   }

//   // Sort the keys
//   let keys = Object.keys(result);
//   keys.sort((a, b) => {
//     let minXa = Math.min(...result[a].map(item => item.x));
//     let minXb = Math.min(...result[b].map(item => item.x));

//     if (minXa !== minXb) return minXa - minXb;

//     return result[a].length - result[b].length;
//   });

//   let sortedResult = keys.map(key => [key, result[key]]);

//   // console.log("当前测试",sortedResult);
//   return sortedResult;
// }
export function classifyData(data) {
  let result = {};

  // Classify data
  for(let i = 0; i < data.length; i++) {
    let cValue = data[i].c;
    if(!result[cValue]) {
      result[cValue] = [];
    }
    result[cValue].push(data[i]);
  }

  // Calculate average y and add to each item
  for(let cValue in result) {
    // Calculate average
    let sum = 0;
    let count = result[cValue].length;
    for(let item of result[cValue]) {
      sum += item.y;
    }
    let avg = sum / count; 

    // Add avg to each item
    for(let item of result[cValue]) {
      item.avg = avg;
    }
  }

  // Sort the keys
  let keys = Object.keys(result);
  keys.sort((a, b) => {
    let minXa = Math.min(...result[a].map(item => item.x));
    let minXb = Math.min(...result[b].map(item => item.x));

    if (minXa !== minXb) return minXa - minXb;

    return result[a].length - result[b].length;
  });

  let sortedResult = keys.map(key => [key, result[key]]);

  // console.log("当前测试",sortedResult);
  return sortedResult;
}



/*
This function calculates the derivative (slope) of the input data. 
It considers the differences in the 'x' and 'y' properties of each element to calculate the slope. 
If the difference in 'x' values is more than 5, it skips the calculation for that pair.
*/
export function calculateDerivatives(data) {
  let derivatives = data[1].slice(0, -1).map((val, index, array) => {
    let nextVal = data[1][index + 1];
    let diff = nextVal.x - val.x;
    if (diff > 5) {
      return null;  
    }
    let slope = (nextVal.y - val.y) / diff;
    return {
      x: val.x,
      y: slope,
      c: val.c,
      avg: val.avg
    };
  }).filter(item => item !== null);  // remove null values from array
  
  return [data[0], derivatives];
}
  
export function transformArray(originalArray) {
  let newArray = [];

  for(let i = 0; i < originalArray.length; i++) {
    let item = originalArray[i];
    let [index, derivatives] = calculateDerivatives(item);
    let show = true; 
    newArray.push([index, item[1], derivatives, show]);
  }

  // console.log("当前测试2",newArray);
  return newArray;
}
  
/*
This function calculates the average 'y' value for each unique 'x' value in the input data. 
If the differentiate parameter is true, it uses the derivatives of the data; otherwise, 
it uses the original data. It also adds these average points to the original data.

The expected input should be an array composed of [index, regular data array , derivative data array, _ ].
*/
export function calculateAverage(data, differentiate) {
  let sumMap = new Map();
  let countMap = new Map();
  let result = [];
  
  for (let item of data) {
      if (!item[3]) continue;  // If the boolean value is not true, skip this iteration
      
      let dataset = differentiate ? item[2] : item[1];
      result = result.concat(dataset);
      
      for (let point of dataset) {
          if (sumMap.has(point.x)) {
              sumMap.set(point.x, sumMap.get(point.x) + point.y);
              countMap.set(point.x, countMap.get(point.x) + 1);
          } else {
              sumMap.set(point.x, point.y);
              countMap.set(point.x, 1);
          }
      }
  }

  // Calculate average points
  let averageData = [];
  for (let [key, value] of sumMap) {
      averageData.push({
          x: key,
          y: value / countMap.get(key),
          c: -100
      });
  }
  averageData.sort((a, b) => a.x - b.x);

  result = result.concat(averageData);

  return result;
}


/*
 This function finds the minimum and maximum 'x' and 'y' values in the input data. 
 If the differentiate parameter is true, it finds these values based on the derivatives of the data; otherwise, 
 it uses the original data. It returns an array that contains the minimum and maximum 'x' and 'y' values.

  The expected input should be an array composed of [index, regular data array , derivative data array, _ ].
*/
export function findMinMax(data,differentiate) {
  let minX, minY, maxX, maxY;

  data.forEach((dataItem) => {

    const arr = differentiate ? dataItem[2] : dataItem[1];

      for (const obj of arr) {
          if (minX === undefined || obj.x < minX) {
              minX = obj.x;
          }
          if (maxX === undefined || obj.x > maxX) {
              maxX = obj.x;
          }
          if (minY === undefined || obj.y < minY) {
              minY = obj.y;
          }
          if (maxY === undefined || obj.y > maxY) {
              maxY = obj.y;
          }
      }
  });

  return [
      minX,
      maxX,
      minY,
      maxY,
  ];
}
