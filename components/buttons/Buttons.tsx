import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles'

type Props = {  setNum: Function, setLongPress: Function };

export default function Buttons({ setNum, setLongPress }:Props) {
    const btnCalc = ["AC","±","%","÷","mc","mr","m-","m+","7" ,"8" ,"9" ,"×","4" ,"5" ,"6" ,"-","1" ,"2" ,"3" ,"+","0" ,",","="]

    const getStyle = (num: string | undefined) => {
      switch (num){
        case "AC":
        case "±":
        case "%":
          return styles.Grey;
        case "m+":
        case "÷":
        case "×":
        case "-":
        case "+":
        case "=":
          return styles.Orange
        case "0" :
          return styles.bigItem
        default:
          break;
      }
    }
    return (
        <View style={styles.itemBlock}>
          {btnCalc.map((item: string, key: number) => (
              <TouchableOpacity
                onPress={() => setNum(item)}
                onLongPress={() => setLongPress(item)}
                key={key}
                style={[styles.Item, getStyle(item)]}
              >
                <Text style={styles.ItemText}>{item}</Text>        
              </TouchableOpacity>
          ))}
      </View>
      );
}
