import 'react-native';
import React from 'react';
import SessionList from '../components/SessionList';
import Session from '../components/Session';
import { shallow } from 'enzyme';

describe('SessionList', () => {
  let wrapper;
  const mockSessionList = [
    {
      sessionLength: '5',
      when: new Date(2018, 0, 1),
      note: 'mock note'
    }
  ];

  const mockEditSession = jest.fn();
  const mockDeleteSession = jest.fn();

  beforeEach(done => {
    wrapper = shallow(
      <SessionList
        sessions={mockSessionList}
        editSession={mockEditSession}
        deleteSession={mockDeleteSession}
      />
    );
    setTimeout(() => done(), 0);
  });

  it('renders', () => {
    wrapper;
    expect(wrapper).toMatchSnapshot();
  });
});
