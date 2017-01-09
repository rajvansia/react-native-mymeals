import React,{Component} from 'react';
import{ StyleSheet} from 'react-native'

const globals = StyleSheet.create({
  flex: {
    flex: 1
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lightText: {
    color: 'white'
  },
  h2: {
    fontSize: 30,
    color: 'blue',
    fontWeight: '700',
  },
  h4: {
    fontSize: 20
  },
  h5: {
    fontSize: 16
  },
  pv1: {
    paddingVertical: 10
  },
  ph1: {
    paddingHorizontal: 10
  },
  pa1: {
    padding: 10
  },
  pa2: {
    padding: 20
  },
  ph2: {
    paddingHorizontal: 20
  },
  ma1: {
    margin: 10
  },
  mt1: {
    marginTop: 10
  },
  mv2: {
    marginVertical: 20
  },
  mb1: {
    marginBottom: 10
  },
  mr1: {
    marginRight: 10
  },
  mh1: {
    marginHorizontal: 10
  },
  mh2: {
    marginHorizontal: 20
  },
  mv1: {
    marginVertical: 10
  },
  mb2: {
    marginBottom: 20
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  largeButtonText: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white'
  },
  brandPrimary: {
    backgroundColor: 'black'
  },
  primaryText: {
    color: 'black'
  },
  inactive: {
    backgroundColor: 'black'
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
  },
  lightDivider: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  textContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  centerText: {
    textAlign: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  centeredRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }});

  module.exports = globals
