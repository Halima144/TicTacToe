import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import Icons from './components/Icons';

const App = () => {
  const [gameState, setGameState] = useState(Array(9).fill('empty'));
  const [currentPlayer, setCurrentPlayer] = useState<'cross' | 'circle'>('cross');

  const handlePress = (index: number) => {
    if (gameState[index] !== 'empty') {
      Alert.alert('Invalid Move', 'This box is already filled');
      return;
    }

    const newGameState = [...gameState];
    newGameState[index] = currentPlayer;
    setGameState(newGameState);

    const winner = checkWinner(newGameState);
    if (winner) {
      Alert.alert('Game Over', `${winner.toUpperCase()} Wins!`, [{ text: 'OK', onPress: resetGame }]);
      return;
    }

    if (!newGameState.includes('empty')) {
      Alert.alert('Game Over', 'It\'s a Draw!', [{ text: 'OK', onPress: resetGame }]);
      return;
    }

    setCurrentPlayer(currentPlayer === 'cross' ? 'circle' : 'cross');
  };

  const checkWinner = (game: string[]): string | null => {
    const winPatterns = [
      // rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (game[a] !== 'empty' && game[a] === game[b] && game[b] === game[c]) {
        return game[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setGameState(Array(9).fill('empty'));
    setCurrentPlayer('cross');
  };

  const renderBox = (index: number) => (
    <TouchableOpacity style={styles.box} onPress={() => handlePress(index)}>
      <Icons name={gameState[index] !== 'empty' ? gameState[index] : 'pencil'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.turn}>Current Turn: {currentPlayer.toUpperCase()}</Text>
      <View style={styles.grid}>
        <View style={styles.row}>
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </View>
        <View style={styles.row}>
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </View>
        <View style={styles.row}>
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </View>
      </View>
      <View style={styles.resetContainer}>
        <Button title="Reset Game" onPress={resetGame} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
    marginBottom: 16,
  },
  turn: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 16,
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    width: 100,
    height: 100,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  resetContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});

export default App;
