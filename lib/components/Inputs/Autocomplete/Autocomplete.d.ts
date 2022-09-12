/// <reference types="react" />
import { IAutocompleteCustomProperties, IDefaultUiSettings, IGenericField } from '../../../typedefs/FieldConfiguration';
export declare const Autocomplete: ({ customProperties: { options, registerReturn, ...rest }, fieldId, uiSettings: { disabled, description, label, placeholder, size, variant }, validation, }: IGenericField<IDefaultUiSettings, IAutocompleteCustomProperties>) => JSX.Element;
export default Autocomplete;
