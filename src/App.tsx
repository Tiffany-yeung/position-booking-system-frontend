import { useEffect, useState } from 'react'
import './App.css'
import GlobalHeader, { TAB_NAMES } from './GlobalHeader'
import { localBackendUrl } from './config';
import PositionSummary from './tabs/positionSummary/PositionSummary';
import { Position } from './types/backendTypes';
import CreateEvent from './tabs/createEvent/CreateEvent';

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
      <header className='mx-20 pt-10 pb-8'>
        <GlobalHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>
      {activeTab === TAB_NAMES.POSITION_SUMMARY &&
        <PositionSummary positions={positions} />
      }
      {activeTab === TAB_NAMES.CREATE_EVENT &&
        <CreateEvent/>
      }
    </>
  )
}

export default App
