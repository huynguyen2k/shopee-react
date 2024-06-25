import { MeasuringStrategy } from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable'

import { SortableList } from '@/components/sortable-list'

// interface Course {
//   id: number
//   name: string
// }

// const courseList: Course[] = [
//   { id: 1, name: 'HTML' },
//   { id: 2, name: 'CSS' },
//   { id: 3, name: 'This is a javascript course very advanced' },
//   { id: 4, name: 'React' },
//   { id: 5, name: 'Vue' },
//   { id: 6, name: 'Angular' },
//   { id: 7, name: 'Node.js' },
//   { id: 8, name: 'Express' },
// ]

export function Home() {
  const animateLayoutChanges: AnimateLayoutChanges = args =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true })

  return (
    <div
      style={{
        padding: '32px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: 'black',
      }}
    >
      <SortableList
        handle
        removable
        animateLayoutChanges={animateLayoutChanges}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
        items={[...Array(10)].map((_, index) => ({ id: index + 1 }))}
      />
    </div>
  )
}
