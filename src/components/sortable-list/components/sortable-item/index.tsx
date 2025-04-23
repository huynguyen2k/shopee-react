import { UniqueIdentifier } from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  NewIndexGetter,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties } from 'react'

import { Item } from '../item'

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges
  disabled?: boolean
  getNewIndex?: NewIndexGetter
  id: UniqueIdentifier
  handle: boolean
  useDragOverlay?: boolean
  onRemove?(id: UniqueIdentifier): void
}

export function SortableItem({
  animateLayoutChanges,
  disabled,
  getNewIndex,
  id,
  handle,
  useDragOverlay,
  onRemove,
}: SortableItemProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
  })

  const itemStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Item
      ref={setNodeRef}
      value={id}
      disabled={disabled}
      dragging={isDragging}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      onRemove={() => onRemove?.(id)}
      wrapperStyle={itemStyle}
      listeners={listeners}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  )
}
