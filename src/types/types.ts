export enum ACTION {
    BUY = "BUY",
    CANCEL = "CANCEL",
    SELL = "SELL",
}

export type TradeEvent = {
    id: number;
    action: ACTION;
    account: string;
    securityId: string;
    quantity: number;
}

export type Position = {
    account: string;
    securityId: string;
    quantity: number;
    tradeEvents: TradeEvent[];
}