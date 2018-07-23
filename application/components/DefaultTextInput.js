import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: 75,
    borderRadius: 20,
    width: '80%',
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: 'darkturquoise',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const DefaultTextInput = ({
  label, isRequired, onChangeText, value, keyboardType,
}) => {
  const { textInput, text, container } = styles;
  return (
    <View style={container}>
      { label &&
        <Text style={text}>{`${label}${isRequired ? ' (*)' : ' '}`}</Text>
      }
      <TextInput
        onChangeText={onChangeText}
        style={textInput}
        value={value}
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

DefaultTextInput.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
};

DefaultTextInput.defaultProps = {
  label: null,
  isRequired: false,
  value: null,
  keyboardType: 'default',
};

export default DefaultTextInput;
