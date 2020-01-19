/* @flow */
import PropTypes from "prop-types";
import * as React from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
const Expo = require("expo-constants");

const { width, height } = Dimensions.get("screen");

class AnimatedSplash extends React.Component {
  static defaultProps = {
    isLoaded: false
  };

  state = {
    loadingProgress: new Animated.Value(0),
    animationDone: false
  };

  componentDidUpdate(prevProps) {
    const { loadingProgress } = this.state;
    const { isLoaded } = this.props;

    if (isLoaded && !prevProps.isLoaded) {
      Animated.timing(loadingProgress, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true
      }).start(() => {
        this.setState({
          animationDone: true
        });
      });
    }
  }

  renderChildren() {
    const { children, preload, isLoaded } = this.props;

    if (preload || preload == null) {
      return children;
    } else {
      if (isLoaded) {
        return children;
      }
    }

    return null;
  }

  render() {
    const { loadingProgress, animationDone } = this.state;
    const { logoImage, backgroundColor, logoWidth, logoHeight } = this.props;

    const opacityClearToVisible = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 0, 1],
        extrapolate: "clamp"
      })
    };

    const imageScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 1, 40]
          })
        }
      ]
    };

    const logoScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 0.8, 15]
          })
        }
      ]
    };

    const logoOpacity = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 25, 100],
        outputRange: [1, 0, 0],
        extrapolate: "clamp"
      })
    };

    const appScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 7, 100],
            outputRange: [1.1, 1.05, 1]
          })
        }
      ]
    };

    return (
      <View style={styles.flex}>
        <StatusBar backgroundColor={backgroundColor || "red"} animated />
        {!animationDone && <View style={StyleSheet.absoluteFill} />}
        <View style={styles.flexCentered}>
          {!animationDone && (
            <View style={[StyleSheet.absoluteFill, { backgroundColor }]} />
          )}
          <Animated.View style={[opacityClearToVisible, appScale, styles.flex]}>
            {this.renderChildren()}
          </Animated.View>
          {!animationDone && (
            <Animated.Image
              resizeMode={"cover"}
              style={[
                styles.maskImageStyle,
                { tintColor: backgroundColor || "red" },
                imageScale
              ]}
              source={require("./background.png")}
            />
          )}
          {!animationDone && (
            <View style={[StyleSheet.absoluteFill, styles.centered]}>
              <Animated.Image
                resizeMode={"contain"}
                style={[
                  {
                    height: logoHeight || 150,
                    width: logoWidth || 150
                  },
                  logoScale,
                  logoOpacity
                ]}
                source={logoImage}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  flexCentered: { flex: 1, alignContent: "center", justifyContent: "center" },
  maskImageStyle: {
    ...StyleSheet.absoluteFill,
    top:
      Expo != null && Expo.default != null
        ? Expo.default.statusBarHeight * -1
        : 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center"
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  }
});

AnimatedSplash.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  logoImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  children: PropTypes.instanceOf(React),
  backgroundColor: PropTypes.string,
  logoWidth: PropTypes.number,
  logoHeight: PropTypes.number,
  preload: PropTypes.bool
};

export default AnimatedSplash;
