import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import SliderComponent from './slider';
import { getURL } from '../../services/helper';


export const Slider = ({
  config: { maxValue, minValue, itemList },
  value,
  onChange,
  onPress,
  onRelease,
}) => (
  <View style={{ alignItems: 'stretch', minHeight: 450 }}>
    <Text style={{ textAlign: 'center' }}>{maxValue}</Text>
    { itemList[itemList.length-1].image ? <View style={{justifyContent: 'center', alignItems: 'center'}}><Image style={{ width: 45, height: 45, resizeMode: 'cover' }} source={{ uri: getURL(itemList[itemList.length-1].image.en) }} /></View> : <View></View>}
    <SliderComponent
      value={value || 0}
      min={1}
      max={itemList.length || 100}
      labels={itemList.map(item => ({ text: item.name.en }))}
      strict
      barHeight={200}
      selected={!!value}
      onChange={onChange}
      onPress={onPress}
      onRelease={onRelease}
    />
    { itemList[0].image ? <View style={{justifyContent: 'center', alignItems: 'center'}}><Image style={{ width: 45, height: 45, resizeMode: 'cover' }} source={{ uri: getURL(itemList[0].image.en) }} /></View> : <View></View>}
    <Text style={{ textAlign: 'center' }}>{minValue}</Text>
  </View>
);

Slider.defaultProps = {
  value: undefined,
  onPress: () => {},
  onRelease: () => { },
};

Slider.propTypes = {
  config: PropTypes.shape({
    minValue: PropTypes.string,
    maxValue: PropTypes.string,
    itemList: PropTypes.array,
  }).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onPress: PropTypes.func,
  onRelease: PropTypes.func,
};
