import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties, PropsWithChildren, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import classes from './styles.module.scss'

export const courseList = [
  { id: 1, name: 'HTML' },
  { id: 2, name: 'CSS' },
  { id: 3, name: 'JavaScript' },
  { id: 4, name: 'React' },
  { id: 5, name: 'Vue' },
  { id: 6, name: 'Angular' },
  { id: 7, name: 'Node.js' },
  { id: 8, name: 'Express' },
]

export function Droppable({ id, children }: PropsWithChildren<{ id: number }>) {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={classes['droppable-container']}
      style={{ backgroundColor: isOver ? 'green' : undefined }}
    >
      {children}
    </div>
  )
}

export function Draggable() {
  const id = useId()
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, transform } =
    useDraggable({
      id: `draggable-${id}`,
    })

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} className={classes['draggable-item']} style={style}>
      <button
        ref={setActivatorNodeRef}
        type="button"
        {...listeners}
        {...attributes}
      />
    </div>
  )
}

export function DraggableList() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  )

  const containers = [1, 2, 3]
  const [activeId, setActiveId] = useState<number | null>(null)

  const [droppedId, setDroppedId] = useState<number | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    console.log('drag start')

    setActiveId(event.active.id as number)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('drag end')

    setDroppedId(event.over ? (event.over.id as number) : null)
    setActiveId(null)
  }

  return (
    <DndContext
      autoScroll={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={event => console.log('drag cancel', event)}
      sensors={sensors}
    >
      <div>
        {containers.map(id => (
          <Droppable key={id} id={id}>
            {id === droppedId ? <Draggable /> : 'Drop here!'}
          </Droppable>
        ))}
        <div className={classes['draggable-list']}>
          {droppedId === null ? <Draggable /> : null}
        </div>
      </div>

      {createPortal(
        <DragOverlay
          dropAnimation={{ duration: 1000 }}
          modifiers={[restrictToWindowEdges]}
          wrapperElement="section"
          zIndex={100}
        >
          {activeId ? (
            <div className={classes['draggable-item']}>Drag overlay</div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
