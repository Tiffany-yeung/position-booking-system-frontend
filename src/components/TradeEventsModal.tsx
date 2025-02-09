import {
    Dialog,
    DialogCloseButton,
    DialogContent,
    DialogHeader,
    StackLayout,
} from "@salt-ds/core";
import { Position } from "../types/backendTypes";

interface ITradeEventsModal {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    position?: Position;
}

export const tableHeaders = ['ID', 'Action', 'Account', 'Security', 'Quantity'];

function TradeEventsModal({ isModalVisible, setIsModalVisible, position }: ITradeEventsModal) {

    return (
        <Dialog open={isModalVisible} onOpenChange={setIsModalVisible} data-testid="trade-events-modal">
            <DialogHeader header="Trade Events" />
            <DialogContent style={{ maxHeight: 250 }}>
                <StackLayout>
                    <div className="flex flex-row space-x-5">
                        <div data-testid="account-field">
                            <b>Account:</b> {position?.account}
                        </div>
                        <div data-testid="security-field">
                            <b>Security:</b> {position?.securityId}
                        </div>
                        <div data-testid="quantity-field">
                            <b>Total Quantity:</b> {position?.quantity}
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {tableHeaders.map((header) => (
                                    <th>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {position?.tradeEvents.map((tradeEvent) => (
                                <tr>
                                    <td>{tradeEvent.id}</td>
                                    <td>{tradeEvent.action}</td>
                                    <td>{tradeEvent.account}</td>
                                    <td>{tradeEvent.securityId}</td>
                                    <td>{tradeEvent.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </StackLayout>
            </DialogContent>
            <DialogCloseButton onClick={() => setIsModalVisible(false)} />
        </Dialog>
    )
}

export default TradeEventsModal;