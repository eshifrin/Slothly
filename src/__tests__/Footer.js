import 'react-native';
import React from 'react';
import Footer from '../components/Footer';
import { shallow } from 'enzyme';

describe('Footer', () => {
  let wrapper;
  const mockStats = {
    minutesSoFar: '65',
    yearlyPace: '100'
  };

  beforeEach(done => {
    wrapper = shallow(<Footer stats={mockStats} />);
    setTimeout(() => done(), 0);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
