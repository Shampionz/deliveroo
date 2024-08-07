import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { TRestaurantCard } from "@/interfaces/types";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  category,
  address,
  dishesIds,
  long,
  lat,
  short_description,
}: TRestaurantCard) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("restaurant", {
          id,
          imgUrl,
          title,
          rating,
          categoryId: category?.id,
          address,
          dishesIds,
          long,
          lat,
          short_description,
        });
      }}
      className="bg-white mr-3 shadow mt-1 w-64 "
    >
      <Image source={{ uri: imgUrl }} className="h-36 w-64 rounded-sm" />
      <View className="px-3 pb-3">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-gray-500 text-sm">
            <Text className="text-green-500">{rating}</Text> . {category?.name}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1  truncate">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
