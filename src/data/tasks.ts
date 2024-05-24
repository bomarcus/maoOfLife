// src/data/tasks.ts

export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
  subtasks?: Subtask[];
}

export interface Task {
  id: string;
  name: string;
  subtasks: Subtask[];
}

export interface TaskNode {
  id: string;
  name: string;
  type: 'task' | 'subtask';
  x?: number;
  y?: number;
}

export const tasks: Task[] = [
  {
    id: '1',
    name: 'Project Setup',
    subtasks: [
      { id: '1.1', name: 'Initialize project', completed: true },
      { id: '1.2', name: 'Setup Vite', completed: true },
      { id: '1.3', name: 'Configure TypeScript', completed: true, subtasks: [
        { id: '1.3.1', name: 'Install TypeScript', completed: true },
        { id: '1.3.2', name: 'Setup tsconfig', completed: true },
      ]},
    ],
  },
  {
    id: '2',
    name: 'Task Visualization',
    subtasks: [
      { id: '2.1', name: 'Design data structure', completed: false },
      { id: '2.2', name: 'Implement D3 visualization', completed: false },
      { id: '2.3', name: 'Integrate zoom controls', completed: false },
    ],
  },
];
