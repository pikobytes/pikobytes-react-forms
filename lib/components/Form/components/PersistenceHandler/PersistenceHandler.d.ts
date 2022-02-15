/// <reference types="react" />
import { IFieldConfig } from '../../../../typedefs/FieldConfiguration';
import { ISection } from '../../../../typedefs/typedefs';
interface PersistenceHandlerProps {
    fieldConfigs: IFieldConfig;
    persistenceKey: string;
    sections: Array<ISection>;
}
export declare const PersistenceHandler: ({ fieldConfigs, persistenceKey, sections, }: PersistenceHandlerProps) => JSX.Element;
export default PersistenceHandler;
