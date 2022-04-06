import { ImageBackground, StyleSheet, View } from 'react-native';
import { Header } from './components/Header';
import { StartGameScreen } from './screens/StartGameScreen';
import { GameScreen } from './screens/GameScreen';
import { GameOver } from './screens/GameOver';
import { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import colors from './constants/colors';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setIsFontLoaded(true)} onError={err => console.error(err)} />
    );
  }

  const getSelectedNumber = (number) => {
    setSelectedNumber(number);
  };

  const onRestart = () => {
    setSelectedNumber(null);
    setRounds(0);
  }

  const onGameOver = (rounds) => {
    setRounds(rounds);
  }

  let screenOutput = <StartGameScreen getSelectedNumber={getSelectedNumber} /> /*<GameOver onRestart={onRestart} rounds={rounds} userNumber={selectedNumber} />*/;

  if (selectedNumber && rounds <= 0) {
    screenOutput = <GameScreen userChoice={selectedNumber} onGameOver={onGameOver} />;
  } else if (rounds > 0) {
    screenOutput = <GameOver onRestart={onRestart} rounds={rounds} userNumber={selectedNumber} />
  }

  return (
    <ImageBackground source={require('./assets/bg-img.jpg')} resizeMode='cover' style={styles.container}>
      <Header title='Guess my Number' />
      {screenOutput}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
