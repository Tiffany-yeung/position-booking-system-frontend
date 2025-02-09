import { useState } from "react";
import { TradeEvent } from "../types/backendTypes";
import SubmitPayload from "../components/SubmitPayload";
import TradeEventForm from "../components/TradeEventForm";

function CreateEvent() {
    const [tradeEventsPayload, setTradeEventsPayload] = useState<TradeEvent[]>([]);

    return (
        <>
            <div className="mx-20 grid justify-center" data-testid="create-event">
                <div className="space-y-3" style={{ width: 500 }}>
                    <TradeEventForm
                        setTradeEventsPayload={setTradeEventsPayload}
                    />
                    <SubmitPayload
                        tradeEventsPayload={tradeEventsPayload}
                        setTradeEventsPayload={setTradeEventsPayload}
                    />
                </div>
            </div>
        </>
    );
}

export default CreateEvent;