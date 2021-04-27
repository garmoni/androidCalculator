
export const getStyleText = (values: string[]) => {
    if (values?.length < 12 && values?.[0].length < 12) return 50
    else if ((values?.length >= 12 && values?.length <= 17) || (values?.[0].length >= 12 && values?.[0].length <= 17)) return 40
    else if ((values?.length > 17 && values?.length < 22) || (values?.[0].length > 17 && values?.[0].length < 22)) return 32
    else if (values?.length >= 22) return 24
  }

  export const findLastOperator = (arr: string[]) => {
    const regOperator = ['+', '-', '×', '÷']
    for (let i = arr.length; i > 0; i--) {
      if (regOperator.includes(arr[i]))
        return i
    }
  }

  export const changeOperator = (values:string[]) => {
    values.map(function (item, key) {
      if (item == '×') values[key] = '*';
      else if (item == '÷') values[key] = '/';
      return values;
    });
  }
  
