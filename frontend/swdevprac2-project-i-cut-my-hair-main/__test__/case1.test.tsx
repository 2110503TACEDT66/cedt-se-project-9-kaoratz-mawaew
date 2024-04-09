import TopBar from '@/components/TopBar';
import { render, screen } from '@testing-library/react'

const mock = {
  _id: "65e5e8435fdd0600a91e9f19",
  name: "Randy Fadel",
  tel: "327-384-4329",
  email: "Cynthia76@hotmail.com",
  role: "user",
  password: "$2a$10$bzcZ/QOeWnhCCNOSpEYSwuDrndLi6JRdR4obzwA0VmPcrxCtwKzhi",
  createdAt: "2024-03-04T15: 26: 59.984+00:00"
}

describe('TopBar', () => {
  it('renders TopBar component', () => {
    // Arrange

    // Act
    render(<TopBar userName={mock.name} />);

    // Assert
    const topBarElement = screen.getByTestId('top-bar');
    expect(topBarElement).toBeInTheDocument();
  });

  it('renders TopBar component with username', () => {
    // Arrange

    // Act
    render(<TopBar userName={mock.name} />);

    // Assert
    const usernameElement = screen.getByText(mock.name);
    expect(usernameElement).toBeInTheDocument();
  });
})