export interface ForminatorFragment<V = any> {
  id: string;
  $$typeof: symbol;
}

export const isForminatorFragment = (fragment: any): fragment is ForminatorFragment => {
  return fragment.$$typeof === Symbol.for('forminator.fragment');
};
