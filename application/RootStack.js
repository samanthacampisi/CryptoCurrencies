import { StackNavigator } from 'react-navigation';
import MainMenu from './views/MainMenu';
import Coins from './views/Coins';

const mainRoutes = {
  MainMenu,
  Coins,
};

const mainVisualOpts = { headerMode: 'none', navigationOptions: { gesturesEnabled: false } };

const RootStack = StackNavigator(mainRoutes, mainVisualOpts);

export default RootStack;
