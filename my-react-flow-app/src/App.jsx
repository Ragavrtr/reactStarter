import React, { useCallback,useState } from 'react';
import { applyEdgeChanges, applyNodeChanges } from 'reactflow';

import TextUpdaterNode from './TextUpdaterNode.jsx';
import './text-updater-node.css';
import CounterNode from './CounterNode';

import CustomEdge from './CustomEdge'

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: 'node-3', type: 'textUpdater', position: { x: 0, y: 200 }, data: { value: 123 } },
  { id: '4', type:"output", position: { x: 0, y: 300 }, data: { label: '4' } },
  { id: '5', type:"counterNode", position: { x: 0, y: 400 }, data: { label: '5' } },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode ,counterNode: CounterNode};

const edgeTypes = {
  'custom-edge': CustomEdge
}


const initialEdges = [
  { id: 'e1-2', type:'custom-edge',source: '1', target: '2' },
  { id: 'edge-1', source: 'node-3', target: '4', sourceHandle: 'a' },
  { id: 'edge-2', source: 'node-3', target: '4', sourceHandle: 'b' },
];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({...params,animated:true}, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        style={rfStyle}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}