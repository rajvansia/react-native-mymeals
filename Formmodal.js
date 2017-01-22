import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  Text,
  View,ScrollView,TouchableHighlight, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles.js'
import firebase from 'firebase'
import fireApp from './firebase.js'

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

export default class FormView extends Component{
  constructor(props){
    super(props);
    this.itemsRef = this.getRef().child('recipes');
    this.state = {
      formData:{}
    }
  }
  getRef() {
    return fireApp.ref();
  }

  addMeal(){
    var value = this.state.formData
    if(value){

      this.itemsRef.push({
        title: value.mealName,
        day: value.day
      })
    AlertIOS.prompt(
    "ffefe",
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: value.mealName,

        },
      ],
      'plain-text'
    );
    }
  }

  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){
    //console.log(e, component);
  }
  openTermsAndConditionsURL(){

  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render(){
    return (<ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:10,paddingRight:10, height:200}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />
        <InputField
          ref='mealName'
          label='Meal Name'
          placeholder='Pasta'
          helpText={((self)=>{

            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.registrationForm.refs.mealName.valid){
                return self.refs.registrationForm.refs.mealName.validationErrors.join("\n");
              }

            }
            // if(!!(self.refs && self.refs.first_name.valid)){
            // }
          })(this)}
          validationFunction={[(value)=>{
            /*
            you can have multiple validators in a single function or an array of functions
             */

            if(value == '') return "Required";
            //Initial state is null/undefined
            if(!value) return true;
            // Check if First Name Contains Numbers
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "First Name cant contain numbers";
            }

            return true;
          }, (value)=>{
            ///Initial state is null/undefined
            if(!value) return true;
            if(value.indexOf('4')!=-1){
              return "I cant stand number 4";
            }
            return true;
          }]}
          />

        <PickerField ref='day'
          label='Day'
          options={{
            "": '',
            Monday: 'Monday',
            Tuesday: 'Tuesday',
            Wednesday: 'Wednesday',
            Thursday: 'Thursday',
            Friday: 'Friday',
            Saturday: 'Saturday',
            Sunday: 'Sunday',
          }}/>

        </Form>
        <Text>{JSON.stringify(this.state.formData)}</Text>
        <TouchableHighlight style={styles.button} onPress={this.addMeal.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
      </ScrollView>);
    }
  }
