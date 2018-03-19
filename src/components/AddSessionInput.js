import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import db from '../db/firebase';

export default class AddSessionInput extends Component {
  state = { sessionLength: '' };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="HOW MANY MINUTES DIDYA MEDITATE?"
          returnKeyType="done"
          style={styles.input}
          value={this.state.sessionLength}
          onChangeText={sessionLength => this.setState({ sessionLength })}
          onSubmitEditing={this.addSession}
        />
      </View>
    );
  }

  addSession = () => {
    const sessionLength = Number(this.state.sessionLength);

    if (sessionLength) {
      this.props.addSession(sessionLength);
      this.setState({ sessionLength: '' });
    }
  };
}

AddSessionInput.propTypes = {
  addSession: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1
  },
  input: {
    flex: 1,
    height: 60,
    textAlign: 'center',
    fontFamily: 'futura',
    fontSize: 16
  }
});
