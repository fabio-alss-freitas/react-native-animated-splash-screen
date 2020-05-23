import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AnimatedSplash from "./lib/AnimatedSplash";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);
  return (
    <>
      <AnimatedSplash
        logoWidht={150}
        logoHeight={150}
        isLoaded={isLoaded}
        backgroundColor={"#262626"}
        logoImage={require("./assets/logo.png")}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#262626",
          }}
        >
          <Text style={{ color: "#fdfdfd", fontSize: 30 }}>Hello</Text>
        </View>
      </AnimatedSplash>
    </>
  );
};

export default App;
