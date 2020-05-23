<h1 align="center">
  React Native Animated Splash Screen
</h1>

<div align="center">

Animated splash screen for Android and iOS. It is based on [Implementing Twitter’s App Loading Animation in React Native](https://facebook.github.io/react-native/blog/2018/01/18/implementing-twitters-app-loading-animation-in-react-native) topic from RN. This use an Image instead of MaskedView to work on both platforms.

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Version](https://img.shields.io/npm/v/react-native-animated-splash-screen.svg)](https://www.npmjs.com/package/react-native-animated-splash-screen)
[![npm](https://img.shields.io/npm/dt/react-native-animated-splash-screen.svg)](https://www.npmjs.com/package/react-native-animated-splash-screen)
![GitHub issues](https://img.shields.io/github/issues-raw/fabio-alss-freitas/react-native-animated-splash-screen)

![GitHub followers](https://img.shields.io/github/followers/fabio-alss-freitas?style=social)
![GitHub stars](https://img.shields.io/github/stars/fabio-alss-freitas/react-native-animated-splash-screen?style=social)

</div>

<p align="center" >
  <kbd>
    <img src="https://i.postimg.cc/wMqmK0Wz/ezgif-3-d649b8902f22.gif" title="Scroll Demo" float="left">
  </kbd>
  <kbd>
    <img src="https://i.postimg.cc/5yTkKY3w/ezgif-3-2b23776764cf.gif" title="Priority Demo" float="left">
  </kbd>
  <br>
  <em>SplashAnimated example app.</em>
</p>

## Features

- [x] Custom background color.
- [x] Custom logo.
- [x] Custom logo size.

## Installation

`yarn add react-native-animated-splash-screen`
or
`npm install --save react-native-animated-splash-screen`

## Usage

```javascript
import AnimatedSplash from "react-native-animated-splash-screen";

render() {
    return (
      <AnimatedSplash
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#262626"}
        disableBackgroundImage
        logoHeight={150}
        logoWidht={150}
      >
        <App />
      </AnimatedSplash>
    );
  }
```

## Props

| Name                   | Description                                                            | Type    | Required |                        Default Value                        |
| :--------------------- | :--------------------------------------------------------------------- | :------ | :------: | :---------------------------------------------------------: |
| isLoaded               | Condition to show children component and finish the animation.         | Boolean |    ✓     |                                                             |
| backgroundColor        | Splash screen background color.                                        | String  |          | ![#f00](https://placehold.it/15/f00/000000?text=+) `'#f00'` |
| logoImage              | Splash screen logo image.                                              | Object  |    ✓     |                                                             |
| logoWidth              | Logo image width in `px`.                                              | Number  |          |                             150                             |
| logoHeight             | Logo image height in `px`.                                             | Number  |          |                             150                             |
| children               | Children to render inside this component.                              | Node    |          |                           `null`                            |
| preload                | Condition to load children component while wait isLoaded prop be True. | Boolean |          |                            true                             |
| disableBackgroundImage | disable the background image                                           | Boolean |          |                            false                            |

## Example with React Navigation

```javascript
const AppNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        title: "Dashboard",
      },
    },
  },
  {
    initialRouteName: "home",
  }
);

const Container = createAppContainer(AppNavigator);

class App extends React.Component {
  state = {
    isLoaded: false,
  };

  async componentDidMount() {
    await loadAsync();
    this.setState({ isLoaded: true });
  }

  render() {
    return (
      <AnimatedSplash
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#262626"}
        logoHeight={150}
        logoWidht={150}
      >
        <Container />
      </AnimatedSplash>
    );
  }
}

export default App;
```

## Example with React Navigation (setting isLoaded inside a screen of navigator)

#### Navigator

```javascript
const AppNavigator = createSwitchNavigator(
  {
    home: {
      screen: (props) => (
        <HomeScreen {...props} setAppLoaded={props.screenProps.setAppLoaded} />
      ),
    },
    dashboard: { screen: DashboardScreen },
  },
  {
    initialRouteName: "home",
  }
);

const Container = createAppContainer(AppNavigator);

class App extends React.Component {
  state = {
    isLoaded: false,
  };

  setAppLoaded = () => {
    this.setState({ isLoaded: true });
  };

  render() {
    return (
      <AnimatedSplash
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#262626"}
        logoHeight={150}
        logoWidht={150}
      >
        <Container screenProps={{ setAppLoaded: this.setAppLoaded }} />
      </AnimatedSplash>
    );
  }
}

export default App;
```

#### HomeScreen

```javascript
class HomeScreen extends React.Component {

...

  async componentDidMount() {
    await loadAsync();
    this.props.setAppLoaded();
  }

...

}

export default HomeScreen
```

## Author

[Fabio Freitas](https://github.com/fabio-alss-freitas)

## License

MIT
