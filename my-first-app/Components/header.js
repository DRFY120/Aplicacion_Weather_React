import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Header = () => {
  return (
    <ImageBackground
      source={require('../Images/degradado-en-negro-borde-inferior-1.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.header}>
        <Text></Text>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
  },
});

export default Header;
