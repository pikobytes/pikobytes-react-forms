/// <reference types="react" />
import { IDefaultUiSettings, IGenericField } from '../../../typedefs/IField';
export declare function DatePicker({ fieldId, uiSettings: { disabled, description, label, placeholder, size, variant, }, validation, }: IGenericField<IDefaultUiSettings, undefined>): JSX.Element;
export default DatePicker;