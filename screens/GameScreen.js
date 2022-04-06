import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import { NumberContainer } from '../components/NumberContainer';
import { Card } from '../components/Card';
import { defaultFonts } from '../constants/defaultFonts';
import { Button } from '../components/Button';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

export const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPassGuesses] = useState([{
    id: 1,
    guess: initialGuess
  }]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length - 1);
    }
  }, [userChoice, currentGuess])


  const handleNextGuess = (direction) => {
    const falseLowerGuessOption = direction === 'lower' && currentGuess < userChoice;
    const falseHigherGuessOption = direction === 'higher' && currentGuess > userChoice;

    if (falseLowerGuessOption || falseHigherGuessOption) {
      Alert.alert('Wrong Hint!', 'Please choose the correct hint');
      return;
    }

    if (direction === 'lower') currentHigh.current = currentGuess;

    if (direction === 'higher') currentLow.current = currentGuess;

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

    setCurrentGuess(nextNumber);
    setPassGuesses(prevPassGuesses => [{ id: prevPassGuesses.length + 1, guess: nextNumber }, ...prevPassGuesses])
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultFonts.boldHeader}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button onPress={() => handleNextGuess('lower')} icon='md-remove' />
        <Button onPress={() => handleNextGuess('higher')} icon='md-add' />
      </Card>
      <View style={styles.guessesContainer}>
        <FlatList contentContainerStyle={styles.guesslist} data={pastGuesses} keyExtractor={(option) => option.id} renderItem={(data) => {
          return (
            <View style={styles.guessItem}>
              <Text>{`#${data.item.id}`}</Text>
              <Text>{data.item.guess}</Text>
            </View>
          )
        }} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  },
  guessesContainer: {
    flex: 1,
    width: '80%',
    marginTop: 5,
  },
  guesslist: {
    justifyContent: 'flex-end',
    flexGrow: 1,
    alignItems: 'center',
  },
  guessItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    borderRadius: 10,
    width: 200,
  }
});