import { useDnD } from '@/context/DnDContext';
 
export default () => {
  const [_, setType] = useDnD();
 
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside className="w-[320px] px-5 border-l border-r border-gray-300 mr-[50px]  pt-[172px]">
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};