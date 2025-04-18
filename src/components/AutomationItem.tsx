import React, { useState } from 'react';
import { ReactFlow, Controls, Background, ReactFlowProvider } from '@xyflow/react';
import { Automation } from '@/api/types';
import { useAutomationStore } from '@/store/automationStore';
import { mapContentToObject } from '@/utils/contentMapper';
import { useFlow } from '@/hooks/useFlow';

interface AutomationItemProps {
  automation: Automation;
}

const AutomationItem: React.FC<AutomationItemProps> = ({ automation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteAutomation = useAutomationStore(state => state.deleteAutomation);
  const content = mapContentToObject(automation.content);
  const {
    reactFlowWrapper,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
    onDragStart,
  } = useFlow();

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteAutomation(automation.id);
  };

  return (
    <div className={`border border-gray-300 rounded mb-[50px] w-[673px] ${isOpen ? 'h-[500px]' : ''}`}>
      <div 
        className="flex items-center gap-2.5 px-5 py-4 cursor-pointer"
        onClick={toggleOpen}
      >
        <svg 
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path 
            d="M9 18L15 12L9 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-lg font-medium flex-1">
          {content.name}: {content.count_files} звонков
        </span>
        <svg 
          className="w-5 h-5 cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          onClick={handleRemove}
        >
          <path 
            d="M18 6L6 18M6 6L18 18" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            fitView
            style={{ backgroundColor: '#F7F9FB' }}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      )}
    </div>
  );
};

export default AutomationItem; 