import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { defaultFonts } from '../constants/defaultFonts';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Button = (props) => {
  const buttonColor = props.color || 'primary'
  const buttonStyle = buttonColor === 'primary' ? styles.buttonPrimary : styles.buttonAccent;
  const fullWidthStyle = props.fullWidth ? styles.fullWidth : {};

  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...buttonStyle, ...fullWidthStyle, ...styles.button, }}>
      <View style={styles.buttonContainer}>
        {
          props.title && (
            <Text style={styles.buttonText} style={{ ...defaultFonts.bodyText, ...styles.buttonText }}>
              {props.title}
            </Text>
          )
        }
        {
          props.icon && (
            <Ionicons name={props.icon} size={24} color="white" />
          )
        }
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 13,
    minWidth: 70
  },
  buttonPrimary: {
    backgroundColor: colors.primary
  },
  buttonAccent: {
    backgroundColor: colors.accent,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
  },
  fullWidth: {
    width: '100%'
  }
})