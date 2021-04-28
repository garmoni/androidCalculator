import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      maxWidth: 375,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    textInput: {
      padding: 5,
      overflowY: 'hidden',
      marginTop: 20,
      display: 'flex',
      alignItems: 'center',
      height: 95,
      justifyContent: 'center',
    },
    text: {
      color: '#fff',
      width: '100%',
      textAlign: 'right',
      whiteSpace: 'nowrap', 
    },
  });

  export default styles;
  