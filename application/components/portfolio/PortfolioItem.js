import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

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
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
});

const PortfolioItem = ({ item }) => {
  const {
    container, text, name, fill,
  } = styles;
  const { coin_id, amount, price_usd } = item;
  return (
    <View style={container}>
      <Text style={[text, name, fill]}>{coin_id}</Text>
      <Text style={[text, fill]}>{amount}</Text>
      <Text style={[text, fill]}>{price_usd}</Text>
    </View>
  );
};

PortfolioItem.propTypes = {
  item: PropTypes.shape({
    coin_id: PropTypes.number.isRequired,
    coin_name: PropTypes.string,
    amount: PropTypes.string.isRequired,
    price_usd: PropTypes.string.isRequired,
  }).isRequired,
};

export default PortfolioItem;
