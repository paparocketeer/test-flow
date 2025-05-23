import { memo } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import InputMask from 'react-input-mask';
import { format, parse } from 'date-fns';
import { useAutomationStore } from '@/store/automationStore';
import RobotIcon from './RobotIcon';

const CustomNode = ({ data, id }: { data: { label: string; type: string, value: string, options?: { id: string; label: string; }[], automationId: string }, id: string }) => {
  const { setNodes, setEdges } = useReactFlow();
  const updateAutomationById = useAutomationStore(state => state.updateAutomationById);
  const deleteComponent = useAutomationStore(state => state.deleteComponent);
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    deleteComponent(data.automationId, id);
  };

  const handleValueChange = (value: string, field: string) => {
    setNodes((nodes) => nodes.map((node) => {
      if (node.id === id) {
        return { ...node, data: { ...node.data, value } };
      }
      return node;
    }));
    updateAutomationById(data.automationId, id, value, field);
  };

  const getNodeContent = () => {
    switch (data.type) {
      case 'call_duration_gte':
        return (
          <>
            <span className="text-sm font-medium text-[#1A1A1A]">Длина звонка больше, мин</span>
            <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg">
              <InputMask
                mask="999:99"
                maskChar={null}
                className="text-sm text-[#666666] bg-transparent outline-none w-16"
                defaultValue={data.value}
                onChange={(e) => handleValueChange(e.target.value, 'duration_minutes')}
              />
            </div>
          </>
        );
      case 'call_duration_lte':
        return (
          <>
            <span className="text-sm font-medium text-[#1A1A1A]">Длина звонка меньше, мин</span>
            <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg">
              <InputMask
                mask="999:99"
                maskChar={null}
                className="text-sm text-[#666666] bg-transparent outline-none w-16"
                defaultValue={data.value}
                onChange={(e) => handleValueChange(e.target.value, 'duration_minutes')}
              />
            </div>
          </>
        );
      case 'dialogue_date_gte':
        return (
          <>
            <span className="text-sm font-medium text-[#1A1A1A]">Дата диалога от</span>
            <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg">
              <input
                type="date"
                className="text-sm text-[#666666] bg-transparent outline-none"
                value={data.value ? format(parse(data.value, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd') : ''}
                onChange={(e) => handleValueChange(format(new Date(e.target.value), 'dd.MM.yyyy'), 'duration_minutes')}
              />
            </div>
          </>
        );
      case 'dialogue_date_lte':
        return (
          <>
            <span className="text-sm font-medium text-[#1A1A1A]">Дата диалога до</span>
            <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg">
              <input
                type="date"
                className="text-sm text-[#666666] bg-transparent outline-none"
                value={data.value ? format(parse(data.value, 'dd.MM.yyyy', new Date()), 'yyyy-MM-dd') : ''}
                onChange={(e) => handleValueChange(format(new Date(e.target.value), 'dd.MM.yyyy'), 'duration_minutes')}
              />
            </div>
          </>
        );
      case 'automation_agent':
        return (
          <>
            <div className='flex items-center gap-3'>
              <RobotIcon />
              <div className='flex flex-col gap-2'>
                <span className="text-sm font-medium text-[#000000]">{`Агент возражений ${data.label}`}</span>
                <span className="text-sm text-[#666666]">Агент</span>
              </div>
            </div>
          </>
        );
      case 'selected_marker':
        return (
          <>
            <span className="text-sm font-medium text-[#1A1A1A]">Маркер</span>
            <div className="flex items-center gap-2 px-3 py-2 border border-[#CCCCCC] rounded-lg flex-1">
              <select
                className="text-sm text-[#666666] bg-transparent outline-none w-full"
                value={data.value}
                onChange={(e) => handleValueChange(e.target.value, 'value')}
              >
                {data.options?.map((option: { id: string; label: string; }) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      default:
        return <span>{data.label}</span>;
    }
  };

  return (
    <div className={`flex items-center gap-3 pl-3 pr-6 py-2 bg-white rounded shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] relative ${data.type === 'automation_agent' ? 'border-l-4 border-l-[#52C41A]' : ''}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-[#CCCCCC] border-2 border-white" />
      {getNodeContent()}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-[#CCCCCC] border-2 border-white" />
      <button 
        className="absolute top-1 right-1 w-5 h-5 bg-transparent rounded-full flex items-center justify-center hover:bg-gray-100"
        onClick={handleDelete}
      >
        <svg 
          className="w-3 h-3 text-[#666666]" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M18 6L6 18M6 6L18 18" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default memo(CustomNode);
