import { render } from '@testing-library/react';
import { getTypeIcon } from '../getTypeIcon';

describe('getTypeIcon', () => {
  test('renders Grass type icon with tooltip', () => {
    const { getByTestId } = render(getTypeIcon('Grass'));

    // Assert that the icon with test id 'type-Grass-icon' is rendered
    const iconElement = getByTestId('type-Grass-icon');
    expect(iconElement).toBeInTheDocument();
  });

  test('renders Metal type icon with tooltip and scaleY transform', () => {
    const { getByTestId } = render(getTypeIcon('Metal'));

    // Assert that the icon with test id 'type-Metal-icon' is rendered
    const iconElement = getByTestId('type-Metal-icon');
    expect(iconElement).toBeInTheDocument();

    // Assert that the icon has the correct style transform applied
    expect(iconElement).toHaveStyle('transform: scaleY(-1)');
  });
});