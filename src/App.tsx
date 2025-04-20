import { DnDProvider } from '@/context/DnDContext';
import AutomationList from '@/components/AutomationList';
import Sidebar from '@/components/Sidebar';

export default function App() {
  return (
    <DnDProvider>
      {/* <ReactFlowProvider> */}
      <div className="flex min-h-screen bg-[#F2F2F2]">
        <div className="grid grid-cols-3">
          <div className="col-span-1 pl-[84px]">
            <Sidebar />
          </div>
          <div className="col-span-2">
            <AutomationList />
          </div>
        </div>
      </div>
      {/* </ReactFlowProvider> */}
    </DnDProvider>
  );
}
