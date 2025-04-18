
import {
  ReactFlowProvider
} from '@xyflow/react';

import { DnDProvider } from '@/context/DnDContext';
import AutomationList from '@/components/AutomationList';
import Sidebar from '@/components/Sidebar';

export default function App() {
  return (
    <DnDProvider>
      {/* <ReactFlowProvider> */}
        
          <div className="dndflow flex h-full w-full container mx-auto">
            <Sidebar />
            <AutomationList />
          </div>
        
      {/* </ReactFlowProvider> */}
      </DnDProvider>
  );
}
