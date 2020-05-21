/* @flow */
import PropTypes from "prop-types";
import * as React from "react";
import { View, Animated, StatusBar, StyleSheet } from "react-native";
import {
  ScreenWidth,
  ScreenHeight,
  getStatusBarHeight,
} from "@freakycoder/react-native-helpers";

class AnimatedSplash extends React.Component {
  static defaultProps = {
    isLoaded: false,
  };

  state = {
    animationDone: false,
    loadingProgress: new Animated.Value(0),
  };

  componentDidUpdate(prevProps) {
    const { loadingProgress } = this.state;
    const { isLoaded } = this.props;

    if (isLoaded && !prevProps.isLoaded) {
      Animated.timing(loadingProgress, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        this.setState({
          animationDone: true,
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
    const {
      logoImage,
      logoWidth,
      logoHeight,
      backgroundColor,
      disableBackgroundImage,
    } = this.props;

    const opacityClearToVisible = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",
      }),
    };

    const imageScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 1, 65],
          }),
        },
      ],
    };

    const logoScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 0.8, 10],
          }),
        },
      ],
    };

    const logoOpacity = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 20, 100],
        outputRange: [1, 0, 0],
        extrapolate: "clamp",
      }),
    };

    const appScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 7, 100],
            outputRange: [1.1, 1.05, 1],
          }),
        },
      ],
    };

    return (
      <View style={[styles.flex]}>
        <StatusBar backgroundColor={backgroundColor || "red"} animated />
        {!animationDone && <View style={StyleSheet.absoluteFill} />}
        <View style={[styles.flexCentered, { backgroundColor: "transparent" }]}>
          {!animationDone && (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                logoOpacity,
                {
                  backgroundColor: backgroundColor || "red",
                },
              ]}
            />
          )}
          <Animated.View style={[appScale, styles.flex, opacityClearToVisible]}>
            {this.renderChildren()}
          </Animated.View>
          {!animationDone && !disableBackgroundImage && (
            <Animated.Image
              resizeMode="cover"
              source={require("./background.png")}
              style={[
                imageScale,
                logoOpacity,
                { tintColor: backgroundColor || "red" },
              ]}
            />
          )}
          {!animationDone && (
            <View style={[StyleSheet.absoluteFill, styles.centered]}>
              <Animated.Image
                source={logoImage}
                resizeMode={"contain"}
                style={[
                  logoScale,
                  logoOpacity,
                  {
                    height: logoHeight || 150,
                    width: logoWidth || 150,
                  },
                ]}
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
    flex: 1,
  },
  flexCentered: { flex: 1, alignContent: "center", justifyContent: "center" },
  maskImageStyle: {
    ...StyleSheet.absoluteFill,
    width: ScreenWidth,
    height: ScreenHeight,
    alignItems: "center",
    justifyContent: "center",
    top: getStatusBarHeight() * -1,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
});

AnimatedSplash.propTypes = {
  preload: PropTypes.bool,
  logoWidth: PropTypes.number,
  children: PropTypes.element,
  logoHeight: PropTypes.number,
  backgroundColor: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  disableBackgroundImage: PropTypes.bool,
  logoImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};

export default AnimatedSplash;
