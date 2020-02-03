export type ExcludeUnknown<E extends string> = Exclude<E, '%future added value'>;
export type EnumDict<E extends string, L = string> = Record<ExcludeUnknown<E>, L>;
export function getEnumLabel<E extends string, L = string>(dict: EnumDict<E, L>, value: E, unknownLabel: L): L {
  // @ts-ignore
  const label: L | undefined = dict[value];

  return label !== undefined ? label : unknownLabel;
}
