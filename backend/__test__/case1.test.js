const { createRestaurant } = require("../controllers/restaurants");
const Restaurant = require("../models/Restaurant");

const noMapRestaurant = {
    name: "noMap",
    address: "1",
    subdistrict: "1",
    province: "1",
    postalCode: "33120",
    region: "mid",
    tel: "123456789",
    openTime: "12:00",
    closeTime: "20:00",
    imageUrl: "www.google.com",
    manager: "managerId"
};

const mappedRestaurant = {
  name: "Map",
  address: "1",
  subdistrict: "1",
  province: "1",
  postalCode: "33120",
  region: "mid",
  tel: "123456789",
  openTime: "12:00",
  closeTime: "20:00",
  imageUrl: "www.google.com",
  map: "https://www.openstreetmap.org/?mlat=13.72625785&amp;mlon=100.53715645#map=18/13.72625785/100.53715645",
  manager: "managerId"
}

describe('createRestaurant', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      method:"POST",
      headers:{"Content-Type": "application/json",
      Authorization: 'mock-token',},
      user: { id: 'user_id_123', role: 'manager' }, // User object with required properties
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create a restaurant with null map value for invalid input', async () => {
    req.body = {
      "name": "noMap",
      "address": "1",
      "subdistrict": "1",
      "province": "1",
      "postalCode": "33120",
      "region": "mid",
      "tel": "123456789",
      "openTime": "12:00",
      "closeTime": "20:00",
      "imageUrl": "www.google.com",
      "manager": "managerId"
  };

    await createRestaurant(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: expect.any(Object), // Verify data structure
    });
    expect(res.json.body.map).toHaveBeenCalledWith(null);
  });

  it('should create a restaurant with lat lon map value for valid input', async () => {
    req.body = {
      name: "Map",
      address: "1",
      subdistrict: "1",
      province: "1",
      postalCode: "33120",
      region: "mid",
      tel: "123456789",
      openTime: "12:00",
      closeTime: "20:00",
      imageUrl: "www.google.com",
      map: "https://www.openstreetmap.org/?mlat=13.72625785&amp;mlon=100.53715645#map=18/13.72625785/100.53715645",
      manager: "managerId"
    }
    

    await createRestaurant(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: expect.any(Object), // Verify data structure
    });
    expect(res.json.data.map).toHaveBeenCalledWith(req.body.map);
  });
});
