import 'react-native';
import React from 'react';
import App from '../components/App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;
  beforeEach(done => {
    wrapper = shallow(<App />);
    setTimeout(() => done(), 0); //ensures lifecycle hooks are run
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('with mock data', () => {
    expect(wrapper.state()).toMatchSnapshot();
  });

  it('can add sessions', () => {
    const randomNum = Math.floor(Math.random() * 10000);

    wrapper
      .instance()
      .addSession(randomNum)
      .then(() => {
        expect(
          wrapper
            .state()
            .sessions.map(({ sessionLength }) => sessionLength)
            .includes(randomNum)
        ).toBeTruthy;
      });
  });

  it('can delete sessions', () => {
    expect(wrapper.state().sessions.length).toBeTruthy;

    wrapper
      .instance()
      .deleteSession('mockId1')
      .then(() => {
        expect(wrapper.state().sessions.length).toBeFalsey;
      });
  });

  it('can update sessions', () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const id = wrapper.state().sessions[0].id;

    wrapper
      .instance()
      .updateSession({
        id,
        sessionLength: randomNum
      })
      .then(() => {
        expect(wrapper.state().sessions[0].sessionLength).toEqual(randomNum); // ?
      });
  });
});
