import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  Text,
  View,ScrollView,TouchableHighlight, Modal
} from 'react-native';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles.js'
import firebase from 'firebase'
import fireApp from './firebase.js'
import FormView from './Form.js'
export  default class ModalExample extends Component {


  constructor(props){
    super(props);
    this.itemsRef = this.getRef().child('recipes');
    this.state = {
      formData:{},
      modalVisible: false,
    }
  }
  getRef() {
    return fireApp.ref()
  }

  addMeal(){
    var value = this.state.formData
    if(value){

      this.itemsRef.push({
        title: value.mealName,
        day: value.day
      })
  this.setModalVisible(!this.state.modalVisible)
    }
  }

  handleFormChange(formData){

    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){

  }
  openTermsAndConditionsURL(){

  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={{marginTop: 22}}>
                    <View>
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

                      <TouchableHighlight style={styles.button} onPress={() => {

                        this.addMeal(this.state.formData)
                      }}
                      underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Save</Text>
                      </TouchableHighlight>

                      <TouchableHighlight style={styles.button} onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)

                      }} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Exit</Text>
                      </TouchableHighlight>



                    </View>
                   </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}
