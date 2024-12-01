import { useSyncExternalStore } from 'react'

interface ScrollPosition {
  scrollX: number
  scrollY: number
}

let scroll: ScrollPosition = {
  scrollX: window.scrollX,
  scrollY: window.scrollY,
}
let hasSubscribedScrollEvent = false
const listeners = new Set<VoidFunction>()

const emitChange = () => {
  listeners.forEach(listener => listener())
}

const handleScroll = () => {
  scroll = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  }
  emitChange()
}

const scrollStore = {
  subscribe(listener: VoidFunction) {
    listeners.add(listener)
    if (!hasSubscribedScrollEvent) {
      hasSubscribedScrollEvent = true
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      listeners.delete(listener)
      if (!listeners.size) {
        hasSubscribedScrollEvent = false
        window.removeEventListener('scroll', handleScroll)
      }
    }
  },
  getSnapshot<TResult>(selector: (scroll: ScrollPosition) => TResult) {
    return () => selector(scroll)
  },
}

export const useWindowScroll = <TResult = ScrollPosition>(
  selector?: (scroll: ScrollPosition) => TResult,
) => {
  return useSyncExternalStore(
    scrollStore.subscribe,
    scrollStore.getSnapshot(selector ?? (scroll => scroll as TResult)),
  )
}
