import queryString from 'query-string'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnyObject, InferType, ObjectSchema } from 'yup'

/**
 * `useSearchParams` is a custom hook for managing search parameters based on a schema.
 * It uses the `yup` library for type casting and the `query-string` library for parsing and stringifying the search parameters.
 * It also uses the `useLocation` and `useNavigate` hooks from `react-router-dom` for getting the current location and navigating to a new one.
 *
 * @template T - A yup `ObjectSchema` that describes the shape of the search parameters.
 *
 * @param {T} schema - The schema describing the expected search parameters. This is used for casting the search parameters to their correct types.
 *
 * `Note`: The `defaultParams` will be get from the schema so if a property of schema is `defined` or `required`, it must be set a default value if not it will throw an error when casting the search parameters.
 *
 * @returns {[InferType<T>, (params: InferType<T>) => void]} A tuple containing the current search parameters and a function to update them.
 * The current search parameters are derived from the location's query string and are cast to their correct types according to the schema.
 * The update function takes an object of search parameters and navigates to the new location with the updated search parameters in the query string.
 * If the current search parameters in the location's query string are not valid according to the schema, the hook will automatically navigate to the location with the default search parameters defined in the schema.
 *
 * @example
 * ```ts
 * const schema = yup.object().shape({
 *   page: yup.number().default(1),
 *   search: yup.string().default(''),
 *   isSale: yup.boolean().nullable(),
 *   categories: yup.array(yup.string().defined()).default([]),
 * });
 *
 * const [searchParams, setSearchParams] = useSearchParams(schema);
 * ```
 */
export function useSearchParams<
  T extends ObjectSchema<object, AnyObject, Record<keyof object, undefined>>,
>(schema: T): [InferType<T>, (params: InferType<T>) => void] {
  const location = useLocation()
  const navigate = useNavigate()

  const hasErrorRef = useRef(false)

  const setSearchParams = useCallback(
    (params: InferType<T>) => {
      const qs = `?${queryString.stringify(params)}`
      navigate(qs)
    },
    [navigate],
  )

  const defaultParams = useMemo(() => schema.getDefault(), [schema])

  const searchParams = useMemo(() => {
    const qsParams = queryString.parse(location.search)

    try {
      return schema.cast(qsParams, { stripUnknown: true })
    } catch (error) {
      console.error('Error casting search params:', error)

      hasErrorRef.current = true
      return defaultParams
    }
  }, [defaultParams, location.search, schema])

  useEffect(() => {
    if (hasErrorRef.current) {
      hasErrorRef.current = false
      setSearchParams(defaultParams)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultParams, setSearchParams, hasErrorRef.current])

  return [searchParams, setSearchParams]
}
