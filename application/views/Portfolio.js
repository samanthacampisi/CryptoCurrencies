import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserPortfolio, fetchCoinDetails } from '../actions/';
import Title from '../components/Title';
import PortfolioItem from '../components/portfolio/PortfolioItem';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 5,
    backgroundColor: 'black',
    height: 60,
  },
  alignCenter: {
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'darkturquoise',
  },
});

class CoinDetails extends Component {
  componentDidMount() {
    this.props.fetchUserPortfolio();
  }

  keyExtractor = item => String(item.coin_id);

  renderItem = ({ item }) => {
    return (
      <PortfolioItem item={{ ...item, coin_name: 'lolo' }} />
    );
  }

  renderHeader = () => {
    const {
      fill, horizontal, header, alignCenter, text,
    } = styles;
    return (
      <View style={[fill, horizontal, header, alignCenter]}>
        <Text style={[fill, text]}>ID</Text>
        <Text style={[fill, text]}>Amount</Text>
        <Text style={[fill, text]}>Price in USD</Text>
      </View>
    );
  }

  render() {
    const {
      fill, separator,
    } = styles;
    const { portfolio, isFetchingPortfolio } = this.props;

    return (
      <View style={fill}>
        <ScrollView>
          <Title
            title="Portfolio"
            onBackPress={() => { this.props.navigation.goBack(); }}
          />
          <FlatList
            data={portfolio}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onRefresh={() => { this.props.fetchUserPortfolio(); }}
            refreshing={isFetchingPortfolio}
            ItemSeparatorComponent={() => <View style={[separator]} />}
            ListHeaderComponent={this.renderHeader}
          />
        </ScrollView>
      </View>
    );
  }
}

CoinDetails.propTypes = {
  portfolio: PropTypes.array.isRequired,
  isFetchingPortfolio: PropTypes.bool.isRequired,
  fetchUserPortfolio: PropTypes.func.isRequired,
  fetchCoinDetails: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  coinMap: PropTypes.instanceOf(Map).isRequired,
};

const mapStateToProps = (state) => {
  const {
    portfolio, isFetchingPortfolio, coinMap,
  } = state.CoinsReducer;

  return {
    portfolio, isFetchingPortfolio, coinMap,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchUserPortfolio, fetchCoinDetails }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetails);
