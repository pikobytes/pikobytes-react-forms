import { IDefaultUiSettings, IGenericField, ISection } from "../typedefs/IField";
export declare const validateConfiguration: (configuration: any, schema: Object) => unknown;
export declare const validateUiConfiguration: (configuration: any) => {
    sections?: ISection[] | undefined;
} & {
    [key: string]: IDefaultUiSettings;
};
export declare const validateFieldConfiguration: (configuration: any) => {
    [key: string]: IGenericField<any, any>;
};
