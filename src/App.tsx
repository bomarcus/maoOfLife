// src/App.tsx

import React from 'react';
import TaskVisualization from './components/TaskVisualization';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Visualization</h1>
      </header>
      <main>
        <TaskVisualization />
      </main>
    </div>
  );
};

export default App;
