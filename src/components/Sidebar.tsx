import React, { useState } from 'react';
import { useDnD } from '@/context/DnDContext';
import { useAutomationStore } from '@/store/automationStore';
import Modal from '@/components/Modal';

const nodeTypes = [
  'call_duration_gte',
  'call_duration_lte',
  'dialogue_date_gte',
  'dialogue_date_lte',
  'selected_marker'
] as const;

type NodeType = typeof nodeTypes[number];

const getNodeContent = (type: NodeType) => {
  switch (type) {
    case 'call_duration_gte':
      return (
        <>
          <span className="text-sm font-medium text-[#1A1A1A]">Длина звонка больше, мин</span>
          <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg">
            <span className="text-sm text-[#666666]">00:00</span>
          </div>
        </>
      );
    case 'call_duration_lte':
      return (
        <>
          <span className="text-sm font-medium text-[#1A1A1A]">Длина звонка меньше, мин</span>
          <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg">
            <span className="text-sm text-[#666666]">00:00</span>
          </div>
        </>
      );
    case 'dialogue_date_gte':
      return (
        <>
          <span className="text-sm font-medium text-[#1A1A1A]">Дата диалога от</span>
          <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg">
            <span className="text-sm text-[#666666]">01.01.2025</span>
          </div>
        </>
      );
    case 'dialogue_date_lte':
      return (
        <>
          <span className="text-sm font-medium text-[#1A1A1A]">Дата диалога до</span>
          <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg">
            <span className="text-sm text-[#666666]">01.01.2025</span>
          </div>
        </>
      );
    case 'selected_marker':
      return (
        <>
          <span className="text-sm font-medium text-[#1A1A1A]">Маркер</span>
          <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg flex-1 w-[40px]">
              <span className="text-sm text-[#666666] flex-1 ">Выберите тип</span>
              <svg 
                className="w-4 h-4 text-[#666666]" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M6 9L12 15L18 9" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
        </>
      );
  }
};

export default () => {
  const [_, setType] = useDnD();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const automations = useAutomationStore(state => state.automations);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleSave = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-[320px] h-screen sticky top-0 overflow-y-auto border-r border-l border-[#CCCCCC] flex flex-col justify-between">
        <div className="p-4">
          <div className="space-y-2 mt-[172px]">
            {nodeTypes.map((nodeType) => (
              <div
                key={nodeType}
                className="flex bg-white items-center justify-between p-4 border border-[#CCCCCC] rounded-lg cursor-move hover:border-[#0071E3] transition-colors shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]"
                draggable
                onDragStart={(event) => handleDragStart(event, nodeType)}
              >
                {getNodeContent(nodeType)}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <button 
            className="w-full py-2 px-4 bg-[#0066FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors cursor-pointer"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(automations, null, 2)}
        </pre>
      </Modal>
    </>
  );
};