import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'darkturquoise',
  },
  button: {
    width: '80%',
    height: 60,
    borderRadius: 20,
    backgroundColor: 'black',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Button = ({ text, onPress, disabled }) => {
  const { textStyle, button } = styles;
  return (
    <TouchableOpacity style={button} onPress={onPress} disabled={disabled}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
