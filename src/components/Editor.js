import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Keyboard,
  ScrollView,
  Animated
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { formatDate, toJSDate } from '../utils/calcStats';
import { CancelIcon, UpdateIcon } from '../utils/Icons';
import PropTypes from 'prop-types';
import RenderIf from '../utils/RenderIf';

const Label = ({ text }) => (
  <View style={styles.label}>
    <Text style={styles.labelText}>{text}</Text>
  </View>
);

export default class Editor extends Component {
  constructor(props) {
    super();
    const { sessionLength = '', when = '', note = '' } = props.sessionToEdit;
    this.state = {
      sessionLength: String(sessionLength),
      when: formatDate(when),
      note
    };
  }

  componentDidMount = () => {
    this.setState({ basis: new Animated.Value(500) });
  };

  updateSession = () => {
    this.props.updateSession({
      when: toJSDate(this.state.when),
      sessionLength: this.state.sessionLength,
      note: this.state.note,
      id: this.props.sessionToEdit.id
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableHighlight
            onPress={this.props.onCancel}
            style={styles.button}
            underlayColor="white"
          >
            {CancelIcon}
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.updateSession}
            style={styles.button}
            underlayColor="white"
          >
            {UpdateIcon}
          </TouchableHighlight>
        </View>
        <Animated.View style={[{ maxHeight: this.state.basis }]}>
          <Label text={'SESSION LENGTH'} />

          <View style={styles.session}>
            <TextInput
              textAlign="right"
              style={[styles.sessionItem, styles.sessionLength]}
              keyboardType="number-pad"
              returnKeyType="done"
              value={this.state.sessionLength}
              onChangeText={sessionLength => this.setState({ sessionLength })}
            />
            <Text style={styles.sessionItem}>Minutes</Text>
          </View>
          <Label text="SESSION DATE" />
          <DatePicker
            style={[
              styles.session,
              { width: '100%', justifyContent: 'center', borderWidth: 0 }
            ]}
            date={this.state.when}
            mode="datetime"
            placeholder="select date"
            format="ddd h:mma | MMM Do, YYYY"
            maxDate={formatDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              dateText: {
                color: '#efdbc2',
                fontFamily: 'Futura',
                fontSize: 22,
                borderWidth: 0
              },
              dateTouchBody: {
                width: '100%',
                flexDirection: 'row-reverse'
              }
            }}
            onDateChange={when => {
              this.setState({ when });
            }}
          />
        </Animated.View>

        <Label text={'SESSION NOTES'} />

        <ScrollView style={styles.notes} keyboardDismissMode="interactive">
          <TextInput
            placeholderTextColor="#efdbc2"
            multiline={true}
            style={styles.notesnote}
            placeholder="  ... "
            value={this.state.note}
            onChangeText={note => this.setState({ note })}
            onBlur={this.moveNotesInputDown}
            onFocus={this.moveNotesInputUp}
            returnKeyType={'default'}
          />
        </ScrollView>
      </View>
    );
  }

  moveNotesInputUp = () => {
    Animated.timing(this.state.basis, {
      toValue: 0,
      duration: 300
    }).start();
  };

  moveNotesInputDown = () => {
    Animated.timing(this.state.basis, {
      toValue: 500,
      duration: 500
    }).start();
  };
}

Editor.propTypes = {
  sessionToEdit: PropTypes.shape({
    id: PropTypes.string,
    sessionLength: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    when: PropTypes.instanceOf(Date),
    note: PropTypes.string
  }),
  updateSession: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1
  },
  session: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    backgroundColor: '#032b82'
  },
  sessionItem: {
    flex: 0,
    flexBasis: '50%',
    color: '#efdbc2',
    fontSize: 22,
    fontFamily: 'Futura',
    borderWidth: 0
  },
  sessionLength: {
    flexBasis: '35%',
    marginRight: 5
  },
  notes: {
    flex: 1
  },
  notesnote: {
    flex: 1,
    backgroundColor: '#032b82',
    color: '#efdbc2',
    fontSize: 22,
    fontFamily: 'futura',
    height: 300,
    maxHeight: 1000
  },
  buttons: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  label: {
    height: 40,
    width: '100%',
    justifyContent: 'flex-end',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    paddingBottom: 5
  },
  labelText: {
    color: 'black',
    fontFamily: 'Futura',
    fontWeight: '700',
    fontSize: 14
  }
});
