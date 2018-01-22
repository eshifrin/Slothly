class Doc {
  constructor({ id, sessionLength, when, note = '' }) {
    this.id = id;
    this.sessionLength = sessionLength;
    this.when = when;
    this.note = note;
  }

  update = updates => {
    this.sessionLength = updates.sessionLength || this.sessionLength;
    this.when = updates.when || this.when;
    this.note = updates.note || this.note;
  };

  data = () => {
    const { sessionLength, when = new Date(), note } = this;

    return {
      sessionLength,
      when,
      note
    };
  };
}

class Sessions {
  count = 1;
  makeMockId = () => `mockId${++this.count}`;
  data = [
    new Doc({
      id: this.makeMockId(),
      sessionLength: 5,
      when: new Date(2018, 0, 1),
      note: 'mock note'
    })
  ];

  orderBy = () => {
    return this;
  };

  get = () => Promise.resolve(this.data);
  add = ({ sessionLength, when }) => {
    this.data.push(
      new Doc({
        id: this.makeMockId(),
        sessionLength,
        when
      })
    );
    return Promise.resolve();
  };

  doc = id => {
    let foundIndex;
    this.data.forEach((doc, idx) => {
      if (doc.id === id) {
        foundIndex = idx;
      }
    });

    return {
      delete: () => {
        this.data = [
          ...this.data.slice(0, foundIndex),
          ...this.data.slice(foundIndex + 1)
        ];
        return Promise.resolve();
      },
      update: updates => {
        const sessionToUpdate = this.data[foundIndex];
        sessionToUpdate.update(updates);
        return Promise.resolve();
      }
    };
  };
}

const firebase = {
  initializeApp: () => {},
  firestore: () => {
    return {
      collection: () => new Sessions()
    };
  }
};

module.exports = firebase;
