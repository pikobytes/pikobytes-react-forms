/// <reference types="react" />
import { IDefaultUiSettings, IGenericField, ISelectCustomProperties } from '../../../typedefs/FieldConfiguration';
export declare const Autocomplete: ({ customProperties: { options, registerReturn }, fieldId, uiSettings: { disabled, description, label, placeholder, size, variant }, validation, }: IGenericField<IDefaultUiSettings, ISelectCustomProperties>) => JSX.Element;
export default Autocomplete;
