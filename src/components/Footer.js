import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants';

export default ({ stats }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{`TOTAL: ${stats.minutesSoFar || '...'}`}</Text>
    <Text style={styles.text}>{`YEARLY PACE: ${stats.yearlyPace ||
      '...'}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-around'
  },
  text: {
    color: colors.deepBlue,
    fontSize: 20,
    fontFamily: 'futura',
    textAlign: 'center'
  }
});
