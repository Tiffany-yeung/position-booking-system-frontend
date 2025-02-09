import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import PositionSummary from "./PositionSummary";
import getAllPositionsMockResponse from "../mocks/getAllPositionsMockResponse.json";

describe('AgGrid', () => {
  it('should display correct column headers', async () => {
    render(<PositionSummary positions={[]} />);
    await waitFor(() => {
      expect(screen.getByText("Account")).toBeInTheDocument();
      expect(screen.getByText("Security")).toBeInTheDocument();
      expect(screen.getByText("Total Quantity")).toBeInTheDocument();
    });
  });

  it('should display no data', async () => {
    render(<PositionSummary positions={[]} />);
    await waitFor(() => {
      expect(screen.getByText("No Rows To Show")).toBeInTheDocument();
    });
  });

  it('should display data', async () => {
    render(<PositionSummary positions={getAllPositionsMockResponse} />);
    await waitFor(() => {
      expect(screen.getByText("ACC1")).toBeTruthy();
      expect(screen.getByText("SEC1")).toBeTruthy();
      expect(screen.getByText("80")).toBeTruthy();
    });
  });
});

describe('TradeEventsModal', () => {
  it('should not display modal on load', async () => {
    render(<PositionSummary positions={getAllPositionsMockResponse} />);
    await waitFor(() => {
      expect(screen.queryByTestId("trade-events-modal")).toBeFalsy();
    });
  });

  it('should display modal on row double click', async () => {
    render(<PositionSummary positions={getAllPositionsMockResponse} />);
    await waitFor(() => {
      expect(screen.queryByTestId("trade-events-modal")).toBeFalsy();
      screen.getByText("ACC1");
    });
    fireEvent.doubleClick(screen.getByText("ACC1"));

    await waitFor(() => {
      expect(screen.getByTestId("trade-events-modal")).toBeInTheDocument();
    });
  });
});