

export interface RestaurantItem {
    tag: [string],
    _id: string,
    name: string,
    address: string,
    subdistrict: string,
    district: string,
    province: string,
    postalcode: string,
    region: string,
    tel: string,
    opentime: string,
    closetime: string,
    imageUrl: string,
    map: string,
    tag: [string],
    __v: number,
    id: string
  }
  

  export interface reserveItem {
    user: string;
    id: string;
    restaurant: string
    resvDate: string;
    createdAt: string;
  }

  export interface reserveJson {
    success: boolean,
    count: number,
    data: reserveItem[]
  }

  export interface RestaurantJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: RestaurantItem[]
  }

  export interface PaymentItem {
    timePayment: string;
    reservation: string;
    amount: number;
    paymentMethods: string;
  }

  export interface ReviewJson {
    success: boolean,
    count: number,
    data: ReviewItem[]
  }

  export interface ReviewItem {
    id: string,
    rating: number,
    comment: string,
    user: Object,
    name: string,
    restaurant: RestaurantItem,
    createdAt: string,
  }
  
  export interface nominatimItem {
      place_id: string,
      licence: string,
      osm_type: string,
      osm_id: string,
      boundingbox: string[],
      lat: string,
      lon: string,
      display_name: string,
      class: string,
      type: string,
      importance: number,
      icon: string
  }