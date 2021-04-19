import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Buttons from '../buttons/Buttons';
import styles from './styles'

export default function Main() {
  const [text, setText] = useState('0');
  const [memory, setMemory] = useState('');
  const [values, setValues] = useState<string[]>(['0']);
  const reg = new RegExp(/^[\+\-\×\÷]$/);
  const regOperator = ['+', '-', '×', '÷']
  let lastNumber:number;

  function getStyleText(values: string[]) {
    if (values.length < 12 && values?.[0].length < 12) return 50
    else if ((values.length >= 12 && values.length <= 17)||(values?.[0].length >= 12 && values?.[0].length <= 17)) return 40
    else if ((values.length > 17 && values.length < 22)||(values?.[0].length >17 && values?.[0].length <22)) return 32
    else if (values.length >= 22) return 24
  }

  function findLastOperator(arr:string[]) {
    for(let i = arr.length; i > 0; i--){
      if(regOperator.includes(arr[i]))
      return i
    }
  } 

  function changeOperator() {
    values.map(function (item, key) {
      if (item == '×') values[key] = '*'; 
        else if (item == '÷') values[key] = '/';
      });
      return values;
  }

  function setLongPress(num: string) {
    if (num === 'AC') {
      setValues(['0'])
      setText('0')
    } 
    return;
  }

  function setNum(num: string) {
    switch(num) {
      case '+': 
      case '-':
      case '×':
      case '÷':
        const lastSymbol:string = (values.slice(-1).toString())
        if(!lastSymbol) return;
        if (lastSymbol.match(reg))return; 
        else {
           setValues((state)=>[...state,num])
          setText('');
          return;
        } 
      case 'AC': 
        if(!values) return
        if(values.length-1 === 0) { 
          setValues(['0']); setText('0');
          return;
        }
        setValues(values.slice(0,values.length-1));
        setText(text.substring(0,text.length-1));
        return;
      case '±':
        lastNumber = findLastOperator(values);
        if(!lastNumber) {
          setValues([(+text * -1).toString()]);
          setText((+text * -1).toString())
          return;
        }
        values.map(function (item, key) {     
          console.log(lastNumber)
          if (key == lastNumber + 1){
            if (values[key - 1] === '-') values[key - 1] = '+'
          else values[key] = (+item * -1).toString();  
          } 
        });
        setValues((state)=>[...state]);
        break;
      case '%':
        lastNumber = findLastOperator(values);
        const procent = (+text / 100).toString()
        if(!lastNumber) { 
          setValues(()=>[procent]);
          setText(procent)
          return;
        }
        changeOperator()
        let valPercent:string[] = values.slice(0, lastNumber)
        const resultPersent = eval(eval(valPercent.join('')) + values[lastNumber] + procent).toString();
        return setValues(()=>[resultPersent]);
      case 'mc': 
        setMemory('0');
        setValues(['0']);
        setText('0');
        return;
      case 'mr':
        setValues((state)=>[...state, memory]);
        setText(memory);
        return;
      case 'm-':  
        if (memory === '0'){
          setMemory((+text * -1).toString()) 
          setValues([]);
          setText('0');
        }
        setMemory((+memory - +text).toString())
        setValues(['0']);
        setText('0');
        return;
      case 'm+': 
        if (memory === '0'){
          setMemory(text) 
          setValues([]);
          setText('');
        }
        setMemory((+memory + +text).toString())
        setValues(['0']);
        setText('0');
        return;
      case '=':
        if (text === '') return
        const operator:string = (values.slice(-1).toString())
        if (operator.match(reg))return; 
        changeOperator()
        const result = (eval(values.join('')));
        setValues(()=>[parseFloat(result.toFixed(2)).toString()]);
        setText(parseFloat(result.toFixed(2)).toString());
        break;
      case ',':
        if (text.includes('.')) return;
        setText(text + '.');
        setValues((state)=>[...state, '.'])
        return;
      default: 
        if (text === '0' && num != ','){
          setText(num);
          setValues([]);
        } else setText(text + num)
        setValues((state)=>[...state,num]);
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <Text style={[styles.text, {fontSize:getStyleText(values)}]}>{values}</Text>
      </View>
      <Buttons setNum={setNum} setLongPress={setLongPress} />
    </View>
  );
}
