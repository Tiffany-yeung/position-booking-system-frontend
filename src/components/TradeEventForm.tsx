import { Button, Input, RadioButton, RadioButtonGroup } from "@salt-ds/core";
import { FormEvent, useReducer } from "react";
import { TradeEvent } from "../types/backendTypes";

type Action = {
    type: string;
    field: string;
    value: string;
}

interface ITradeEventForm {
    setTradeEventsPayload: React.Dispatch<React.SetStateAction<TradeEvent[]>>;
}

const initialTradeEventState: TradeEvent = {
    id: 0,
    action: "BUY",
    account: "",
    securityId: "",
    quantity: 0,
};

function TradeEventForm({ setTradeEventsPayload }: ITradeEventForm) {
    const [tradeEvent, setTradeEvent] = useReducer(formReducer, initialTradeEventState);

    const handleTextChange = (e: any) => {
        const action: Action = {
            type: "UPDATE FIELD",
            field: e.target.name,
            value: e.target.value,
        }

        setTradeEvent(action);
    }

    function formReducer(tradeEvent: TradeEvent, action: Action) {
        switch (action.type) {
            case "UPDATE FIELD":
                return {
                    ...tradeEvent,
                    [action.field]: action.value,
                };
            case "RESET":
                return initialTradeEventState;
            default:
                return tradeEvent;
        }
    };

    const addTradeEventToPayload = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTradeEventsPayload(current => [...current, tradeEvent]);
    };

    return (
        <div data-testid="trade-event-form">
            <b>Create Event:</b>
            <form
                id="trade-event-form"
                className="flex flex-col space-y-3  pb-10"
                onSubmit={(e) => addTradeEventToPayload(e)}
            >
                <label>ID</label>
                <Input
                    variant="secondary"
                    value={tradeEvent.id}
                    inputProps={{ type: "number", required: true, min: 1, name: "id", alt: "ID input" }}
                    onChange={(e) => handleTextChange(e)}
                    data-testid="id-input"
                />

                <label>Action</label>
                <RadioButtonGroup
                    direction="horizontal"
                    value={tradeEvent.action}
                    name="action"
                    onChange={(e) => handleTextChange(e)}
                >
                    <RadioButton label="BUY" value="BUY" data-testid="action-buy"/>
                    <RadioButton label="SELL" value="SELL" data-testid="action-sell"/>
                    <RadioButton label="CANCEL" value="CANCEL" data-testid="action-cancel"/>
                </RadioButtonGroup>

                <label>Account</label>
                <Input
                    variant="secondary"
                    value={tradeEvent.account}
                    inputProps={{ type: "text", required: true, name: "account", alt: "Account input" }}
                    onChange={(e) => handleTextChange(e)}
                    data-testid="account-input"
                />

                <label>Security</label>
                <Input
                    variant="secondary"
                    value={tradeEvent.securityId}
                    inputProps={{ type: "text", required: true, name: "securityId", alt: "Security input" }}
                    onChange={(e) => handleTextChange(e)}
                    data-testid="security-input"
                />

                <label>Quantity</label>
                <Input
                    variant="secondary"
                    value={tradeEvent.quantity}
                    inputProps={{ type: "number", required: true, min: 1, name: "quantity", alt: "Quantity input" }}
                    onChange={(e) => handleTextChange(e)}
                    data-testid="quantity-input"
                />

                <div className="flex justify-end space-x-3">
                    <Button
                        appearance="solid"
                        onClick={() => setTradeEvent({ type: "RESET", field: "", value: "" })}
                        data-testid="clear-button"
                    >
                        Clear
                    </Button>
                    <Button
                        sentiment="accented"
                        appearance="solid"
                        type="submit"
                        data-testid="add-button"
                    >
                        Add
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default TradeEventForm;