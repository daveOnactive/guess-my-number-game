import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { NumberContainer } from '../components/NumberContainer';
import { defaultFonts } from '../constants/defaultFonts';
import { Button } from '../components/Button';

export const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmNumber, setConfirmNumber] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const handleInputChange = (inputValue) => {
    setEnteredValue(inputValue.replace(/[^0-9]/g, ''));
  };

  const resetInput = () => {
    setEnteredValue('');
    setConfirmNumber(false);
  };

  const confirmInput = () => {
    const number = parseInt(enteredValue);

    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert('Invalid Number!', 'Number has to be a number between 0 and 99', [{
        text: 'Okay',
        style: 'destructive',
        onPress: resetInput,
      }]);
      return;
    };

    setSelectedNumber(number);
    setEnteredValue('');
    setConfirmNumber(true);
    Keyboard.dismiss()
  }

  let outputNumber;

  if (confirmNumber) outputNumber = (
    <Card style={styles.summaryContainer}>
      <Text style={defaultFonts.bodyText}>You selected</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <Button title='Start game' onPress={() => props.getSelectedNumber(selectedNumber)} fullWidth />
    </Card>
  )

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={{ ...defaultFonts.boldHeader, ...styles.title }}>Start a New Game!</Text>

        <Card style={styles.inputContainer}>
          <Text style={defaultFonts.bodyText}>Enter a Number</Text>
          <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType='number-pad' maxLength={2} onChangeText={handleInputChange} value={enteredValue} />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title='Reset' onPress={resetInput} color='accent' />
            </View>
            <View style={styles.button}>
              <Button title='Confirm' onPress={confirmInput} color='primary' />
            </View>
          </View>
        </Card>
        {outputNumber}
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    marginVertical: 15,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 80,
    textAlign: 'center'
  },
  summaryContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  }
});