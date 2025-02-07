export enum ACTION {
    BUY = "BUY",
    CANCEL = "CANCEL",
    SELL = "SELL",
}

export type TradeEvent = {
    uniqueId: number;
    id: number;
    action: string;
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