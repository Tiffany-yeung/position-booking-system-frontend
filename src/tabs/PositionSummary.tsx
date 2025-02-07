import { Position } from "../types/backendTypes";

interface IPositionSummary {
    positions?: Position[];
}

function PositionSummary({ positions }: IPositionSummary) {
    console.log(positions);

    return (
        <div>positions</div>
    );
}

export default PositionSummary;