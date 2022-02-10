/// <reference types="react" />
import { IGenericField, ISection } from "../../../../typedefs/IField";
interface PersistenceHandlerProps {
    fieldConfigs: {
        [key: string]: IGenericField<any, any>;
    };
    persistenceKey: string;
    sections: Array<ISection>;
}
export declare const PersistenceHandler: ({ fieldConfigs, persistenceKey, sections }: PersistenceHandlerProps) => JSX.Element;
export default PersistenceHandler;
