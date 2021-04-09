import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Buttons from '../buttons/Buttons';
import styles from './styles'

export default function Main() {
  const [text, setText] = useState('0');
  const [memory, setMemory] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [percent, setPercent] = useState('');
  const [lastNum, setLastNum] = useState('');
  const reg = new RegExp(/[\+\-\×\÷]/);
  let arrayOfStrings: string[];
  let negative:number;
 
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
        values.reduce(function(total:number, currentValue:string, currentIndex:number, arr:string[]) {
          switch(currentValue) {
            case '+': 
            case '-':
            case '×':
            case '÷':  
              return negative = currentIndex + 1;
            default: 
            break;
          }
          return negative;
        }, 0);
        if(negative === undefined) negative = 0;
        values.map(function (item, key) {     
          if (key == negative){
            if (values[key - 1] === '-') values[key - 1] = '+'
          else values[key] = (+item * -1).toString();  
          } 
        });
        setValues((state)=>[...state]);
        return;
      case '%':
        values.reduce(function(total:number, currentValue:string, currentIndex:number, arr:string[]) {
          switch(currentValue) {
            case '+': 
            case '-':
            case '×':
            case '÷':  
              return negative = currentIndex - 1;
            default: 
            break;
          }
          return negative;
        }, 0);
        console.log(negative)
        let valPercent:string[] = []
        for(let i = 0; i <= negative; i++) {
          valPercent.push(values[i]); 
        }
        setPercent(eval(valPercent.join('')));
       console.log('valPercent', valPercent)
      case '=':
        if (text === '') return
        const operator:string = (values.slice(-1).toString())
        if (operator.match(reg))return; 
        values.map(function (item, key) {
          if (item == '×') values[key] = '*'; 
          else if (item == '÷') values[key] = '/';
        });
        setValues(eval(values.join('')));
        return;
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
