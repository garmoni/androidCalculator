import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles'

export default function Buttons({ setNum }) {
    const calcTable = []
    const btnCalc = ["AC","±","%","÷","mc","mr","m-","m+","7" ,"8" ,"9" ,"×","4" ,"5" ,"6" ,"-","1" ,"2" ,"3" ,"+","0" ,",","="]
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
        case "0" :
          return styles.bigItem
          break;
      }
    }
    return (
        <View style={styles.itemBlock}>{calcTable}</View>
      );
}