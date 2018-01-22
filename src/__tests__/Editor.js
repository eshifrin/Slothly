import 'react-native';
import React from 'react';
import Editor from '../components/Editor';
import { shallow } from 'enzyme';

describe('Editor', () => {
  let wrapper;
  const mockSession = {
    id: 'mockId1',
    sessionLength: '5',
    when: new Date(2018, 0, 1),
    note: 'mock note'
  };

  const mockUpdateSession = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(done => {
    wrapper = shallow(
      <Editor
        sessionToEdit={mockSession}
        updateSession={mockUpdateSession}
        onCancel={mockUpdateSession}
      />
    );
    setTimeout(() => done(), 0);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls updateSession with correct parameters', () => {
    const newMockNote = 'new mock note';
    const newMockSession = { ...mockSession, ...{ note: newMockNote } };
    wrapper.setState(newMockSession);
    wrapper.instance().updateSession();
    expect(mockUpdateSession).toHaveBeenCalled;
    expect(mockUpdateSession).toHaveBeenCalledWith(newMockSession);
  });
});
