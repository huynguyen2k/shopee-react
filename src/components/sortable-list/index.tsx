import {
  Announcements,
  closestCenter,
  CollisionDetection,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  KeyboardSensorOptions,
  MeasuringConfiguration,
  Modifiers,
  MouseSensor,
  MouseSensorOptions,
  ScreenReaderInstructions,
  TouchSensor,
  TouchSensorOptions,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  arrayMove,
  NewIndexGetter,
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Item } from './components/item'
import { List } from './components/list'
import { SortableItem } from './components/sortable-item'
import classes from './styles.module.scss'

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
}

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
}

export interface SortableListProps<TItem> {
  mouseSensorOptions?: MouseSensorOptions
  touchSensorOptions?: TouchSensorOptions
  keyboardSensorOptions?: KeyboardSensorOptions
  animateLayoutChanges?: AnimateLayoutChanges
  adjustScale?: boolean
  collisionDetection?: CollisionDetection
  Container?: any // To-do: Fix me
  dropAnimation?: DropAnimation | null
  getNewIndex?: NewIndexGetter
  handle?: boolean
  items?: TItem[]
  measuring?: MeasuringConfiguration
  modifiers?: Modifiers
  removable?: boolean
  reorderItems?: typeof arrayMove
  strategy?: SortingStrategy
  style?: React.CSSProperties
  useDragOverlay?: boolean
  isDisabled?(id: UniqueIdentifier): boolean
}

export function SortableList<TItem extends { id: UniqueIdentifier }>({
  mouseSensorOptions,
  touchSensorOptions,
  keyboardSensorOptions = {
    coordinateGetter: sortableKeyboardCoordinates,
  },
  animateLayoutChanges,
  adjustScale = false,
  Container = List,
  collisionDetection = closestCenter,
  dropAnimation = dropAnimationConfig,
  getNewIndex,
  handle = false,
  items: initialItems = [],
  isDisabled = () => false,
  measuring,
  modifiers,
  removable,
  reorderItems = arrayMove,
  strategy = verticalListSortingStrategy,
  style,
  useDragOverlay = true,
}: SortableListProps<TItem>) {
  const isFirstAnnouncement = useRef(true)

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [itemList, setItemList] = useState(initialItems)

  const sensors = useSensors(
    useSensor(MouseSensor, mouseSensorOptions),
    useSensor(TouchSensor, touchSensorOptions),
    useSensor(KeyboardSensor, keyboardSensorOptions),
  )

  const getIndex = (id: UniqueIdentifier) =>
    itemList.findIndex(item => item.id === id)
  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1
  const activeIndex = activeId ? getIndex(activeId) : -1

  const handleRemove = removable
    ? (id: UniqueIdentifier) =>
        setItemList(prevItemList => prevItemList.filter(item => item.id !== id))
    : undefined

  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id,
      )}. Sortable item ${id} is in position ${getPosition(id)} of ${
        itemList.length
      }`
    },
    onDragOver({ active, over }) {
      // In this specific use-case, the picked up item's `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn't need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false
        return
      }

      if (over) {
        return `Sortable item ${
          active.id
        } was moved into position ${getPosition(over.id)} of ${itemList.length}`
      }
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${
          active.id
        } was dropped at position ${getPosition(over.id)} of ${itemList.length}`
      }
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id,
      )} of ${itemList.length}.`
    },
  }

  useEffect(() => {
    if (activeId === null) {
      isFirstAnnouncement.current = true
    }
  }, [activeId])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      setItemList(prevItemList =>
        reorderItems(prevItemList, activeIndex, getIndex(over.id)),
      )
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      accessibility={{ announcements, screenReaderInstructions }}
      measuring={measuring}
      modifiers={modifiers}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className={classes.wrapper} style={style}>
        <SortableContext items={itemList} strategy={strategy}>
          <Container>
            {itemList.map(item => (
              <SortableItem
                key={item.id}
                id={item.id}
                handle={handle}
                disabled={isDisabled(item.id)}
                onRemove={handleRemove}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                getNewIndex={getNewIndex}
              />
            ))}
          </Container>
        </SortableContext>
      </div>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                <Item
                  value={itemList[activeIndex].id}
                  handle={handle}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body,
          )
        : null}
    </DndContext>
  )
}
