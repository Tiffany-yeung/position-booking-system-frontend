import { NavigationItem } from "@salt-ds/core";
import JpmLogo from "./assets/jpm-logo.svg";

export enum TAB_NAMES {
    POSITION_SUMMARY = "Position Summary",
    CREATE_EVENT = "Create Event",
}

interface IGlobalHeader {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<TAB_NAMES>>;
}

function GlobalHeader({ activeTab, setActiveTab }: IGlobalHeader) {
    const tabNames = [TAB_NAMES.POSITION_SUMMARY, TAB_NAMES.CREATE_EVENT];
    return (
        <div className="grid grid-cols-3 items-center space-x-12" data-testid="global-header-id">
            <img src={JpmLogo} alt="JPM logo" style={{ height: 30 }} data-testid="jpm-logo-id" />
            <div className="flex flex-row justify-center">
                {tabNames.map((tabName) => (
                    <div key={tabName} data-testid={`${tabName.toLocaleLowerCase().replace(/\s/g, '-')}-id`}>
                        <NavigationItem
                            active={activeTab === tabName}
                            onClick={() => setActiveTab(tabName)}
                        >
                            {tabName}
                        </NavigationItem>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GlobalHeader;