import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CardContainer = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemScreen", { param: data })}
      className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[175px] my-2"
    >
      <Image
        source={{ uri: imageSrc }}
        className="w-full h-40 rounded-md object-cover"
      />
      <Text className="text-[#428288] text-[18px] font-semibold">
        {title && (title?.length > 14 ? `${title.slice(0, 14)}..` : title)}
      </Text>
      <Text className="text-gray-400 text-[14px]">
        {location &&
          (location?.length > 18
            ? `📍 ${location.slice(0, 14)}..`
            : `📍${location}`)}
      </Text>
    </TouchableOpacity>
  );
};

export default CardContainer;
