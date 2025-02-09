import { render, screen } from '@testing-library/react';
import { expect, it, test, vitest } from 'vitest';
import GlobalHeader, { TAB_NAMES } from './GlobalHeader';

const setActiveTab = vitest.fn();

it('should renders GlobalHeader', () => {
  render(<GlobalHeader activeTab={TAB_NAMES.POSITION_SUMMARY} setActiveTab={setActiveTab}/>);
  expect(screen.getByTestId("global-header-id")).toBeTruthy();
  expect(screen.getByTestId("jpm-logo-id")).toBeTruthy();
  expect(screen.getByText(TAB_NAMES.POSITION_SUMMARY)).toBeTruthy();
  expect(screen.getByText(TAB_NAMES.CREATE_EVENT)).toBeTruthy();
});

it('should highlight active tab - Position Summary', () => {
  render(<GlobalHeader activeTab={TAB_NAMES.POSITION_SUMMARY} setActiveTab={setActiveTab}/>);
  expect(screen.getByTestId("position-summary-id")).toContainHTML("saltNavigationItem-active");
  expect(screen.getByTestId("create-event-id")).not.toContainHTML("saltNavigationItem-active");
});

it('should highlight active tab - Create Event', () => {
  render(<GlobalHeader activeTab={TAB_NAMES.CREATE_EVENT} setActiveTab={setActiveTab}/>);
  expect(screen.getByTestId("create-event-id")).toContainHTML("saltNavigationItem-active");
  expect(screen.getByTestId("position-summary-id")).not.toContainHTML("saltNavigationItem-active");
});
