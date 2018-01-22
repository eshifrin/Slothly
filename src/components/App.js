import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Modal,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import AddSessionInput from './AddSessionInput';
import db from '../db/firebase';
import SessionList from './SessionList';
import Editor from './Editor';
import Footer from './Footer';
import RenderIf from '../utils/RenderIf';
import { calcStats } from '../utils/calcStats';
import _get from 'lodash.get';

export default class App extends Component {
  static defaultProps = {
    sessions: []
  };

  state = {
    showEditorModal: false,
    sessions: this.props.sessions,
    stats: {}
  };

  componentWillMount() {
    this.getSessionData();
  }

  componentDidCatch(error, info) {
    console.log('caught error', error, info); //TODO: add logger
  }

  addSession = sessionLength => {
    return db
      .addSession({
        sessionLength: Number(sessionLength)
      })
      .then(this.getSessionData());
  };

  deleteSession = sessionId => {
    return db.deleteSession(sessionId).then(this.getSessionData());
  };

  editSession = idx => {
    this.setState({
      indexInEditing: idx,
      showEditorModal: true
    });
  };

  closeModal = () => {
    this.setState({
      showEditorModal: false,
      indexInEditing: undefined
    });
  };

  updateSession = update => {
    return db
      .updateSession(update)
      .then(this.getSessionData())
      .then(() => this.closeModal());
  };

  getSessionData = () => {
    return db.getAllSessions().then(sessions => {
      this.setState({
        sessions,
        stats: calcStats(sessions)
      });
    });
  };

  render() {
    const sessionToEdit =
      this.state.indexInEditing !== undefined
        ? this.state.sessions[this.state.indexInEditing]
        : {};

    return (
      <View style={styles.container}>
        <Modal visible={this.state.showEditorModal} animationType="slide">
          <Editor
            sessionToEdit={sessionToEdit}
            onCancel={this.closeModal}
            updateSession={this.updateSession}
          />
        </Modal>
        <AddSessionInput addSession={this.addSession} />
        <SessionList
          sessions={this.state.sessions}
          editSession={this.editSession}
          deleteSession={this.deleteSession}
        />
        <Footer stats={this.state.stats} />
      </View>
    );
  }
}

App.propTypes = {
  sessions: PropTypes.array,
  stats: PropTypes.shape({
    minutesSoFar: PropTypes.string,
    yearlyPace: PropTypes.string
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  content: {
    flex: 1
  }
});
