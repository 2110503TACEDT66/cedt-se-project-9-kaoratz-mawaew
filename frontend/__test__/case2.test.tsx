import Card from '@/components/Card';
import { render, screen } from '@testing-library/react'
import { RestaurantItem } from '../interface';

const mockRestaurantItem: RestaurantItem = {
    "_id": "65e5e9095fdd0600a91e9f7e",
    "name": "starbucks",
    "address": "ถนนสีลม",
    "district": "si lom",
    "province": "bangkok",
    "postalcode": "10110",
    "region": "Central",
    "tel": "935-980-5553",
    "opentime": "08:30",
    "closetime": "19:00",
    "map": "https://www.openstreetmap.org/?mlat=13.7197536&mlon=100.5153455#map=18",
    "__v": 0,
    "imageUrl": "https://images.unsplash.com/photo-1603361513137-219be38712ed?q=80&amp;",
    "id": "65e5e9095fdd0600a91e9f7e"
};



describe('Card Component', () => {
    it('renders the card with correct information', () => {
        render(<Card restaurantItem={mockRestaurantItem} />);

        const cardElement = screen.getByTestId('card');
        expect(cardElement).toBeInTheDocument();

        const nameElement = screen.getByText(mockRestaurantItem.name);
        expect(nameElement).toBeInTheDocument();

        const addressElement = screen.getByText(`${mockRestaurantItem.address}, ${mockRestaurantItem.district}, ${mockRestaurantItem.province}, ${mockRestaurantItem.postalcode}`);
        expect(addressElement).toBeInTheDocument();

        const detailsButton = screen.getByText('Details');
        expect(detailsButton).toBeInTheDocument();

        const reserveButton = screen.getByText('Reserve');
        expect(reserveButton).toBeInTheDocument();
    });

    it('navigates to restaurant details page on "Details" button click', () => {
        render(<Card restaurantItem={mockRestaurantItem} />);

        const detailButton = screen.getByTestId('details');

        expect(detailButton).toHaveAttribute('href', `/restaurant/${mockRestaurantItem.id}`);
    });

    it('navigates to restaurant details page on "Reserve" button click', () => {
        render(<Card restaurantItem={mockRestaurantItem} />);

        const detailButton = screen.getByTestId('reserve');

        expect(detailButton).toHaveAttribute('href', `/reserve?id=${mockRestaurantItem.id}&name=${mockRestaurantItem.name}`);
    });
});
