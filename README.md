<h1 align="center">
  React Native Animated Splash Screen
</h1>

<div align="center">

Animated splash screen for Android and iOS. It is based on [Implementing Twitter’s App Loading Animation in React Native](https://facebook.github.io/react-native/blog/2018/01/18/implementing-twitters-app-loading-animation-in-react-native) topic from RN. This use an Image instead of MaskedView to work on both platforms.

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Version](https://img.shields.io/npm/v/react-native-animated-splash-screen.svg)](https://www.npmjs.com/package/react-native-animated-splash-screen)
[![npm](https://img.shields.io/npm/dt/react-native-animated-splash-screen.svg)](https://www.npmjs.com/package/react-native-animated-splash-screen)
![GitHub issues](https://img.shields.io/github/issues-raw/fabio-alss-freitas/react-native-animated-splash-screen)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green)](https://github.com/fabio-alss-freitas/react-native-animated-splash-screen/pulls)
[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

![GitHub followers](https://img.shields.io/github/followers/fabio-alss-freitas?style=social)
![GitHub stars](https://img.shields.io/github/stars/fabio-alss-freitas/react-native-animated-splash-screen?style=social)

</div>

<p align="center" >
  <kbd>
    <img src="https://i.postimg.cc/wMqmK0Wz/ezgif-3-d649b8902f22.gif" title="Demo" float="left">
  </kbd>
  <kbd>
    <img src="https://i.postimg.cc/8C4wzxZ6/ezgif-3-938850179141.gif" title="Demo" float="left">
  </kbd>
  <kbd>
    <img src="https://i.postimg.cc/5yTkKY3w/ezgif-3-2b23776764cf.gif" title="Demo" float="left">
  </kbd>
  <br>
  <em>SplashAnimated example app.</em>
</p>

## Features

- [x] Custom background color.
- [x] Custom background image.
- [x] Custom logo.
- [x] Custom logo size.
- [x] It works both: Expo and Pure React Native. (Thanks to [WrathChaos](https://github.com/WrathChaos)!)

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
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#262626"}
        logoHeight={150}
        logoWidth={150}
      >
        <App />
      </AnimatedSplash>
    );
  }
```

## Props

| Name                   | Description                                                                                                                                                                                      | Type            | Required |                        Default Value                        |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :------: | :---------------------------------------------------------: |
| isLoaded               | Condition to show children component and finish the animation.                                                                                                                                   | Boolean         |    ✓     |                            false                            |
| backgroundColor        | Splash screen background color.                                                                                                                                                                  | String          |          | ![#f00](https://placehold.it/15/f00/000000?text=+) `'#f00'` |
| logoImage              | Splash screen logo image.                                                                                                                                                                        | Object          |          |                           `null`                            |
| logoWidth              | Logo image width in `px`.                                                                                                                                                                        | Number          |          |                             150                             |
| logoHeight             | Logo image height in `px`.                                                                                                                                                                       | Number          |          |                             150                             |
| children               | Children to render inside this component.                                                                                                                                                        | Node            |          |                           `null`                            |
| preload                | Condition to load children component while wait isLoaded prop be True.                                                                                                                           | Boolean         |          |                            true                             |
| disableBackgroundImage | Disable the background image                                                                                                                                                                     | Boolean         |          |                            false                            |
| translucent            | When translucent is set to true, the app will draw under the status bar. Example: [here](https://github.com/fabio-alss-freitas/react-native-animated-splash-screen#example-of-translucent-prop)! | Boolean         |          |                            false                            |
| customComponent        | Add a logo component instead of a logo image.                                                                                                                                                    | React Component |          |                           `null`                            |

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
)

const Container = createAppContainer(AppNavigator)

class App extends React.Component {
  state = {
    isLoaded: false,
  }

  async componentDidMount() {
    await loadAsync()
    this.setState({ isLoaded: true })
  }

  render() {
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#262626"}
        logoHeight={150}
        logoWidth={150}
      >
        <Container />
      </AnimatedSplash>
    )
  }
}

export default App
```

## Example with React Navigation (setting isLoaded inside a screen of navigator)

#### Navigator

```javascript
const AppNavigator = createSwitchNavigator(
  {
    home: {
      screen: props => (
        <HomeScreen {...props} setAppLoaded={props.screenProps.setAppLoaded} />
      ),
    },
    dashboard: { screen: DashboardScreen },
  },
  {
    initialRouteName: "home",
  }
)

const Container = createAppContainer(AppNavigator)

class App extends React.Component {
  state = {
    isLoaded: false,
  }

  setAppLoaded = () => {
    this.setState({ isLoaded: true })
  }

  render() {
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#262626"}
        logoHeight={150}
        logoWidth={150}
      >
        <Container screenProps={{ setAppLoaded: this.setAppLoaded }} />
      </AnimatedSplash>
    )
  }
}

export default App
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

## Example of translucent prop

<kbd>
  <img src="https://i.postimg.cc/8C4wzxZ6/ezgif-3-938850179141.gif" title="Demo" float="left">
  <br>
  <em>translucent={true}</em>
</kbd>
<kbd>
  <img src="https://i.postimg.cc/J4Bs7Jp3/ezgif-3-24968f8730b0.gif" title="Demo" float="left">
  <br>
  <em>translucent={false}</em>
</kbd>

## Author

[Fabio Freitas](https://github.com/fabio-alss-freitas)

## License

MIT
