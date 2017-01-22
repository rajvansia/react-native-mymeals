import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableHighlight,
  ListView,
  Image,
  View
} from 'react-native';
import styles from './styles.js'
import MealDetail from '../Common/MealDetail.js'
import fireApp from '../../firebase.js'

export default class LibraryList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        })
      };
      this.itemsRef = this.getRef().child('meals');
      this.starCountRef = this.getRef().child('meals');

    }

    getRef() {
      return fireApp.ref();
    }

    listenForItems(itemsRef) {
      itemsRef.on('value', (snap) => {

        // get children as an array
        var meals = [];
        snap.forEach((child) => {
          meals.push({
            title: child.val().title,
            day: child.val().day,
            image: child.val().image,
            cuisine: child.val().cuisine,

            _key: child.key
          });
        });

        this.setState({

            dataSourcej: this.state.dataSource.cloneWithRows(meals)
        });


      });
    }

    listenItems(starCountRef) {
      starCountRef.on('value', (snap) => {

        // get children as an array
        var ing = [];
        snap.forEach((child) => {
          ing.push({
            day: child.val().day,
            _key: child.key,
            recipes: child.val().recipes,

          });
        });
        this.setState({

            dataSource: this.state.dataSource.cloneWithRows(ing)
        });

      });
    }

    componentDidMount() {
      this.listenForItems(this.itemsRef);
      this.listenItems(this.starCountRef);
    }

  renderRow(rowData, sectionID, rowID){

    return(
      <TouchableHighlight >
      <View>
      <Text style={styles.day}>

             {rowData._key}
             {rowData.day}

      </Text>
      <View style={styles.container}>
      </View>
      <View style={styles.separator}>
      </View>

      </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
    <ListView
    dataSource={this.state.dataSource}
    renderRow={this.renderRow.bind(this)}

    />
    );
  }
}
