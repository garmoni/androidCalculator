import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    itemBlock: {
     display: 'flex',
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-around',
     flexWrap: 'wrap',
     width: '100%',
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
      margin: '1%',
    },
    ItemText: {
      fontSize: 30,
      color: '#fff',
    },
    bigItem: {
      width: '46%',
      alignItems: 'flex-start',
      paddingLeft: 25,
    },
    Grey: {
      backgroundColor: '#a5a5a5',
    },
    Orange: {
      backgroundColor: '#ff980c',
    }
  });

  export default styles;