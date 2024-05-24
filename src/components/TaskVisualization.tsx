// src/components/TaskVisualization.tsx

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { tasks, TaskNode } from '../data/tasks';

interface TaskLink {
  source: string;
  target: string;
}

const flattenTasks = (tasks: (TaskNode & { subtasks?: Subtask[] })[], type: 'task' | 'subtask') => {
  const result: TaskNode[] = [];
  const links: TaskLink[] = [];

  const processTasks = (taskArray: (TaskNode & { subtasks?: Subtask[] })[], parentId?: string) => {
    taskArray.forEach(task => {
      const { subtasks, ...rest } = task;
      result.push({ ...rest, type });

      if (parentId) {
        links.push({ source: parentId, target: task.id });
      }

      if (subtasks && subtasks.length > 0) {
        processTasks(subtasks, task.id);
      }
    });
  };

  processTasks(tasks);
  return { result, links };
};

const TaskVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    const taskDataWithSubtasks = tasks.map(task => ({ ...task, type: 'task' as const }));
    const { result: taskData, links } = flattenTasks(taskDataWithSubtasks, 'task');

    const simulation = d3.forceSimulation(taskData)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    const drag = d3.drag<SVGGElement, TaskNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    const link = svg.selectAll('.link')
      .data(links)
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    const nodeGroup = svg.selectAll('.node')
      .data(taskData)
      .enter().append('g')
      .attr('class', 'node')
      .call(drag);

    const node = nodeGroup.append('circle')
      .attr('r', 20)
      .attr('fill', d => (d.type === 'task' ? 'blue' : 'green'));

    nodeGroup.append('text')
      .attr('dy', -25)
      .attr('text-anchor', 'middle')
      .text(d => d.name)
      .style('font-size', '12px')
      .style('fill', '#333');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as TaskNode).x as number)
        .attr('y1', d => (d.source as TaskNode).y as number)
        .attr('x2', d => (d.target as TaskNode).x as number)
        .attr('y2', d => (d.target as TaskNode).y as number);

      nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);

      taskData.forEach(d => {
        d.x = Math.max(20, Math.min(width - 20, d.x as number));
        d.y = Math.max(20, Math.min(height - 20, d.y as number));
      });
    });

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default TaskVisualization;
