import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import CreateEvent from "./CreateEvent";

it('should render CreateEvent', () => {
    render(<CreateEvent />);
    expect(screen.getByTestId("trade-event-form")).toBeTruthy();
    expect(screen.getByTestId("submit-payload")).toBeTruthy();
});

it('should add TradeEvent JSON object to payload and clear it', () => {
    render(<CreateEvent />);

    const idInput: HTMLInputElement = screen.getByAltText("ID input");
    const sellRadioButton: HTMLInputElement = screen.getByLabelText("SELL");
    const accountInput: HTMLInputElement = screen.getByAltText("Account input");
    const securityInput: HTMLInputElement = screen.getByAltText("Security input");
    const quantityInput: HTMLInputElement = screen.getByAltText("Quantity input");

    fireEvent.change(idInput, { target: { value: 1 } });
    fireEvent.click(sellRadioButton);
    fireEvent.change(accountInput, { target: { value: "ACC1" } });
    fireEvent.change(securityInput, { target: { value: "SEC1" } });
    fireEvent.change(quantityInput, { target: { value: 50 } });

    fireEvent.click(screen.getByTestId("add-button"));

    const expectedPayload = [
        {
            "id": "1",
            "action": "SELL",
            "account": "ACC1",
            "securityId": "SEC1",
            "quantity": "50"
        }
    ];

    const payload = screen.getByTestId("submit-payload").querySelector("textarea")?.innerHTML;
    expect(payload).toBe(JSON.stringify(expectedPayload, null, 6));

    fireEvent.click(screen.getByTestId("clear-payload-button"));
    expect(screen.getByTestId("submit-payload").querySelector("textarea")?.innerHTML).toBe(JSON.stringify([]));
});