import { Button, MultilineInput } from "@salt-ds/core";
import { TradeEvent } from "../types/backendTypes";
import { localBackendUrl } from "../config";

interface ISubmitPayload {
    tradeEventsPayload: TradeEvent[];
    setTradeEventsPayload: React.Dispatch<React.SetStateAction<TradeEvent[]>>;
}

function SubmitPayload({ tradeEventsPayload, setTradeEventsPayload }: ISubmitPayload) {

    const addTradeEvents = async () => {
        const result = await fetch(`${localBackendUrl}/addTradeEvents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tradeEventsPayload),
        });
        if (result.status === 200) {
            setTradeEventsPayload([]);
        } else {
            const resultJson = await result.json();
            alert(`${resultJson.status} ${resultJson.error}`);
        }
    };

    return (
        <div data-testid="submit-payload">
            <b>Payload:</b>
            <MultilineInput
                bordered
                variant="secondary"
                value={JSON.stringify(tradeEventsPayload, null, 6)}
                style={{ maxHeight: 350 }}
            />
            <div className="flex justify-end space-x-3">
                <Button
                    appearance="solid"
                    onClick={() => setTradeEventsPayload([])}
                    data-testid="clear-payload-button"
                >
                    Clear
                </Button>
                <Button
                    sentiment="positive"
                    appearance="solid"
                    onClick={addTradeEvents}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default SubmitPayload;