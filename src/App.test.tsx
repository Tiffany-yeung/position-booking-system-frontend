import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { expect, it, vitest } from 'vitest';
import { localBackendUrl } from './config';

it('should render correct page when switching tabs', () => {
  render(<App />);
  expect(screen.getByTestId("global-header-id")).toBeTruthy();
  expect(screen.getByTestId("position-summary")).toBeTruthy();
  expect(screen.queryByTestId("create-event")).toBeFalsy();

  fireEvent.click(screen.getByText("Create Event"));
  expect(screen.getByTestId("create-event")).toBeTruthy();
  expect(screen.queryByTestId("position-summary")).toBeFalsy();

  fireEvent.click(screen.getByText("Position Summary"));
  expect(screen.getByTestId("position-summary")).toBeTruthy();
  expect(screen.queryByTestId("create-event")).toBeFalsy();
});

it('should fetch getAllPositions on load', () => {
  vitest.spyOn(global, 'fetch');
  render(<App />);
  expect(fetch).toHaveBeenCalledWith(`${localBackendUrl}/getAllPositions`);
});