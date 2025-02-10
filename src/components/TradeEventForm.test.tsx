import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vitest } from "vitest";
import TradeEventForm from "./TradeEventForm";
import { describe } from "node:test";

const setTradeEventsPayload = vitest.fn();

it('should render TradeEventForm', () => {
    render(<TradeEventForm setTradeEventsPayload={setTradeEventsPayload} />);
    expect(screen.getByText("Create Event:")).toBeInTheDocument();

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByTestId("id-input")).toBeTruthy();

    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("BUY")).toBeInTheDocument();
    expect(screen.getByText("SELL")).toBeInTheDocument();
    expect(screen.getByText("CANCEL")).toBeInTheDocument();

    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByTestId("account-input")).toBeTruthy();

    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByTestId("security-input")).toBeTruthy();

    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByTestId("quantity-input")).toBeTruthy();


    expect(screen.getByTestId("quantity-input")).toBeTruthy();

    expect(screen.getByTestId("clear-form-button")).toBeTruthy();
    expect(screen.getByTestId("add-button")).toBeTruthy();
});


describe('Input validation', () => {
    const numberInputCases = [
        { altText: "ID input" },
        { altText: "Quantity input" },
    ];


    it.each(numberInputCases)("should validate number input %s", ({ altText }) => {
        render(<TradeEventForm setTradeEventsPayload={setTradeEventsPayload} />);
        const numberInput = screen.getByAltText(altText);

        expect(numberInput).toBeInvalid(); //default is 0

        fireEvent.change(numberInput, { target: { value: null } });
        expect(numberInput).toBeInvalid();

        fireEvent.change(numberInput, { target: { value: -50 } });
        expect(numberInput).toBeInvalid();

        fireEvent.change(numberInput, { target: { value: 50 } });
        expect(numberInput).toBeValid();
    });


    const textInputCases = [
        { altText: "Account input", inputValue: "ACC1" },
        { altText: "Security input", inputValue: "SEC1" },
    ];

    it.each(textInputCases)("should validate text input %s", ({ altText, inputValue }) => {
        render(<TradeEventForm setTradeEventsPayload={setTradeEventsPayload} />);
        const textInput = screen.getByAltText(altText);

        expect(textInput).toBeInvalid(); //default is ""

        fireEvent.change(textInput, { target: { value: inputValue } });
        expect(textInput).toBeValid();
    });
});

describe('Buttons', () => {
    it('should clear input fields', () => {
        render(<TradeEventForm setTradeEventsPayload={setTradeEventsPayload} />);
        const idInput: HTMLInputElement = screen.getByAltText("ID input");
        const accountInput: HTMLInputElement = screen.getByAltText("Account input");
        const securityInput: HTMLInputElement = screen.getByAltText("Security input");
        const quantityInput: HTMLInputElement = screen.getByAltText("Quantity input");

        fireEvent.change(idInput, { target: { value: 1 } });
        fireEvent.change(accountInput, { target: { value: "ACC1" } });
        fireEvent.change(securityInput, { target: { value: "SEC1" } });
        fireEvent.change(quantityInput, { target: { value: 50 } });

        expect(idInput.value).toBe("1");
        expect(accountInput.value).toBe("ACC1");
        expect(securityInput.value).toBe("SEC1");
        expect(quantityInput.value).toBe("50");

        fireEvent.click(screen.getByTestId("clear-form-button"));

        expect(idInput.value).toBe("0");
        expect(accountInput.value).toBe("");
        expect(securityInput.value).toBe("");
        expect(quantityInput.value).toBe("0");
    });

    it('should not call setTradeEventsPayload for invalid inputs', () => {
        render(<TradeEventForm setTradeEventsPayload={setTradeEventsPayload} />);
        fireEvent.click(screen.getByTestId("add-button"));
        expect(setTradeEventsPayload).not.toBeCalled();
    });
    it('should call setTradeEventsPayload for valid inputs', () => {
        render(<TradeEventForm setTradeEventsPayload={setTradeEventsPayload} />);
        const idInput: HTMLInputElement = screen.getByAltText("ID input");
        const accountInput: HTMLInputElement = screen.getByAltText("Account input");
        const securityInput: HTMLInputElement = screen.getByAltText("Security input");
        const quantityInput: HTMLInputElement = screen.getByAltText("Quantity input");

        fireEvent.change(idInput, { target: { value: 1 } });
        fireEvent.change(accountInput, { target: { value: "ACC1" } });
        fireEvent.change(securityInput, { target: { value: "SEC1" } });
        fireEvent.change(quantityInput, { target: { value: 50 } });

        fireEvent.click(screen.getByTestId("add-button"));
        expect(setTradeEventsPayload).toBeCalled();
    });
});