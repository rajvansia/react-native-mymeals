import React,{Component} from 'react';
import{ StyleSheet} from 'react-native'

export const styles = StyleSheet.create({

      description: {
          fontSize: 20,
          backgroundColor: 'white',
          color: 'blue',
          margin: 80
      },
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      },
      buttonText: {
          fontSize: 18,
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
      },
      button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 20,
        justifyContent: 'center'
      }

});

  module.exports = styles
