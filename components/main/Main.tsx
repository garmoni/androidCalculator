import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Buttons from '../buttons/Buttons';
import { getStyleText, findLastOperator, changeOperator } from './../operations/Operations';
import styles from './styles'

export default function Main() {
  const [text, setText] = useState('0');
  const [memory, setMemory] = useState('0');
  const [values, setValues] = useState<string[]>(['0']);
  const [result, setResult] = useState<number | null>(null);
  const reg = new RegExp(/^[\+\-\×\÷]$/);
  let lastNumber = findLastOperator(values);
  const operator: string = (values.slice(-1).toString())

  useEffect(() => {
    if (result !== null){
      setValues(() => [parseFloat(result.toFixed(2)).toString()]);
      setText(parseFloat(result.toFixed(2)).toString());
    }    
}, [result]);

  const setLongPress = (num: string) => {
    if (num === 'AC') {
      setValues(['0'])
      setText('0')
    }
    return;
  }

  const setNum = (num: string) => {
    switch (num) {
      case '+':
      case '-':
      case '×':
      case '÷':
        const lastSymbol: string = (values.slice(-1).toString())
        if (!lastSymbol) return;
        if (lastSymbol.match(reg)) return;
        else {
          setValues((state) => [...state, num])
          setText('');
          return;
        }
      case 'AC':
        if (!values) return
        if (values.length - 1 === 0) {
          setValues(['0']); setText('0');
          return;
        }
        setValues(values.slice(0, values.length - 1));
        setText(text.substring(0, text.length - 1));
        break;
      case '±':
        if (!lastNumber) {
          setValues([(+text * -1).toString()]);
          setText((+text * -1).toString())
          return;
        }
        values.map(function (item, key) {
          if (key == lastNumber + 1) {
            if (values[key - 1] === '-') values[key - 1] = '+'
            else values[key] = (+item * -1).toString();
          }
        });
        setValues((state) => [...state]);
        break;
      case '%':
        const procent = (+text / 100).toString()
        if (!lastNumber) {
          setValues(() => [procent]);
          setText(procent)
          return;
        }
        changeOperator(values)
        let valPercent: string[] = values.slice(0, lastNumber)
        const resultPersent = eval(eval(valPercent.join('')) + values[lastNumber] + procent).toString();
        return setValues(() => [resultPersent]);
      case 'mc':
        setMemory('0');
        break;
      case 'mr':
        setValues([memory]);
        setText(memory);
        break;
      case 'm-':
        if (memory === '0') setMemory((+text * -1).toString())
        else {
          setMemory(eval(memory + (+text * -1)).toString())
        }
        break;
      case 'm+':
        if (memory === '0') { setMemory(text); console.log('memory', memory) }
        else {
          setMemory(eval(memory + '+' + text).toString())
          console.log('memory', memory)
        }
        break;
      case '=':
        if (text === '0') return
        if (operator.match(reg)) return;
        changeOperator(values)
        setResult(eval(values.join('')));
        break;
      case ',':
        if (text.includes('.')) return;
        setText(text + '.');
        setValues((state) => [...state, '.'])
        break;
      default:
        console.log('operator.match(reg)', operator.match(reg))
        if (text === '0' && num != ',') {
          setText(num);
          setValues([]);
        } else if (result !== null && !operator.match(reg)) {
          setText(num);
          setValues([]);
          setResult(null)
        }
        else setText(text + num);
        setValues((state) => [...state, num]);
        return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <Text style={[styles.text, { fontSize: getStyleText(values) }]}>{values}</Text>
      </View>
      <Buttons setNum={setNum} setLongPress={setLongPress} />
    </View>
  );
}
