import Map from "@/components/ridpage/Map"
import { RestaurantItem, UserItem } from "../interface"
import { render, screen, waitFor } from '@testing-library/react';

const managerMock: UserItem = {
    "_id": "6616ae1f2a24d6b652aecc10",
    "name": "Nightfall",
    "tel": "0654218454",
    "email": "nightfall@gmail.com",
    "role": "manager",
}

const mockRestaurantWithMap: RestaurantItem = {
    _id: "661a3dcda453512605e2f97b",
    name: "Mamiya Yakiniku",
    address: "123 Street",
    subdistrict: "Subdistrict",
    district: "District",
    province: "Bangkok",
    postalcode: "12345",
    region: "Region",
    tel: "023221867",
    opentime: "09:00",
    closetime: "21:00",
    imageUrl: "https://example.com/image.jpg",
    map: "https://www.openstreetmap.org/?mlat=13.72625785&amp;mlon=100.53715645#map=18/13.72625785/100.53715645",
    tag: ["tag1"],
    manager: managerMock,
    __v: 0,
    id: "661a3dcda453512605e2f97b",
}

const mockRestaurantWithoutMap: RestaurantItem = {
    _id: "661a3dcda453512605e2f97b",
    name: "Mamiya Yakiniku",
    address: "123 Street",
    subdistrict: "Subdistrict",
    district: "District",
    province: "Bangkok",
    postalcode: "12345",
    region: "Region",
    tel: "023221867",
    opentime: "09:00",
    closetime: "21:00",
    imageUrl: "https://example.com/image.jpg",
    map: "",
    tag: ["tag1"],
    manager: managerMock,
    __v: 0,
    id: "661a3dcda453512605e2f97b",
}

it('If map does exist then show map', ()=>{
    render(<Map restaurant={mockRestaurantWithMap} />);
    const mapIframe = screen.getByTestId('map');
    expect(mapIframe).toBeInTheDocument();
    })

it('If map does not exist show text', ()=>{
    render(<Map restaurant={mockRestaurantWithoutMap} />);
    const mapNotFoundMessage = screen.getByText('Map Not Found');
    expect(mapNotFoundMessage).toBeInTheDocument();
})