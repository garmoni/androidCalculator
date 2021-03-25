import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      minWidth: 320,
      width: '100%',
      height: '100%',
    },
    textInput: {
      padding: 10,
      color: '#fff',
      fontSize: 60,
      marginTop: 10,
      marginBottom: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '90%',
      textAlign: 'right',
    },
    itemBlock: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      alignItems:'center',
      maxWidth: '90%',
      marginTop: 0,
      marginBottom: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    Item: {
      padding: 10,
      width: 68,
      height: 68,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 34,
      backgroundColor: '#333',
      margin: 5,
    },
    ItemText: {
      fontSize: 30,
      color: '#fff',
    },
    bigItem: {
      width: '44%',
    },
    Grey: {
      backgroundColor: '#a5a5a5',
    },
    Orange: {
      backgroundColor: '#ff980c',
    }
  });

  export default styles;