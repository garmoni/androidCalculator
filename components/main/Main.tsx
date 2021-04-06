import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Buttons from '../buttons/Buttons';
import styles from './styles'

export default function Main() {
  const [text, setText] = useState('');
  const [memory, setMemory] = useState('');
  const [values, setValues] = useState<string[]>([]);
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
        }, 10);
        if(negative === undefined) negative = 0;
        values.map(function (item, key) {     
          if (key == negative){
            if (values[key - 1] === '-') values[key - 1] = '+'
          else values[key] = (+item * -1).toString();  
          } 
        });
        return;
      case '%':
        setText((+text / 100).toString());
        return;
      case '=':
        if (text === '') return
        const operator:string = (values.slice(-1).toString())
        switch(operator) {
          case '+': 
          case '-':
          case '×':
          case '÷':
            return;
          default: 
          values.map(function (item, key) {
            if (item == '×') values[key] = '*'; 
            else if (item == '÷') values[key] = '/';
          });
          console.log(values)
          setValues(eval(values.join('')));
          return;
        }
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
        console.log('values', values)
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
