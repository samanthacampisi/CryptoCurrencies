import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PureChart from 'react-native-pure-chart';
import { fetchCoinDetails, fetchCoinHistorical, saveToUserPortfolio } from '../actions/';
import Title from '../components/Title';
import Loading from '../components/Loading';
import Button from '../components/Button';
import DefaultTextInput from '../components/DefaultTextInput';

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
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
  },
  sectionTitle: {
    fontSize: 18,
    color: 'darkturquoise',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  graphContainer: {
    paddingHorizontal: 10,
  },
  formContainer: {
    borderTopWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 10,
  },
});

class CoinDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: '', notes: '' };
  }

  componentDidMount() {
    this.props.fetchCoinDetails(this.props.coinId);
    this.props.fetchCoinHistorical(this.props.coinId);
  }

  renderSingleStat = (title, value) => {
    const { horizontal, text, label } = styles;
    return (
      <View style={horizontal}>
        <Text style={[text, label]}>{`${title}: `}</Text>
        <Text style={text}>{value}</Text>
      </View>
    );
  }

  renderStats = () => {
    const { alignCenter, sectionTitle } = styles;
    const { coin, isFetchingCoinDetails } = this.props;
    const { data } = coin;

    if (isFetchingCoinDetails) return <Loading text="Loading data..." />;

    return (
      <View style={alignCenter}>
        <Text style={sectionTitle}>STATS</Text>
        { this.renderSingleStat('Rank', data && data.rank) }
        { this.renderSingleStat('24h Volume USD', data && data['24h_volume_usd']) }
        { this.renderSingleStat('Available supply', data && data.available_supply) }
        { this.renderSingleStat('Market cap USD', data && data.market_cap_usd) }
        { this.renderSingleStat('Percent change 1h', data && data.percent_change_1h) }
        { this.renderSingleStat('Percent change 24h', data && data.percent_change_24h) }
        { this.renderSingleStat('Percent change 7d', data && data.percent_change_7d) }
        { this.renderSingleStat('Price in Bitcoin', data && data.price_btc) }
        { this.renderSingleStat('Price in USD', data && data.price_usd) }
        { this.renderSingleStat('Total supply', data && data.total_supply) }
      </View>
    );
  }

  renderHistorical = () => {
    const {
      alignCenter, sectionTitle, graphContainer,
    } = styles;
    const { coin, isFetchingHistorical } = this.props;
    const { historical } = coin;

    if (isFetchingHistorical) return <Loading text="Loading historical..." />;

    return (
      <View style={[alignCenter, graphContainer]}>
        <Text style={sectionTitle}>HISTORICAL</Text>
        { historical &&
          <PureChart data={historical} type="line" />
        }
      </View>
    );
  }

  renderForm = () => {
    const { alignCenter, formContainer, text } = styles;
    const { amount, notes } = this.state;
    const { coinId, coin, isSavingToPortfolio } = this.props;
    const { data } = coin;
    return (
      <View style={[alignCenter, formContainer]}>
        <Text style={text}>Want to add it to your portfolio?</Text>
        <DefaultTextInput
          label="Amount"
          isRequired
          value={amount}
          onChangeText={(val) => { this.setState({ amount: val }); }}
          keyboardType="numeric"
        />
        <DefaultTextInput
          label="Notes"
          value={notes}
          onChangeText={(val) => { this.setState({ notes: val }); }}
        />
        <Button
          onPress={() => {
            this.props.saveToUserPortfolio(
              coinId,
              parseFloat(amount),
              data.price_usd,
              Date.now(),
              notes,
            );
          }}
          disabled={!amount.length}
          text={isSavingToPortfolio ? 'Saving...' : 'Save to portfolio'}
        />
      </View>
    );
  }

  render() {
    const { fill } = styles;
    const { coin, isFetchingCoinDetails } = this.props;
    const { data } = coin;

    return (
      <View style={fill}>
        <ScrollView>
          <Title
            title={`${data && data.name ? data.name : ''} ${data && data.symbol ? `(${data.symbol})` : ''} details`}
            onBackPress={() => { this.props.navigation.goBack(); }}
          />
          { this.renderStats() }
          { this.renderHistorical() }
          { !isFetchingCoinDetails && this.renderForm() }
        </ScrollView>
      </View>
    );
  }
}

CoinDetails.propTypes = {
  coinId: PropTypes.number.isRequired,
  coin: PropTypes.object.isRequired,
  isFetchingCoinDetails: PropTypes.bool.isRequired,
  isFetchingHistorical: PropTypes.bool.isRequired,
  isSavingToPortfolio: PropTypes.bool.isRequired,
  fetchCoinDetails: PropTypes.func.isRequired,
  fetchCoinHistorical: PropTypes.func.isRequired,
  saveToUserPortfolio: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  const {
    coinMap,
    isFetchingCoinDetails,
    isFetchingHistorical,
    isSavingToPortfolio,
  } = state.CoinsReducer;
  const coinId = props.navigation.getParam('coinId', null);
  const coin = coinMap.get(coinId) || {};

  return {
    coinId, coin, isFetchingCoinDetails, isFetchingHistorical, isSavingToPortfolio,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCoinDetails, fetchCoinHistorical, saveToUserPortfolio }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetails);
