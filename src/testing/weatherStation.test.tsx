import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import WeatherStation from '../components/WeatherStation';

test('renders Weather Station component', async () => {
  render(<WeatherStation />);

  expect(screen.getByText(/Indlæser vejrdata/i)).toBeInTheDocument();

  const heading = await screen.findByRole('heading', {
    name: /Vejrudsigt/i,
  });

  expect(heading).toBeInTheDocument();

  expect(
    await screen.findByText(/Her ses nuværende og fremtidig vejrinformation/i),
  ).toBeInTheDocument();

  expect(await screen.findByText(/Nuværende vejr/i)).toBeInTheDocument();
  expect(await screen.findByText(/Forventet vejr/i)).toBeInTheDocument();
});

