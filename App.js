
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Main from './components/main/Main';

export default function App() {
  return (
    <View style={styles.Main}>
      <StatusBar style="light" />
      <Main />
    </View>
  );
}
const styles = StyleSheet.create({
  Main : {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  }
})
