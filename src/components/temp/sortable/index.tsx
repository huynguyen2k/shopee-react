import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties, ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'

import classes from './styles.module.scss'

export const courseList = [
  { id: 1, name: 'HTML' },
  { id: 2, name: 'CSS' },
  { id: 3, name: 'This is a javascript course very advanced' },
  { id: 4, name: 'React' },
  { id: 5, name: 'Vue' },
  { id: 6, name: 'Angular' },
  { id: 7, name: 'Node.js' },
  { id: 8, name: 'Express' },
]

export function SortableItem({
  id,
  children,
}: {
  id: number
  children?: ReactNode
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 500,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classes['sortable-item']}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

export function Sortable() {
  const [activeId, setActiveId] = useState<number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const [itemList, setItemList] = useState(courseList)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveId(null)

    if (!over) return

    if (active.id !== over.id) {
      setItemList(prevItemList => {
        const oldIndex = prevItemList.findIndex(item => item.id === active.id)
        const newIndex = prevItemList.findIndex(item => item.id === over.id)
        return arrayMove(prevItemList, oldIndex, newIndex)
      })
    }
  }

  console.log('render', activeId)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {createPortal(<div>Test</div>, document.body)}
      <SortableContext
        items={itemList.map(item => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className={classes['sortable-list']}>
          {itemList.map(item => (
            <SortableItem key={item.id} id={item.id}>
              {item.name}
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <div className={classes['sortable-item']}>Overlay</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
