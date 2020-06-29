/* @flow */
import PropTypes from "prop-types"
import * as React from "react"
import { View, Animated, StatusBar, StyleSheet } from "react-native"
import styles, {
  _solidBackground,
  _dynamicLogoStyle,
  _dynamicCustomComponentStyle,
  _dynamicImageBackground,
} from "./AnimatedSplash.style"

class AnimatedSplash extends React.Component {
  static defaultProps = {
    isLoaded: false,
  }

  state = {
    animationDone: false,
    loadingProgress: new Animated.Value(0),
  }

  componentDidUpdate(prevProps) {
    const { isLoaded } = this.props
    const { loadingProgress } = this.state

    if (isLoaded && !prevProps.isLoaded) {
      Animated.timing(loadingProgress, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        this.setState({
          animationDone: true,
        })
      })
    }
  }

  renderChildren() {
    const { children, preload, isLoaded } = this.props

    if (preload || preload == null) {
      return children
    } else {
      if (isLoaded) {
        return children
      }
    }

    return null
  }

  render() {
    const { loadingProgress, animationDone } = this.state
    const {
      logoImage,
      logoWidth,
      logoHeight,
      backgroundColor,
      imageBackgroundSource,
      imageBackgroundResizeMode,
      translucent,
      customComponent,
    } = this.props

    const opacityClearToVisible = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",
      }),
    }

    const imageScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 1, 65],
          }),
        },
      ],
    }

    const logoScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 0.8, 10],
          }),
        },
      ],
    }

    const logoOpacity = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 20, 100],
        outputRange: [1, 0, 0],
        extrapolate: "clamp",
      }),
    }

    const appScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 7, 100],
            outputRange: [1.1, 1.05, 1],
          }),
        },
      ],
    }

    return (
      <View style={[styles.container]}>
        <StatusBar
          backgroundColor={backgroundColor || null}
          animated
          translucent={translucent}
        />
        {!animationDone && <View style={StyleSheet.absoluteFill} />}
        <View style={styles.containerGlue}>
          {!animationDone && (
            <Animated.View
              style={_solidBackground(logoOpacity, backgroundColor)}
            />
          )}
          <Animated.View style={[appScale, opacityClearToVisible, styles.flex]}>
            {this.renderChildren()}
          </Animated.View>
          {!animationDone && (
            <Animated.Image
              resizeMode={imageBackgroundResizeMode || "cover"}
              source={imageBackgroundSource || require("./background.png")}
              style={_dynamicImageBackground(
                imageScale,
                logoOpacity,
                backgroundColor
              )}
            />
          )}
          {!animationDone && (
            <View style={[StyleSheet.absoluteFill, styles.logoStyle]}>
              {customComponent ? (
                <Animated.View
                  style={_dynamicCustomComponentStyle(
                    logoScale,
                    logoOpacity,
                    logoWidth,
                    logoHeight
                  )}
                >
                  {customComponent}
                </Animated.View>
              ) : (
                <Animated.Image
                  source={logoImage}
                  resizeMode={"contain"}
                  style={_dynamicLogoStyle(
                    logoScale,
                    logoOpacity,
                    logoWidth,
                    logoHeight
                  )}
                />
              )}
            </View>
          )}
        </View>
      </View>
    )
  }
}

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
  ]),
  translucent: PropTypes.bool,
  customComponent: PropTypes.element,
}

export default AnimatedSplash
