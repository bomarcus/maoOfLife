// src/components/Subtask.tsx

import React from 'react';
import type { Subtask as SubtaskType } from '../data/tasks';

interface SubtaskProps {
  subtask: SubtaskType;
}

const Subtask: React.FC<SubtaskProps> = ({ subtask }) => {
  return <li>{subtask.name}</li>;
};

export default Subtask;
