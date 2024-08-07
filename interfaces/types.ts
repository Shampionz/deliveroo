import { ICategory } from "./interfaces";

export type TRestaurantCard = {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  category?: ICategory;
  address: string;
  dishesIds: string[];
  long: number;
  lat: number;
  short_description: string;
};
export type IRestaurantReducer = {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  dishes: any[];
  long: number;
  lat: number;
  short_description: string;
};

export type TDishRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
};

export type TFeaturedRow = {
  title: string;
  description: string;
  id: string;
  categories: ICategory[];
  restaurantIds: string[];
};
export type TCategoryCard = { imgUrl: string; title: string };

export type AuthFormProps = { email: string; password: string };
