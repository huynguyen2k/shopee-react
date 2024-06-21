export type OverrideProps<TObject, TOverrideObject> = Omit<
  TObject,
  keyof TOverrideObject
> &
  TOverrideObject
