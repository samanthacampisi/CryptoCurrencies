import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import Button from '../components/Button';

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: 'lightgrey',
  },
});

class MainMenu extends Component {
  goToCoinList = () => { this.props.navigation.navigate('Coins'); }

  goToPortfolio = () => { this.props.navigation.navigate('Portfolio'); }

  render() {
    const {
      fill,
      justifyCenter,
      alignCenter,
      mainContainer,
    } = styles;

    return (
      <View style={[fill, mainContainer]}>
        <Title title="Welcome to CryptoTest!" />
        <View style={[fill, justifyCenter, alignCenter]}>
          <Button text="View all coins" onPress={this.goToCoinList} />
          <Button text="View portfolio" onPress={this.goToPortfolio} />
        </View>
      </View>
    );
  }
}

MainMenu.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MainMenu;
