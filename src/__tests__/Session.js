import 'react-native';
import React from 'react';
import Session from '../components/Session';
import { shallow } from 'enzyme';

describe('Session', () => {
  let wrapper;
  const mockSession = {
    sessionLength: '5',
    when: new Date(2018, 0, 1),
    note: 'mock note'
  };

  beforeEach(done => {
    wrapper = shallow(<Session item={mockSession} />);
    setTimeout(() => done(), 0);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
