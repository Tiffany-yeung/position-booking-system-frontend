import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vitest } from "vitest";
import SubmitPayload from "./SubmitPayload";
import { TradeEvent } from "../types/backendTypes";

const mockTradeEventsPayload: TradeEvent[] = [
    {
        "id": 1,
        "action": "BUY",
        "account": "ACC1",
        "securityId": "SEC1",
        "quantity": 50
    }
];
const setTradeEventsPayload = vitest.fn();

it('should render empty payload', () => {
    render(<SubmitPayload tradeEventsPayload={[]} setTradeEventsPayload={setTradeEventsPayload} />);

    const payload = screen.getByTestId("submit-payload").querySelector("textarea")?.innerHTML;
    expect(payload).toBe(JSON.stringify([]));
});

it('should render payload with trade events', () => {
    render(<SubmitPayload tradeEventsPayload={mockTradeEventsPayload} setTradeEventsPayload={setTradeEventsPayload} />);

    const payload = screen.getByTestId("submit-payload").querySelector("textarea")?.innerHTML;
    expect(payload).toBe(JSON.stringify(mockTradeEventsPayload, null, 6));
});

it('should call setTradeEventsPayload on clear', () => {
    render(<SubmitPayload tradeEventsPayload={mockTradeEventsPayload} setTradeEventsPayload={setTradeEventsPayload} />);

    fireEvent.click(screen.getByTestId("clear-payload-button"));
    expect(setTradeEventsPayload).toBeCalledWith([]);
});