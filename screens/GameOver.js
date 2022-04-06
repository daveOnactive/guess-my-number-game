import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { defaultFonts } from '../constants/defaultFonts';
import colors from '../constants/colors';
import { Button } from '../components/Button';

export const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={defaultFonts.boldHeader}>Game is over!</Text>
      <View style={styles.successImageContainer}>
        <Image source={require('../assets/success.png')} resizeMode='cover' style={styles.successImage} />
      </View>
      <Text style={{ ...defaultFonts.header, ...styles.gameOverText }}>
        Your phone needed <Text style={{ ...defaultFonts.boldBodyText, ...styles.highlightText }}>{props.rounds}</Text> rounds to guess the number <Text style={{ ...defaultFonts.boldBodyText, ...styles.highlightText }}>{props.userNumber}</Text>.
      </Text>
      <Button title='NEW GAME' onPress={props.onRestart} fullWidth />
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  successImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 30,
    overflow: 'hidden',
    borderColor: colors.primary,
    borderWidth: 2.5
  },
  successImage: {
    width: '100%',
    height: '100%'
  },
  gameOverText: {
    marginBottom: 30,
    textAlign: 'center'
  },
  highlightText: {
    color: colors.primary,
  }
});