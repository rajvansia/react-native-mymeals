/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  NavigatorIOS,
  View,
} from 'react-native';
import fireApp from '../../firebase.js'
export default class MealDetail extends Component {
  constructor(props) {
      super(props);

      this.itemsRef = this.getRef().child('new');
    }

    getRef() {
      return firebaseApp.database().ref();
    }
  render() {

       var rowData = this.props.rowData;
       var title = (typeof rowData.meal.title !== 'undefined') ? rowData.meal.title : '';
       var imageURI = (typeof rowData.meal.image !== 'undefined') ? rowData.meal.image : '';
       var description = (typeof rowData.meal.description !== 'undefined') ? rowData.meal.description : '';

       contents = rowData.meal.ingredients.map(function (item) {
           return (
             <View>
               <Text>{item.name}</Text>
             </View>
           );
        });
      return(
        <View style={styles.container}>
        <Text style={styles.title}>
        {title}
        </Text>
          <Image style={styles.image} source={{uri: imageURI}}/>
          <Text style={styles.description}>
          {description}
          </Text>
          <Text style={styles.ingredientsTitle}>
          Ingredients
          </Text>
          <View>
            {contents}
          </View>
        </View>
      )
}
}
const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center'
  },
  title:{
    fontSize: 30,
  },
  ingredientsTitle:{
    fontSize: 20,
  },
  image: {
    width: 107,
    height: 165,
    padding: 10
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565'
  }
});
