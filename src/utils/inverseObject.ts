export function inverseObject<A extends string, B extends string>(
  obj: Record<A, B>
): Record<B, A> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [value as B]: key,
    }),
    {} as Record<B, A>
  );
}
