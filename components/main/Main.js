import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Buttons from '../buttons/Buttons';
import styles from './styles'

export default function Main() {
  const [text, setText] = useState('0');
  const [prev, setPrev] = useState(null);
  const [action, setAction] = useState(null)
  const [memory, setMemory] = useState('0');

  function isAction() {
    if (action === '+'){
      setPrev((prev + parseFloat(text)))
    }
    if (action === '-'){
      setPrev((prev - parseFloat(text)))
    }
    if (action === '×'){
      setPrev((prev * parseFloat(text)))
    }
    if (action === '÷'){
      setPrev((prev / parseFloat(text)))
    }
    if (!action) setPrev(parseFloat(text));
  }

  function setNum(num) {
    if (num === 'AC') {
      setText('0');
      setAction(null)
      setPrev(null)
      return;
    }
    if (num === '±') {
      setText((parseFloat(text) * -1));
      return;
    }
    if (num === '%') {
      setText((text / 100));
      setPrev(null)
      return;
    }
    if (num === '÷') {
      setAction('÷');
      isAction()
      setText('0');
      return;
    }
    if (num === 'mc') {
      setMemory('0');
      setText('0');
      return;
    }
    if (num === 'mr') {
      setText(memory)
      return;
    }
    if (num === 'm-') {
      if (memory === "0"){
        setMemory((parseFloat(text) * -1).toString()) 
        setText('0')
      }
      setMemory(parseFloat(memory) - parseFloat(text))
      setText('0')
      return;
    }
    if (num === 'm+') {
      if (memory === "0"){
        setMemory(text) 
        setText('0')
      }
      setMemory(parseFloat(memory) + parseFloat(text))
      setText('0')
      return;
    }
    if (num === '×') {
      setAction('×');
      isAction();
      setText('0');
      return;
    }
    if (num === '-') {
      setAction('-');
      isAction();
      setText('0');
      return;
    }
    if (num === '+') {
      setAction('+');
      isAction();
      setText('0');
      return;
    }
    if (num === ',') {
      if (text.includes(".")) return;
      setText(text + ".");
      return;
    }
    if (num === '=') {
      if (!action) return
      if (action === '+'){
        setText((prev + parseFloat(text)).toString())
      }
      if (action === '-'){
        setText((prev - parseFloat(text)).toString())
      }
      if (action === '×'){
        setText((prev * parseFloat(text)).toString())
      }
      if (action === '÷'){
        setText((prev / parseFloat(text)).toString())
      }
      setAction(null);
      setPrev(null);
      return;
    }
    console.log("text", text)
    if (text[text.length - 1] === ".") {
      setText(text + num);
    } else { 
      setText((parseFloat(parseFloat(text) + num)).toString()) 
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textInput}>{text!=0?text:action}</Text>
      <Buttons setNum={setNum} />
    </View>
  );
}