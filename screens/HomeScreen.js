import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { front, github_black } from "../assets/index";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const github_url = "https://github.com/oyeSAURABH";

const HomeScreen = () => {
  const navigation = useNavigation();

  //to hide the home navigation stack
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //send to the My Github URL
  const handlePress = () => {
    Linking.openURL(github_url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeAreaView className="bg-white-100 flex-1 relative">
      {/* first section */}
      <View className="flex-row mt-8 items-center mx-6 flex-1 justify-between">
        <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
          <Text className="text-[#4DABB7] text-2xl font-semibold">Tour</Text>
        </View>
        <Text className="text-black -ml-20 text-3xl font-semibold">Mate</Text>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={github_black}
            className="w-10 h-10 object-cover ml-20"
          />
        </TouchableOpacity>
      </View>
      {/* second section */}
      <View className="px-6 mt-8 space-y-3">
        <Text className="text-[#3c6072] text-[29px] font-bold">
          Travel more, Worry less...
        </Text>
        <Text className="text-[#4DABB7] text-[22px]">
          unless you forget your passport.
        </Text>
        <Text className="text-[#3C6072]">
          Whether you're a wanderlust seeking adventure or just need a change of
          scenery, our app has got you covered. So pack your bags, grab your
          phone, and let's go explore the world together.
        </Text>
      </View>
      {/* circle section */}
      <View className="w-[400px] h-[400px] bg-[#4DABB7] rounded-full absolute bottom-32 -right-36"></View>
      <View className="w-[340px] h-[340px] bg-[#E99265] rounded-full absolute -bottom-28 right-36"></View>
      {/* Image */}
      <View className="flex-1 relative items-center justify-center">
        <Image source={front} className="w-full h-full object-cover" />

        <TouchableOpacity
          onPress={() => navigation.navigate("Discover")}
          className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
        >
          <View className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]">
            <Text className="text-white text-[36px] font-bold">Go</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
