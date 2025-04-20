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
import { Automation } from '@/api/types';
import { mapContentToObject } from '@/utils/contentMapper';
import { v4 as uuidv4 } from 'uuid';


export const useFlow = (automation: Automation) => {
  const reactFlowWrapper = useRef(null);
  const initialNodes = automation.components.map((component, index) => {
    const content = mapContentToObject(component.content);
    return {
      id: component.id,
      type: 'custom',
      data: { ...content, type: component.type_object },
      position: { x: 250, y: 5 + index * 100 },
    }
  });
  const initialEdges = automation.components.map((component) => {
    return {
      id: uuidv4(),
      source: component.target,
      target: component.id,
    }
  });
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
        id: uuidv4(),
        type: 'custom',
        position,
        data: { label: `${type} node`, type },
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