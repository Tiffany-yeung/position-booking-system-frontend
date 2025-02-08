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
        <>
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
                    inputProps={{ type: "number", required: true, min: 1, name: "id" }}
                    onChange={(e) => handleTextChange(e)}
                />

                <label>Action</label>
                <RadioButtonGroup
                    direction="horizontal"
                    value={tradeEvent.action}
                    name="action"
                    onChange={(e) => handleTextChange(e)}
                >
                    <RadioButton label="BUY" value="BUY" />
                    <RadioButton label="SELL" value="SELL" />
                    <RadioButton label="CANCEL" value="CANCEL" />
                </RadioButtonGroup>

                <label>Account</label>
                <Input
                    variant="secondary"
                    value={tradeEvent.account}
                    inputProps={{ type: "text", required: true, name: "account" }}
                    onChange={(e) => handleTextChange(e)}
                />

                <label>Security</label>
                <Input
                    variant="secondary"
                    value={tradeEvent.securityId}
                    inputProps={{ type: "text", required: true, name: "securityId" }}
                    onChange={(e) => handleTextChange(e)}
                />

                <label>Quantity</label>
                <Input
                    variant="secondary"
                    value={tradeEvent.quantity}
                    inputProps={{ type: "number", required: true, min: 1, name: "quantity" }}
                    onChange={(e) => handleTextChange(e)}
                />

                <div className="flex justify-end space-x-3">
                    <Button
                        appearance="solid"
                        onClick={() => setTradeEvent({ type: "RESET", field: "", value: "" })}
                    >
                        Clear
                    </Button>
                    <Button
                        sentiment="accented"
                        appearance="solid"
                        type="submit"
                    >
                        Add
                    </Button>
                </div>
            </form>
        </>
    )
}

export default TradeEventForm;