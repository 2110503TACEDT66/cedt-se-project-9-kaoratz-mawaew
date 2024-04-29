import { render, screen, waitFor } from '@testing-library/react';
import { getServerSession } from 'next-auth';
import HeroDash from '@/components/dashboard/heroDash';
import userLogIn from '@/libs/userLogIn';
import Manager from '@/components/managerDashboard/Manager';
import { reserveItem, reserveJson, RestaurantItem, ReviewItem, ReviewJson, UserItem } from '../interface';
import UserDashboard from '@/components/dashboard/UserDashboard';


const userMock = {
    "_id": "65e5e8435fdd0600a91e9f19",
    "name": "Randy Fadel",
    "tel": "327-384-4329",
    "email": "Cynthia76@hotmail.com",
    "role": "user",
}

const adminMock = {
    "_id": "6602d237ede6d4aad6f7c00b",
    "name": "Jhon Schmidt",
    "tel": "111111111",
    "email": "admin@admin.com",
    "role": "admin",
}

const managerMock = {
    "_id": "6616ae1f2a24d6b652aecc10",
    "name": "Nightfall",
    "tel": "0654218454",
    "email": "nightfall@gmail.com",
    "role": "manager",
}



const userItemMock: UserItem = {
    "_id": "662544456ee2a2527773dbbc",
    "name": "John Doe",
    "tel": "1234567890",
    "email": "johndoe@example.com",
    "role": "customer",
  };
  
  const restaurantItemMock: RestaurantItem = {
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
    map: "https://maps.google.com/maps?q=...",
    tag: ["tag1"],
    manager: userItemMock,
    __v: 0,
    id: "661a3dcda453512605e2f97b",
  };
  
  const reserveItemMock: reserveItem = {
    _id: "6629ea8b0bd437f0efda4c68",
    user: userItemMock,
    id: "123456",
    restaurant: restaurantItemMock,
    resvDate: "2024-04-29T07:39:00.000Z",
    createdAt: "2024-04-25T05:30:51.868Z",
    completed: false,
  };
  
  const reservationMock = {
    success: true,
    count: 1,
    data: [reserveItemMock],
  };

  const reviewsMock: ReviewItem = {
    _id: "1",
    rating:2,
    comment:"string",
    name:"string",
    user: {
      _id: "string",
      name: "string",
    },
    restaurant:{
      _id:"string",
      name:"string",
      province:"string",
      tel:"string",
      id:"string",
    },
    createdAt: "string",
    __v: 1,
  }

  const reviewsJsonMock: ReviewJson = {
    success: true,
    count: 1,
    data: [reviewsMock]
  }

  console.log(managerMock);


  it('user can access user dashboard', async() =>{
    render(<UserDashboard profile={userMock} token="MockTOken"></UserDashboard>);
    const greetingText = `Hello ${userMock.name}`;
    await waitFor(()=>{
      expect(screen.getByText(greetingText)).toBeInTheDocument();
    })
  })

    it('redirects manager to manager dashboard', async () => {
        console.log(managerMock);
        render(<Manager profile={managerMock} reservation={reservationMock} />);
        
        const greetingText = `Hello ${managerMock.name}`;

        await waitFor(() => {
          expect(screen.getByText(greetingText)).toBeInTheDocument();
        });
      });
    it('non manager cannot access manager dashboard', async() =>{
        render(<Manager profile={userMock} reservation={reservationMock}/>);
        await waitFor(()=>{
            expect(screen.getByTestId('notManager')).toBeInTheDocument();
        });
    });