import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles'

export default function Main() {
  const [text, setText] = useState('');
  const [prev, setPrev] = useState('0');
  const [memory, setMemory] = useState('0');
  const calcTable = []
  const btnCalc = ["AC","±","%","÷","mc","mr","m-","m+","7","8","9","×","4","5","6","-","1","2","3","+","0",",","="]
  btnCalc.forEach((item, key) => {
    calcTable.push(
      <TouchableOpacity
        onPress={() => setNum(item)}
        title={item}
        key={key}
        style={[styles.Item, getStyle(item)]}
      ><Text style={styles.ItemText}>{item}</Text>        
      </TouchableOpacity>
    )
  });
  function getStyle(num) {
    switch (num){
      case "AC":
      case "±":
      case "%":
        return styles.Grey;
        break;
      case "m+":
      case "÷":
      case "×":
      case "-":
      case "+":
      case "=":
        return styles.Orange
        break;
      case "0":
        return styles.bigItem
        break;
    }
  }
  
  function setNum(num) { 
    // if (num === "±") {
    //   setText((text * -1).toString());
    // } else if (num === "AC") {
    //   setText('')
    // } else if (num === ",") {
    //   if (text.includes(".")) return;
    //   setText(text + ".");
    //   return;
    // }
    // else if (num === "%"){
    //   setText((text / 100).toString());
    // }
    // else if (num === "=") {
    //   if (text == '') return;
    //   setText(String(eval(text)))
    // } 
    // else if (num === "m+") {
    //   if (memory === "0"){
    //     setMemory(text) 
    //     setText('')
    //   }
    //   let sum = Number(memory) + Number(text) 
    //   setMemory(sum)
    //   setText('')
    // } else if (num === "m-") {
    //   if (memory === "0"){
    //     setMemory((text * -1).toString());
    //     setText('')
    //   }
    //   let sum = Number(memory) - Number(text) 
    //   setMemory(sum)
    //   setText('') 
    // } else if (num === "mr") {
    //   setText(String(memory))
    // } else if (num === "mc") {
    //   setMemory('0')
    //   setText('')
    // } else setText(text + num)
    // const calcul = ''
    // const prev = parseFloat(text)
    let sum = ''
    let current = ''
    switch (num) {
      case 'AC':
        setText('')
        break
      case '+':
        console.log('setText', setText)
        setPrev(prev + (Number.parseInt(text)))
        return setText(prev + num)
        break
      case '-':
        setText(text + num)
        break
      case '*':
        setText(text + num)
        break
      case '÷':
        setText(text + num)
        break
      case '±':
        setText((text * -1).toString());
        break
      default:
        return setText(text + num)
    }
  }
 
    return (
      <View style={styles.container}>
        <Text style={styles.textInput}>{text}</Text>
        <View style={styles.itemBlock}>{calcTable}</View>
      </View>
    );
  }

