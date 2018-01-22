import firebase from 'firebase';
import config from '../config/firebase.auth';
// import firebase from '../__mocks__/firebase';

require('firebase/firestore');

const app = firebase.initializeApp(config);
const db = firebase.firestore();

const sessions = db.collection('sessions');

export const getAllSessions = () => {
  return sessions
    .orderBy('when')
    .get()
    .then(querySnapshot => {
      const allSessions = [];

      querySnapshot.forEach(doc => {
        const { sessionLength, when, note = '' } = doc.data();

        allSessions.push({
          id: doc.id,
          sessionLength,
          when,
          note
        });
      });

      return allSessions.reverse();
    });
};

const addSession = ({ sessionLength = 10, when = new Date() } = {}) => {
  return sessions.add({
    sessionLength,
    when
  });
};
// maybe use key here too? TODO:
const deleteSession = sessionId => {
  return sessions.doc(sessionId).delete();
};

const updateSession = ({ id, ...updates }) => {
  return sessions.doc(id).update(updates);
};

export default {
  getAllSessions,
  addSession,
  deleteSession,
  updateSession
};
