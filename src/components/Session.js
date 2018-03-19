import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Separator from './Separator';
import { colors } from '../constants';
import RenderIf from '../utils/RenderIf';
import { formatDate } from '../utils/calcStats';
import { UpIcon, DownIcon } from '../utils/Icons';
import PropTypes from 'prop-types';

export default class Session extends Component {
  state = {
    showNote: false
  };

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>{item.sessionLength}</Text>
          <Text style={styles.rowText}>{formatDate(item.when)}</Text>
          <TouchableHighlight
            onPress={() => this.setState({ showNote: !this.state.showNote })}
            underlayColor="transparent"
          >
            <Text>{this.state.showNote ? UpIcon : DownIcon}</Text>
          </TouchableHighlight>
        </View>

        <RenderIf condition={this.state.showNote}>
          <View style={styles.noteContainer}>
            <Separator />
            <Text style={styles.noteHeader}>SESSION NOTES</Text>
            <Text style={styles.note}>{item.note}</Text>
          </View>
        </RenderIf>
      </View>
    );
  }
}

Session.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    sessionLength: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
    when: PropTypes.instanceOf(Date),
    note: PropTypes.string
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.deepBlue
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    height: 75
  },
  rowText: {
    color: 'white',
    fontFamily: 'Futura',
    fontSize: 18
  },
  noteHeader: {
    fontWeight: '700',
    backgroundColor: colors.lightBLue,
    color: colors.deepBlue,
    fontFamily: 'Futura',
    fontSize: 13,
    flex: 1,
    height: 20,
    textAlign: 'center'
  },
  note: {
    backgroundColor: colors.lightBLue,
    color: colors.deepBlue,
    fontFamily: 'Futura',
    fontSize: 15,
    flex: 1
  },
  noteContainer: {
    backgroundColor: colors.lightBLue,

    flex: 1,
    flexDirection: 'column',
    paddingLeft: 15
  }
});
