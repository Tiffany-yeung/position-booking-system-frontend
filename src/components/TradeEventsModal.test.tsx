import { render, screen } from "@testing-library/react";
import { expect, it, vitest } from "vitest";
import TradeEventsModal, { tableHeaders } from "./TradeEventsModal";
import positionMock from "../mocks/position.json";

const setActiveTab = vitest.fn();

it('should not render modal', () => {
    render(<TradeEventsModal isModalVisible={false} setIsModalVisible={setActiveTab} position={positionMock} />);
    expect(screen.queryByTestId("trade-events-modal")).toBeFalsy();
    expect(screen.queryByText("Trade Events")).toBeFalsy();
});

it('should render modal', () => {
    render(<TradeEventsModal isModalVisible={true} setIsModalVisible={setActiveTab} position={positionMock} />);
    expect(screen.getByTestId("trade-events-modal")).toBeTruthy();
    expect(screen.getByText("Trade Events")).toBeTruthy();
    expect(screen.getByTestId("account-field").innerHTML).toBe("<b>Account:</b> ACC1");
    expect(screen.getByTestId("security-field").innerHTML).toBe("<b>Security:</b> SEC1");
    expect(screen.getByTestId("quantity-field").innerHTML).toBe("<b>Quantity:</b> 80");

    const table = screen.getByRole('table');
    
    const columnHeaders = table.querySelectorAll("thead tr th");
    expect(columnHeaders.length).toBe(5);
    for (let i = 0; i < columnHeaders.length; i++) {
        expect(columnHeaders[i].innerHTML).toBe(tableHeaders[i]);
    }

    const rows = table.querySelectorAll("tbody tr");
    expect(rows.length).toBe(2);
    const expectedData = [
        ["1", "BUY", "ACC1", "SEC1", "100"],
        ["2", "SELL", "ACC1", "SEC1", "20"],
    ];
    for (let row = 0; row < rows.length; row++) {
        const rowData = rows[row].querySelectorAll("td");
        expect(rowData.length).toBe(5);
        for (let column = 0; column < rowData.length; column++) {
            expect(rowData[column].innerHTML).toBe(expectedData[row][column])
        }
    }
});