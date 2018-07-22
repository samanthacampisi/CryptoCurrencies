import { StackNavigator } from 'react-navigation';
import MainMenu from './views/MainMenu';
import Coins from './views/Coins';
import CoinDetails from './views/CoinDetails';
import Portfolio from './views/Portfolio';

const mainRoutes = {
  MainMenu,
  Coins,
  CoinDetails,
  Portfolio,
};

const mainVisualOpts = { headerMode: 'none', navigationOptions: { gesturesEnabled: false } };

const RootStack = StackNavigator(mainRoutes, mainVisualOpts);

export default RootStack;
