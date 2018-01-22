import 'react-native';
import React from 'react';
import AddSessionInput from '../components/AddSessionInput';
import { shallow } from 'enzyme';

describe('AddSessionInput', () => {
  let wrapper;
  const mockAddSession = jest.fn();

  beforeEach(done => {
    wrapper = shallow(<AddSessionInput addSession={mockAddSession} />);
    setTimeout(() => done(), 0);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls addSession with correct parameters', () => {
    const mockSessionLength = '35';
    wrapper.setState({ sessionLength: mockSessionLength });
    wrapper.instance().addSession();
    expect(mockAddSession).toHaveBeenCalled;
    expect(mockAddSession).toHaveBeenCalledWith(Number(mockSessionLength));
  });
});
