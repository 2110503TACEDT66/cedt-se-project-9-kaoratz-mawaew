export interface RestaurantItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    region: string,
    tel: string,
    opentime: string,
    closetime: string,
    imageUrl: string,
    map: string,
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
