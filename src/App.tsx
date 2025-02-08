import { useEffect, useState } from 'react'
import GlobalHeader, { TAB_NAMES } from './GlobalHeader'
import { localBackendUrl } from './config';
import PositionSummary from './tabs/PositionSummary';
import { Position } from './types/backendTypes';
import CreateEvent from './tabs/CreateEvent';

function App() {
  const [activeTab, setActiveTab] = useState(TAB_NAMES.POSITION_SUMMARY);
  const [positions, setPositions] = useState<Position[]>();

  const getAllPositions = async () => {
    const result = await fetch(`${localBackendUrl}/getAllPositions`)
    const positions: Position[] = await result.json();
    setPositions(positions);
  };

  useEffect(() => {
    if (activeTab === TAB_NAMES.POSITION_SUMMARY) {
      getAllPositions();
    }
  }, [activeTab]);

  return (
    <>
      <header className='mx-20 mt-10 pb-8'>
        <GlobalHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>
      <div className='mx-20 mb-10'>
        {activeTab === TAB_NAMES.POSITION_SUMMARY &&
          <PositionSummary positions={positions} />
        }
        {activeTab === TAB_NAMES.CREATE_EVENT &&
          <CreateEvent/>
        }
      </div>
    </>
  )
}

export default App
