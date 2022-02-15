/// <reference types="react" />
import { TStringIndexableObject, TCustomMapping, TVariant, TValidationFunctionLookup } from '../../typedefs/typedefs';
import { IDefaultUiSettings, IFieldConfig } from '../../typedefs/FieldConfiguration';
interface ISectionProps {
    customMapping?: TCustomMapping;
    fieldConfigs: IFieldConfig;
    fields: Array<string>;
    loadingFields?: Array<string>;
    title?: string;
    uiSettings: TStringIndexableObject<IDefaultUiSettings>;
    variant?: TVariant;
    validationFunctionLookup?: TValidationFunctionLookup;
}
export declare const Section: ({ customMapping, fieldConfigs, fields, loadingFields, title, uiSettings, variant, validationFunctionLookup, }: ISectionProps) => JSX.Element;
export {};
