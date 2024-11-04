import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import { ColumnId } from './KanbanBoard';
import { TypographyMuted, TypographySmall } from './typography/typograpgy';
import { Badge } from './ui/badge';

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
  title: string;
  number: string;
  type: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task',
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary',
      },
    },
  });
  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
      })} border border-primary/20`}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-primary/20 relative">
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className="p-1 text-primary/80 -ml-2 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <Badge
          variant={'outline'}
          className="ml-auto font-semibold border border-primary/50"
        >
          {task.type !== 'task' ? 'Anotação' : `Pendência: ${task.number}`}
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        <div className="space-y-2">
          <TypographySmall>{task.title}</TypographySmall>
          <TypographyMuted>{task.content}</TypographyMuted>
        </div>
      </CardContent>
    </Card>
  );
}
