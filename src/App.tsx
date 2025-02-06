import { useEffect, useState } from 'react'
import './App.css'
import GlobalHeader, { TAB_NAMES } from './GlobalHeader'

function App() {
  const [activeTab, setActiveTab] = useState(TAB_NAMES.POSITION_SUMMARY);
  const [data, setData] = useState();

  useEffect(() => {
    if (activeTab === TAB_NAMES.POSITION_SUMMARY) {
      console.log("call backend fetch api");
    }
  }, [activeTab]);

  return (
    <>
      <header className='mx-20 py-10'>
        <GlobalHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>
      {activeTab === TAB_NAMES.POSITION_SUMMARY &&
        <div>Position summary</div>
      }
      {activeTab === TAB_NAMES.CREATE_EVENT &&
        <div>Create event</div>
      }
    </>
  )
}

export default App
