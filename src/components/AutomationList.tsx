import React from 'react';
import { useAutomationStore } from '@/store/automationStore';
import AutomationItem from './AutomationItem';
import { ReactFlowProvider } from '@xyflow/react';

const AutomationList: React.FC = () => {
  const { automations, isLoading, error } = useAutomationStore();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-full pt-[50px]'>
        {automations.map((automation) => (
          <ReactFlowProvider>
            <AutomationItem
            key={automation.id}
            automation={automation}
          />
          </ReactFlowProvider>
          
        ))}
      </div>
  );
};

export default AutomationList; 