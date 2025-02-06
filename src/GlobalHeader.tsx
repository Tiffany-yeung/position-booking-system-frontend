import { NavigationItem } from "@salt-ds/core";
import { useState } from "react";
import JpmLogo from "./assets/jpm-logo.svg";
import { Icon, InfoIcon } from "@salt-ds/icons";

export enum TAB_NAMES {
    POSITION_SUMMARY = "Position Summary",
    CREATE_EVENT = "Create Event",
}

interface IGlobalHeader {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<TAB_NAMES>>;
}

function GlobalHeader({activeTab, setActiveTab}: IGlobalHeader) {
    const tabNames = [TAB_NAMES.POSITION_SUMMARY, TAB_NAMES.CREATE_EVENT];

    return (
        <nav>
            <div className="grid grid-cols-3 items-center">
                <img src={JpmLogo} alt="JPM logo" style={{ height: 30 }} />
                <div className="flex flex-row justify-center">
                    {tabNames.map((tabName) => (
                        <li key={tabName}>
                            <NavigationItem
                                active={activeTab === tabName}
                                href="#"
                                onClick={() => {
                                    setActiveTab(tabName);
                                }}
                            >
                                {tabName}
                            </NavigationItem>
                        </li>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default GlobalHeader;