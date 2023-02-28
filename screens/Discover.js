import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuContainer from "../components/MenuContainer";
import CardContainer from "../components/CardContainer";
import { Hotels, Attractions, Restaurants } from "../assets/index";
import { getPlacesData } from "../api";

const Discover = () => {
  // help to navigate to Items page.
  const navigation = useNavigation();
  // type = restaurants || hotel || attractions
  const [type, setType] = useState("restaurants");
  const [location, setLocation] = useState(""); /* search location */
  // default coordinates ( GREATER NOIDA )
  const [coordinates, setCoordinates] = useState({
    lat: "28.4670734",
    lon: "77.5137649",
  });
  //if error
  const [error, setError] = useState("No Data Found");
  //shows loading if data is not fetched completely.
  const [isLoading, setIsLoading] = useState(false);
  //data about searched places
  const [mainData, setMainData] = useState([]);

  //to hide the discover navigation stack
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   fetching location from API
  useEffect(() => {
    let timeoutId = null;
    const searchLocation = async () => {
      setError(null);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${location}&format=json`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        if (data.length === 0) {
          throw new Error("Location not found");
        }
        setCoordinates({
          lat: data[0].lat,
          lon: data[0].lon,
        });
      } catch (error) {
        setError(error.message);
        setCoordinates({});
      }
    };

    // debouncer function to reduce the number of API calls made.
    if (location) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        searchLocation();
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);

  //getting data from travel advisor api
  useEffect(() => {
    setIsLoading(true);

    getPlacesData(coordinates, type, setError).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 200);
    });
  }, [coordinates, type]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* heading */}
      <View className="px-8">
        <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
        <Text className="text-[30px] text-[#527283] font-semibold">
          New Places, Today
        </Text>
      </View>
      {/* search-Box */}
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholder="🔍 Search location..."
      />

      {/* menu container if not loading*/}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
          <Text>Loading...please have some patience</Text>
        </View>
      ) : (
        <ScrollView className="bg-gray-100">
          {/* 3 options, hotel, attractions and restaurants */}
          <View className="flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          {/* showing error if searched result cannt be found else showing the result */}
          <View>
            <View className="flex-row items-center justify-between px-6 mt-5">
              <Text className="text-[#2C7379] text-[30px] font-bold">
                Result
              </Text>
            </View>
            {/* cards */}
            <View className="px-4 mt-3 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData
                    ?.filter((data) => data?.photo?.images?.small?.url)
                    ?.map((data, i) => (
                      <CardContainer
                        key={i}
                        imageSrc={data?.photo?.images?.small?.url}
                        title={data?.name}
                        location={data?.ranking_geo}
                        data={data}
                      />
                    ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Text className="text-2xl text-[#428288] font-semibold">
                      {error}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
  },
});
export default Discover;
