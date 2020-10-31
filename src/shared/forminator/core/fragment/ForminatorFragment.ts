export interface ForminatorFragment<V = any> {
  id: string;
  $$typeof: symbol;
  $$type: [V, (v: V) => void];
}

export const isForminatorFragment = (fragment: any): fragment is ForminatorFragment => {
  return fragment.$$typeof === Symbol.for('forminator.fragment');
};
