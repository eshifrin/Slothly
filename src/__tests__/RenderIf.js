import { View } from 'react-native';
import 'react-native';
import React from 'react';
import RenderIf from '../utils/RenderIf';
import { shallow } from 'enzyme';

describe('RenderIf', () => {
  const TestChild = () => <View />;
  const makeWrapper = ({ condition }) =>
    shallow(
      <RenderIf condition={condition}>
        <TestChild />
      </RenderIf>
    );

  it('returns null when condition is falsy', () => {
    const wrapper = makeWrapper({ condition: false });
    expect(wrapper.find(TestChild).length).toBe(0);
  });

  it('returns children when condition is truthy', () => {
    const wrapper = makeWrapper({ condition: true });
    expect(wrapper.find(TestChild).length).toBe(1);
  });

  it('works for functions as well', () => {
    const trueFn = () => true;
    const wrapper = makeWrapper({ condition: trueFn });
    expect(wrapper.find(TestChild).length).toBe(1); // ?
  });
});
