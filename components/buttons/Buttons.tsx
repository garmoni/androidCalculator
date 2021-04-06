import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles'

type Props = {  setNum: Function };

export default function Buttons({ setNum }:Props) {
    const btnCalc = ["AC","±","%","÷","mc","mr","m-","m+","7" ,"8" ,"9" ,"×","4" ,"5" ,"6" ,"-","1" ,"2" ,"3" ,"+","0" ,",","="]

    function getStyle(num: string) {
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
        <View style={styles.itemBlock}>
          {btnCalc.map((item: string, key: number) => (
              <TouchableOpacity
                onPress={() => setNum(item)}
                key={key}
                style={[styles.Item, getStyle(item)]}
              >
                <Text style={styles.ItemText}>{item}</Text>        
              </TouchableOpacity>
          ))}
      </View>
      );
}
