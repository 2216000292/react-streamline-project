export function filterData(data) {
    // Filter your data here and return the result.
    const filteredData = data.filter(item => item.yourCondition);
    return filteredData;
  }
  
  export function anotherDataProcessingFunction(data) {
    // Another data processing function here...
  }

  export function removeZeroValuesAndEmptyObjects(data) {
    // Filter the data to remove objects that contain keys with zero values
    let filteredData = data.map(obj => {
        let newObj = {};
        for(let key in obj) {
            // Only copy the key-value pair if its values don't contain 0
            if(!obj[key].includes(0)) {
                newObj[key] = obj[key];
            }
        }
  
        // Return the new object only if it has at least one key
        return (Object.keys(newObj).length > 0) ? newObj : null;
    }).filter(Boolean); // Remove undefined and null elements
  
    return filteredData;
  }

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

  export function classifyData(data) {
    let result = {};
  
    for(let i = 0; i < data.length; i++) {
        let cValue = data[i].c;
        if(!result[cValue]) {
            result[cValue] = [];
        }
        result[cValue].push(data[i]);
    }
  
    let keys = Object.keys(result);
    keys.sort((a, b) => {
        let minXa = Math.min(...result[a].map(item => item.x));
        let minXb = Math.min(...result[b].map(item => item.x));
  
        if (minXa !== minXb) return minXa - minXb;
  
        return result[a].length - result[b].length;
    });
  
    let sortedResult = keys.map(key => [key, result[key]]);
  
    return sortedResult;
  }

  // export function calculateDerivatives(data) {
  //   return data.map(([key, values]) => {
  //     let derivatives = values.slice(0, -1).map((val, index, array) => {
  //       let slope = (values[index + 1].y - val.y) / (values[index + 1].x - val.x);
  //       return {
  //         x: val.x,
  //         y: slope,
  //         c: val.c
  //       };
  //     });
  
  //     return [derivatives];
  //   });
  // }

  // export function computeAllData(originalArray){
    
  //   // 新的数组
  //   let newArray = [];
    
  //   // 计算derivitive的函数。这里只是一个例子，你可以用你自己的计算方式来替换它
    
  //   // 遍历现有数组
  //   for(let i = 0; i < originalArray.length; i++) {
  //     let index = originalArray[i][0];
  //     let data = originalArray[i][1];
  //     let derivitive = calculateDerivatives(data);  // 计算derivitive
  //     let show = false;  // 初始设置为false，你可以按照你的需要来设定它
  //     newArray.push([index, data, derivitive, show]);
  //   }
    
  //   console.log(newArray);
  // }

  // export function calculateDerivatives(data) {
  //   let derivatives = data[1].slice(0, -1).map((val, index, array) => {
  //     let slope = (data[1][index + 1].y - val.y) / (data[1][index + 1].x - val.x);
  //     return {
  //       x: val.x,
  //       y: slope,
  //       c: val.c
  //     };
  //   });
  
  //   return [data[0], derivatives];
  // }
  export function calculateDerivatives(data) {
    let derivatives = data[1].slice(0, -1).map((val, index, array) => {
      let nextVal = data[1][index + 1];
      let diff = nextVal.x - val.x;
      if (diff > 5) {
        return null;  // or some other value that makes sense in your context
      }
      let slope = (nextVal.y - val.y) / diff;
      return {
        x: val.x,
        y: slope,
        c: val.c
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
  
    return newArray;
  }
  

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
            c: 0
        });
    }
    averageData.sort((a, b) => a.x - b.x);

    result = result.concat(averageData);
  
    return result;
}

  // export function calculateAverage(data,differentiate) {
  //   let sumMap = new Map();
  //   let countMap = new Map();
    
  //   for (let item of data) {
  //     let dataset;
  //     if(differentiate){
  //       dataset = item[2]; 
  //     }else{
  //       dataset = item[1]; 
  //     }
  //     for (let point of dataset) {
  //       if(!item[3]){
  //         continue;
  //       }
  //       if (sumMap.has(point.x)) {
  //         sumMap.set(point.x, sumMap.get(point.x) + point.y);
  //         countMap.set(point.x, countMap.get(point.x) + 1);
  //       } else {
  //         sumMap.set(point.x, point.y);
  //         countMap.set(point.x, 1);
  //       }
  //     }
  //   }
  
  //   // Calculate average points
  //   let averageData = [];
  //   for (let [key, value] of sumMap) {
  //     averageData.push({
  //       x: key,
  //       y: value / countMap.get(key),
  //       c: 0
  //     });
  //   }
  //   averageData.sort((a, b) => a.x - b.x);
  
  //   //Append original data and average data
  //   let result = [];
  //   for (let item of data) {
  //     let values;
  //     if(differentiate){
  //       values = item[2]; 
  //     }else{
  //       values = item[1]; 
  //     }
  //     result = result.concat(values);
  //   }
  //   result = result.concat(averageData);
  
  //   return result;
  // }
  


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
