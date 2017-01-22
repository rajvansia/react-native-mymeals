/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  NavigatorIOS,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import GroceryList from './Components/GroceryList/index'
import WeekMeals from './Components/WeekMeals/index'
import MealLibrary from './Components/MealLibrary/index'
import Landing from './Components//Landing/index'
import styles from './styles.js'
import globals from './globals.js'
import t from 'tcomb-form-native'
import Project from './Project.js'
import firebase from 'firebase'
import fireApp from './firebase.js'
import FormView from './Form.js'
import ModalExample from './ModalExample.js'
// const firebaseConfig = {
//     apiKey: "AIzaSyDXFXVYCirwgTnUIW98wMF5s52bI6AahDo",
//     authDomain: "foodtracker-4c72f.firebaseapp.com",
//     databaseURL: "https://foodtracker-4c72f.firebaseio.com",
//     storageBucket: "foodtracker-4c72f.appspot.com",
//     messagingSenderId: "23826452842"
//   };
//  const firebaseApp = firebase.initializeApp(firebaseConfig);
//  const fireApp = firebaseApp.database();
var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  meal: t.String,
  day: t.list(t.String),               // a required number
});

var options = {}; // optional rendering options (see documentation)
export default class MyMeals extends Component{

  constructor(){
    super();
    this.state = {
    pass:'bigwo',
    value:{
    meal: "fda",

  }}
  this.itemsRef = this.getRef().child('recipes');
  }

  getRef() {
    return fireApp.ref();
  }

  _loginScreen(){
    this.setState({pass: 'bigtwo'})
  }
  clearForm(){
    this.setState({value: null})
  }

  onChange(value){
    this.setState({value: value})
  }
  addMeal(){
    var value = this.refs.form.getValue();
    if(value){
    this.clearForm(this)

      this.itemsRef.push({
        title: value.meal,
        day: value.day
      })
    AlertIOS.prompt(
    "jiji",
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: value.meal,

        },
      ],
      'plain-text'
    );
    }
  }
render(){
    switch(this.state.pass){
    case 'bigtwo':
        return (
        <Landing/>
      );
      default:
        return (
          <View>

          <TouchableOpacity
          onPress={() => { this._loginScreen() }}>
          <Text style={styles.description}>
          Login
          {this.state.pass}

          </Text>

          </TouchableOpacity>
          <Form
          ref= "form"
          type={Person}
          value={this.state.value}
          onchange={this.onChange.bind(this)}
          options={options}

        />
        <TouchableHighlight style={styles.button} onPress={this.addMeal.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        </View>
        );}

}}

//
// const styles = StyleSheet.create({
//
//       description: {
//           fontSize: 80,
//           backgroundColor: 'white',
//           color: 'red',
//           margin: 80
//       },
//       container: {
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center'
//       }
//
// })



AppRegistry.registerComponent('MyMeals', () => MyMeals);
