import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/colors';


export const NumberContainer = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    borderColor: Colors.accent,
    borderWidth: 2,
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
    width: 60
  },
  text: {
    color: Colors.accent,
    fontSize: 20,
    fontWeight: '600',
  }
})