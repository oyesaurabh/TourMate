import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const data = route?.params?.param;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handlePress = () => {
    Linking.openURL(data.web_url);
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Image section */}
        <View className="relative bg-white shadow-lg">
          <Image
            source={{
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://cdn-icons-png.flaticon.com/512/651/651535.png",
            }}
            className="w-full h-72 object-cover rounded-2xl "
          />
          <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")}
              className="w-10 h-10 rounded-md"
            >
              <Text className="font-bold text-4xl ">{"⬅️"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Detail  */}

        <View className="mt-6">
          <Text className="text-[#428288] text-[24px] font-bold">
            {data?.name}
          </Text>
          {data?.ranking_geo && data?.bearing && (
            <View className="flex-row items-center space-x-2 mt-2">
              <Text className="text-[#8C9EA6] text-[20px] font-bold">
                {`${data?.bearing}, ${data?.ranking_geo}`}
              </Text>
            </View>
          )}
        </View>

        {data?.description && (
          <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
            {data?.description}
          </Text>
        )}

        {data?.cuisine && (
          <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
            {data?.cuisine.map((n) => (
              <TouchableOpacity
                key={n.key}
                className="px-2 py-1 rounded-md bg-emerald-100"
              >
                <Text>{n.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {(data?.phone || data?.address) && (
          <View className=" space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
            {data?.phone && (
              <View className="items-center flex-row space-x-6">
                <Text className="text-lg">{`📞 : ${data?.phone}`}</Text>
              </View>
            )}

            {data?.address && (
              <View className="items-center flex-row space-x-6">
                <Text className="text-lg">{`📋 : ${data?.address}`}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={handlePress}
              className="mt-4 px-4 py-4 rounded-lg bg-[#06B2BE] items-center justify-center mb-12"
            >
              <Text className="text-3xl font-semibold uppercase tracking-wider text-gray-100">
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemScreen;
