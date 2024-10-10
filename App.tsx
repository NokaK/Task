import React, { useState } from 'react';
import { View,FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [bgColor, setBgColor] = useState('#fff');
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [message, setMessage] = useState("Hello there");
  const [isLocked, setIsLocked] = useState(false);
  const [fontsLoaded] = useFonts({
    'Inconsolata': require('./assets/fonts/Inconsolata-VariableFont_wdth,wght.ttf'), 
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  SplashScreen.hideAsync()


  const generateRandomColor = () => {
     if (isLocked) {
      return; 
    }
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setBgColor(randomColor);
    setMessage(`Current color is: ${randomColor.toUpperCase()}`);
    setColorHistory(prevHistory => [...prevHistory, randomColor]); 
    
  };

  const resetColorHistory = () => {
    setColorHistory([]);
  };

  const handleColorItemClick = (item: string) => {
    setIsLocked(false)
    setBgColor(item)
  }

 
  const renderColorItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={[styles.historyItem, { backgroundColor: item }]} onPress={() => handleColorItemClick(item)}  accessibilityLabel={`Select color ${item}`}
    >
      <Text style={styles.historyText}>{item}</Text>
    </TouchableOpacity>
  );


  return (
    <TouchableOpacity onPress={generateRandomColor} style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{message}</Text>
         <TouchableOpacity 
            style={[styles.lockButton, { backgroundColor: isLocked ? '#FF6347' : '#32CD32' }]} 
            onPress={() => setIsLocked(!isLocked)} 
             >
            <Text style={styles.buttonText}>
              {isLocked ? "Unlock Color" : "Lock Color"}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetColorHistory}>
          <Text style={styles.buttonText}>Reset Color History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyContainer}>
        <FlatList
          data={colorHistory}
          renderItem={renderColorItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.historyList}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily:'Inconsolata',
    fontSize: 24,
  },
   lockButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Inconsolata',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  resetButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#FF4500',
    borderRadius: 5,
  },
  historyContainer: {
    maxHeight: 500, 
    width: '80%',
  },
  historyList: {
    marginTop: 20,
  
  },
  historyItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  historyText: {
    fontFamily:'Inconsolata',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
