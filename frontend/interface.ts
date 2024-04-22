export interface UserItem {
  _id: string;
  name: string;
  tel: string;
  email: string;
  role: string;
}

export interface RestaurantItem {
  _id: string;
  name: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
  tel: string;
  opentime: string;
  closetime: string;
  imageUrl: string;
  map: string;
  tag: [string];
  __v: number;
  id: string;
}

export interface reserveItem {
  _id: string;
  user: UserItem;
  id: string;
  restaurant: RestaurantItem;
  resvDate: string;
  createdAt: string;
  completed: Boolean;
}

export interface reserveJson {
  success: boolean;
  count: number;
  data: reserveItem[];
}

export interface RestaurantJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: RestaurantItem[];
}

export interface PaymentItem {
  timePayment: string;
  reservation: string;
  amount: number;
  paymentMethods: string;
}

export interface ReviewJson {
  success: boolean;
  count: number;
  data: ReviewItem[];
}

export interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  user: UserItem;
  name: string;
  restaurant: RestaurantItem;
  createdAt: string;
}

export interface nominatimItem {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
}

export interface forminput {
  name: string;
  opentime: string;
  closetime: string;
  address: string;
  subdistrict: string;
  region: string;
  district: string;
  postalcode: string;
  province: string;
  tel: string;
}
export interface managerform {
  name: string;
  tel: string;
  email: string;
  password: string;
  c_email: string;
  c_password: string;
}

export interface ChartDataItem {
  name: string;
  count: number;
}

export interface ReservationResponse {
  success: boolean;
  count: number;
  data: {
    chartdata: ChartDataItem[];
  };
}