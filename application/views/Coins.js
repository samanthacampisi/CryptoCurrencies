import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllCoins } from '../actions/';
import CoinItem from '../components/coins/CoinItem';
import Title from '../components/Title';

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

class Coins extends Component {
  constructor(props) {
    super(props);
    this.currentPage = 1;
  }

  componentDidMount() {
    this.fetchCoins();
  }

  fetchCoins = () => {
    this.currentPage = 1;
    this.props.fetchAllCoins(this.currentPage);
  }

  fetchMoreCoins = () => {
    const { isFetchingAllCoins } = this.props;

    if (!isFetchingAllCoins) {
      this.currentPage += 1;
      this.props.fetchAllCoins(this.currentPage);
    }
  }

  keyExtractor = item => String(item.id);

  renderItem = ({ item }) => (
    <CoinItem
      coin={item}
      onItemPress={() => { this.props.navigation.navigate('CoinDetails', { coinId: item.id }); }}
    />
  )

  renderHeader = () => {
    const {
      fill, horizontal, header, alignCenter, text,
    } = styles;
    return (
      <View style={[fill, horizontal, header, alignCenter]}>
        <Text style={text}>#</Text>
        <Text style={[fill, text]}>Name</Text>
        <Text style={[fill, text]}>Price in USD</Text>
        <Text style={[fill, text]}>Volume (24h)</Text>
      </View>
    );
  }

  render() {
    const {
      fill,
      separator,
    } = styles;

    return (
      <View style={fill}>
        <Title title="All Coins" onBackPress={() => { this.props.navigation.goBack(); }} />
        <FlatList
          data={this.props.coins}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onRefresh={this.fetchCoins}
          refreshing={this.props.isFetchingAllCoins}
          onEndReachedThreshold={0.5}
          onEndReached={() => this.fetchMoreCoins()}
          ItemSeparatorComponent={() => <View style={[separator]} />}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

Coins.propTypes = {
  coins: PropTypes.array.isRequired,
  isFetchingAllCoins: PropTypes.bool.isRequired,
  fetchAllCoins: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { coins, isFetchingAllCoins } = state.CoinsReducer;

  return { coins, isFetchingAllCoins };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAllCoins }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
