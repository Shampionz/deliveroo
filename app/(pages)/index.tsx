import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import SearchTextInput from "@/components/Shared/SearchTextInput";
import Categories from "@/components/Data/Categories";
import FeaturedRow from "@/components/Data/FeaturedRow";
import { ICategory, IFeaturedRow } from "@/interfaces/interfaces";
import { Link, useFocusEffect } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import BottomSheet from "@/components/Ui/BottomSheet";
import AddressBottomSheet from "@/components/Data/AddressBottomSheet";
const index = () => {
  const [featuredRows, setFeaturedRows] = useState<IFeaturedRow[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [displayBottomSheet, setDisplayBottomSheet] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        const allCategoriesColRef = collection(db, "categories");
        const allCategoriesResponse = await getDocs(allCategoriesColRef);
        const tempAllCategories: any[] = [];
        allCategoriesResponse.forEach((documentRef) => {
          tempAllCategories.push({ ...documentRef.data(), id: documentRef.id });
        });
        setCategories(tempAllCategories);
        const featuredCategoryColRef = collection(db, "featuredCategory");
        const featuredCategoryResponse = await getDocs(featuredCategoryColRef);
        const tempFeaturedCategories: any[] = [];
        featuredCategoryResponse.docs.forEach((documentRef) => {
          tempFeaturedCategories.push({
            ...documentRef.data(),
            id: documentRef.id,
          });
        });
        console.log(tempFeaturedCategories[0]);
        setFeaturedRows(tempFeaturedCategories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("white");
    }, [])
  );
  return (
    <>
      <SafeAreaView className="flex-1">
        <Link href={"/signUp"} className="text-primary-500">
          <Text>Sign up now!</Text>
        </Link>
        <Link href={"/addDocument"} className="text-primary-500">
          Add doc
        </Link>
        <View className="bg-white  pt-2 px-4">
          <View className="flex-row items-center space-x-2">
            <Image
              className="h-7 w-7 rounded-full"
              source={require("../../assets/images/bikeIcon.png")}
            />
            <TouchableOpacity
              className="flex-1 "
              onPress={() => {
                setDisplayBottomSheet(true);
              }}
            >
              <Text className="font-bold text-gray-400 text-xs">
                Deliver Now!
              </Text>
              <View className="flex-row items-center">
                <Text className="text-xl font-bold justify-center">
                  Current Location
                </Text>
                <ChevronDownIcon size={20} color={"#00CCBB"} />
              </View>
            </TouchableOpacity>
            <UserIcon size={35} color="#00CCBB" />
          </View>
          <View className="flex-row items-center pb-2 space-x-2 mt-2">
            <SearchTextInput />
            <AdjustmentsVerticalIcon color="#00CCBB" />
          </View>
        </View>
        <ScrollView
          className="pt-2 px-4 mb-4"
          showsVerticalScrollIndicator={false}
        >
          <Categories />
          {featuredRows?.map((featuredRow: IFeaturedRow) => {
            return (
              <FeaturedRow
                categories={categories}
                key={featuredRow?.id}
                id={featuredRow?.id}
                title={featuredRow?.name}
                restaurantIds={featuredRow?.restaurants}
                description={featuredRow?.short_description}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <AddressBottomSheet
        displayBottomSheet={displayBottomSheet}
        setDisplayBottomSheet={setDisplayBottomSheet}
      />
    </>
  );
};

export default index;
