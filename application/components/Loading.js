import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spinner: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
  textStyle: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    paddingVertical: 5,
  },
});

const Loading = ({ text, labelStyle }) => {
  const { spinner, textStyle } = styles;
  return (
    <View>
      { text &&
        <Text style={[textStyle, labelStyle]}>{text}</Text>
      }
      <ActivityIndicator color="lightgrey" size="large" style={spinner} />
    </View>
  );
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
};

Loading.defaultProps = {
  labelStyle: null,
};

export default Loading;
