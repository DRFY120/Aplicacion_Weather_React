// Background.js
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const Background = ({ children }) => {
  return (
    <ImageBackground source={require('../Images/backg.jpg')} style={styles.background}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Background;

