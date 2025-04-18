import { useCallback, useRef } from 'react';
import {
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  OnConnect,
} from '@xyflow/react';
import { useDnD } from '@/context/DnDContext';
import { DragEvent } from 'react';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];
 
let id = 0;
const getId = () => `dndnode_${id++}`;

export const useFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
 
  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
 
      if (!type) {
        return;
      }
 
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
 
  const onDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
    const nodeType = event.dataTransfer.getData('text/plain');
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return {
    reactFlowWrapper,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
    onDragStart,
  };
}; 