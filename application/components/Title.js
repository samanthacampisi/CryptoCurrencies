import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    backgroundColor: 'turquoise',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  back: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
});

const Title = ({ title, onBackPress }) => {
  const { container, text, back } = styles;
  return (
    <View style={container}>
      { !!onBackPress &&
        <Text
          style={[text, back]}
          onPress={onBackPress}
        >
          {'<--'}
        </Text>
      }
      <Text style={text}>{title.toUpperCase()}</Text>
    </View>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onBackPress: PropTypes.func,
};

Title.defaultProps = {
  onBackPress: null,
};

export default Title;
