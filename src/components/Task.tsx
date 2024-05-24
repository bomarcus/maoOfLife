// src/components/Task.tsx

import React from 'react';
import type { Task as TaskType } from '../data/tasks';
import Subtask from './Subtask';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div>
      <h3>{task.name}</h3>
      <ul>
        {task.subtasks.map(subtask => (
          <Subtask key={subtask.id} subtask={subtask} />
        ))}
      </ul>
    </div>
  );
};

export default Task;
