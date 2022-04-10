interface IFormatFunction {
  newVal: string;
  oldVal: string;
}

export interface IInputItem {
  value: string | null;
  type?: string;
  isValid?: boolean;
  caption?: string;
  placeholder?: string;
  required?: boolean;
  formatFunction?: (data: IFormatFunction) => string;
}
