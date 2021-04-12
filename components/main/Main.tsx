import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Buttons from '../buttons/Buttons';
import styles from './styles'

export default function Main() {
  const [text, setText] = useState('0');
  const [memory, setMemory] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const reg = new RegExp(/[\'+'\'-'\'×'\'÷']/);
  const regOperator = ['+', '-', '×', '÷']
  let lastNumber:number;

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

  function setNum(num: string) {
    switch(num) {
      case '+': 
      case '-':
      case '×':
      case '÷':
        const lastSymbol:string = (values.slice(-1).toString())
        if(!lastSymbol) return;
        switch(lastSymbol) {
          case '+': 
          case '-':
          case '×':
          case '÷':
          case '.':
            return;
          default: 
          setValues((state)=>[...state,num])
          setText('');
          return;
        }   
      case 'AC': 
        setValues([]);
        setText('');
        return;
      case '±':
        if (text === '')return;
        lastNumber = findLastOperator(values);
        if(lastNumber == undefined) return setValues([(+text * -1).toString()])
        values.map(function (item, key) {     
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
        if(lastNumber == undefined) return setValues(()=>[procent]);
        changeOperator()
        let valPercent:string[] = values.slice(0, lastNumber)
        const resultPersent = eval(eval(valPercent.join('')) + values[lastNumber] + procent).toString();
        return setValues(()=>[resultPersent]);
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
          setText(num)
        } else  setText(text + num)
        setValues((state)=>[...state,num]);
      return;
    }
  
    //  if (num === 'mc') {
    //    setMemory('0');
    //    setText('0');
    //    return;
    //  }
    //  if (num === 'mr') {
    //    setText(memory)
    //    return;
    //  }
    //  if (num === 'm-') {
    //    if (memory === 0){
    //      setMemory((parseFloat(text)  -1).toString()) 
    //      setText('0')
    //    }
    //    setMemory(parseFloat(memory) - parseFloat(text))
    //    setText('0')
    //    return;
    //  }
    //  if (num === 'm+') {
    //    if (memory === 0){
    //      setMemory(text) 
    //      setText('0')
    //    }
    //    setMemory(parseFloat(memory) + parseFloat(text))
    //    setText('0')
    //    return;
    //  }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textInput}>{values}</Text>
      <Buttons setNum={setNum} />
    </View>
  );
}
