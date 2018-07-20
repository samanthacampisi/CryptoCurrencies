import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
});

const CoinItem = ({ coin, onItemPress }) => {
  const {
    container, text, name, fill,
  } = styles;
  return (
    <TouchableOpacity style={container} onPress={onItemPress}>
      <Text style={[text]}>{coin.rank}</Text>
      <Text style={[text, name, fill]}>{`${coin.name} (${coin.symbol})`}</Text>
      <Text style={[text, fill]}>{coin.price_usd}</Text>
      <Text style={[text, fill]}>{coin['24h_volume_usd']}</Text>
    </TouchableOpacity>
  );
};

CoinItem.propTypes = {
  coin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onItemPress: PropTypes.func.isRequired,
};

export default CoinItem;
