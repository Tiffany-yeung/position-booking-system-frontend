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

function TradeEventsModal({ isModalVisible, setIsModalVisible, position }: ITradeEventsModal) {
    const tableHeaders = ['ID', 'Action', 'Account', 'Security', 'Quantity'];

    return (
        <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
            <DialogHeader header="Trade Events" />
            <DialogContent style={{ maxHeight: 250 }}>
                <StackLayout>
                    <div className="flex flex-row space-x-5">
                        <div>
                            <b>Account:</b> {position?.account}
                        </div>
                        <div>
                            <b>Security:</b> {position?.securityId}
                        </div>
                        <div>
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