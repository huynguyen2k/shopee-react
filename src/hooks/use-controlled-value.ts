/* eslint-disable react-hooks/rules-of-hooks */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export type UseControlledValueProps<T = unknown> = {
  /**
   * Holds the component value when it's controlled.
   */
  value: T | undefined
  /**
   * The default value when uncontrolled.
   */
  defaultValue: T | undefined
  /**
   * The component name displayed in warnings.
   */
  name: string
  /**
   * The name of the state variable displayed in warnings.
   */
  state?: string
}

export function useControlledValue<T = unknown>({
  value,
  defaultValue,
  name,
  state = 'value',
}: UseControlledValueProps<T>) {
  const isControlled = useRef(value !== undefined)
  const [valueState, setValueState] = useState<T | undefined>(defaultValue)
  const currentValue = (isControlled.current ? value : valueState) as T

  if (process.env.NODE_ENV !== 'production') {
    useEffect(() => {
      if (isControlled.current !== (value !== undefined)) {
        console.error(
          [
            `A component is changing the ${
              isControlled.current ? 'controlled' : 'uncontrolled'
            } ${state} state of ${name} to be ${
              isControlled.current ? 'uncontrolled' : 'controlled'
            }.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${name} ` +
              'element for the lifetime of the component.',
            "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        )
      }
    }, [name, state, value])

    const initialDefaultValue = useRef(defaultValue)

    useEffect(() => {
      if (
        !isControlled.current &&
        !Object.is(initialDefaultValue.current, defaultValue)
      ) {
        console.error(
          [
            `A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join('\n'),
        )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValue)])
  }

  const setValueIfUncontrolled: Dispatch<SetStateAction<T | undefined>> =
    useCallback((newValue: SetStateAction<T | undefined>) => {
      if (!isControlled.current) {
        setValueState(newValue)
      }
    }, [])

  return [currentValue, setValueIfUncontrolled] as const
}
