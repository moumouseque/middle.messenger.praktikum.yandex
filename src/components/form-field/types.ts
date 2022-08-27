import { Validator } from '../../types';

export type FormFieldItemData = {
  name: string;
  type: string;
  label?: string;
  validator?: Validator;
};
