
import { useState } from "react";
import { Position } from "../../types/backendTypes";
import TradeEventsModal from "./TradeEventsModal";
import "./positionSummary.css"
import { AllCommunityModule, ColDef, ModuleRegistry, themeAlpine } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IPositionSummary {
    positions?: Position[];
}

const columnDefs: ColDef<Position>[] = [
    {
        headerName: "Account",
        field: "account"
    },
    {
        headerName: "Security",
        field: "securityId"
    },
    {
        headerName: "Quantity",
        field: "quantity"
    },
];

const defaultColDef: ColDef = {
    flex: 1,
};

function PositionSummary({ positions }: IPositionSummary) {
    const [position, setPosition] = useState<Position>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const openModal = (position: Position) => {
        setPosition(position);
        setIsModalVisible(true);
    };

    return (
        <div className="mx-20 grid justify-items-center">
            <div style={{ width: '100%', height: 'calc(100vh - 185px)' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={positions}
                    defaultColDef={defaultColDef}
                    gridOptions={{ theme: themeAlpine }}
                    onRowDoubleClicked={(e) => openModal(e.data)}
                    loading={false}
                />
            </div>
            <TradeEventsModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                position={position}
            />
        </div>
    );
}

export default PositionSummary;