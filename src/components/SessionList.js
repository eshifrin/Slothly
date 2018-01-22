import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import Separator from './Separator';
import Session from './Session';
import RenderIf from '../utils/RenderIf';
import { SwipeListView } from 'react-native-swipe-list-view';
import PropTypes from 'prop-types';

export default class SessionList extends Component {
  static defaultProps = {
    sessions: []
  };

  render() {
    return (
      <SwipeListView
        disableRightSwipe
        useFlatList
        style={styles.container}
        data={this.props.sessions}
        renderItem={this._renderSession}
        keyExtractor={this._keyExtractor}
        renderHiddenItem={this._renderHiddenItem}
        rightOpenValue={-140}
        ItemSeparatorComponent={Separator}
      />
    );
  }

  _keyExtractor = (item, index) => `${item.id}`;
  _renderSession = ({ item }) => <Session item={item} />;
  _renderHiddenItem = ({ item, index }) => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[styles.button, styles.editButton]}
          onPress={() => this.props.editSession(index)}
        >
          <Text>EDIT</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.deleteButton]}
          onPress={() => this.props.deleteSession(item.id)}
        >
          <Text>DELETE</Text>
        </TouchableHighlight>
      </View>
    );
  };
}

SessionList.propTypes = {
  sessions: PropTypes.array.isRequired,
  editSession: PropTypes.func.isRequired,
  deleteSession: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  button: {
    flexBasis: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: '#edf7ee'
  },
  deleteButton: {
    backgroundColor: '#efdbc2'
  }
});
