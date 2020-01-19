[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Version](https://img.shields.io/npm/v/react-native-animated-splash-screen.svg)](https://www.npmjs.com/package/react-native-animated-splash-screen)
[![npm](https://img.shields.io/npm/dt/react-native-animated-splash-screen.svg)](https://www.npmjs.com/package/react-native-animated-splash-screen)
![GitHub file size in bytes](https://img.shields.io/github/size/fabio-alss-freitas/react-native-animated-splash-screen)
![GitHub issues](https://img.shields.io/github/issues/fabio-alss-freitas/react-native-animated-splash-screennimated-splash-screen)

![GitHub followers](https://img.shields.io/github/followers/fabio-alss-freitas?style=social)
![GitHub stars](https://img.shields.io/github/stars/fabio-alss-freitas/react-native-animated-splash-screen?style=social)

# React Native Animated Splash Screen
Animated splash screen for Android and iOS. It is based on [Implementing Twitter’s App Loading Animation in React Native](https://facebook.github.io/react-native/blog/2018/01/18/implementing-twitters-app-loading-animation-in-react-native) topic from RN. To work on Android, it use an Image instead of MaskedView.

## Example
![React Native Animated Splash Screen Android](https://i.postimg.cc/FHs6BQXK/ezgif-3-229813da56c8.gif)

## Features
- Custom background color
- Custom logo
- Custom logo size

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
        logoHeight={150}
        logoWidht={150}
      >
        <App />
      </AnimatedSplash>
    );
  }
```

## Props
| Name            | Description                                     | Type    | Required |                        Default Value                        |
| :-------------- | :---------------------------------------------- | :------ | :------: | :---------------------------------------------------------: |
| isLoaded        | Condition to show children component and finish the animation. | Boolean |    ✓     |                                                             |
| backgroundColor | Splash screen background color.              | String  |          | ![#f00](https://placehold.it/15/f00/000000?text=+) `'#f00'` |
| logoImage       | Splash screen logo image. | Object |    ✓     |                                                             |
| logoWidth       | Logo image width in `px`.                    | Number  |          |                             150                             |
| logoHeight      | Logo image height in `px`.                   | Number  |          |                             150                             |
| children        | Children to render inside this component.    | Node    |          |                           `null`                            |
| preload         | Condition to load children component while wait isLoaded prop be True.   | Boolean |          |                            true                             |

## Example with React Navigation
#### 1) Create a navigator (Stack or Switch) normally:
```javascript
const AppNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        title: "Dashboard"
      }
    }
  },
  {
    initialRouteName: "home"
  }
);
```

#### 2) Create an app container:
```javascript
const Container = createAppContainer(AppNavigator);
```

#### 3) Pass the container as a children of AnimatedSplash:
```javascript
class App extends React.Component {
  state = {
    isLoaded: false
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
##### Make sure you have done the [previous step](https://github.com/fabio-alss-freitas/react-native-animated-splash-screen/new/master?readme=1#example-with-react-navigation).
#### 1) Pass the IsLoaded function as screenProps of Container:
```javascript
class App extends React.Component {
  state = {
    isLoaded: false
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

#### 2) Update your navigator to handle screenProps on the chosen screen:
```javascript
const AppNavigator = createSwitchNavigator(
  {
    home: {
      screen: props => (
        <HomeScreen {...props} setAppLoaded={props.screenProps.setAppLoaded} />
      )
    },
    dashboard: { screen: DashboardScreen }
  },
  {
    initialRouteName: "home"
  }
);
```

#### 2) Call the function on the chosen screen:
```javascript
this.props.setAppLoaded();
```

## Author
[Fabio Freitas](http://cmichel.io)

## License
MIT
