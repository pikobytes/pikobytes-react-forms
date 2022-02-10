var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FIELD_TYPES from "../../../../typedefs/FieldTypes";
import { useLocalStorage } from "../../../../hooks";
export var PersistenceHandler = function (_a) {
    var fieldConfigs = _a.fieldConfigs, persistenceKey = _a.persistenceKey, sections = _a.sections;
    var _b = useFormContext(), getValues = _b.getValues, formState = _b.formState, reset = _b.reset;
    var isSubmitting = formState.isSubmitting, isSubmitted = formState.isSubmitted;
    var _c = useLocalStorage(persistenceKey, undefined), persistedLocalForm = _c[0], setPersistedLocalForm = _c[1];
    ////
    // Handler section
    ////
    var handlePersistForm = useCallback(function () {
        var _a = getValues(), isDirtyChecker = _a.isDirtyChecker, rest = __rest(_a, ["isDirtyChecker"]);
        // only persist entries which do not have type file
        // => not able to programmatically set file fields
        // => load files from backend session
        var fileFields = [];
        sections.forEach(function (section) {
            section.fields.forEach(function (field) {
                var fieldType = fieldConfigs[field].fieldType;
                if (fieldType === FIELD_TYPES.FILE) {
                    fileFields.push(field);
                }
            });
        });
        var fieldsToPersist = Object.keys(rest)
            .filter(function (key) { return !fileFields.includes(key); })
            .reduce(function (obj, key) {
            obj[key] = rest[key];
            return obj;
        }, {});
        // persistForm if submission is not in progress or has been finished
        if (!isSubmitting && !isSubmitted) {
            setPersistedLocalForm(fieldsToPersist);
        }
    }, [fieldConfigs, getValues, isSubmitted, isSubmitting, sections, setPersistedLocalForm]);
    //
    // Persistence handling
    //
    // register persistence handler or persist form
    useEffect(function () {
        // see https://developers.google.com/web/updates/2018/07/page-lifecycle-api#the-unload-event for more information
        var terminationEvent = 'onpagehide' in window.self ? 'pagehide' : 'unload';
        window.addEventListener(terminationEvent, handlePersistForm, {
            capture: true,
        });
        return function () {
            // if the component is unmounted correctly, there is no need to persist the form on site leave/termination event
            window.removeEventListener(terminationEvent, handlePersistForm, {
                capture: true,
            });
            handlePersistForm();
        };
    }, [handlePersistForm]);
    // reset the form from local storage
    useEffect(function () {
        // ignore persistence if it is disabled
        // reset form if its the first render
        if (!isSubmitted && !isSubmitting && persistedLocalForm !== undefined) {
            reset(persistedLocalForm);
        }
    }, [persistedLocalForm, isSubmitting, isSubmitted, reset]);
    // delete the entry from local storage after submission
    useEffect(function () {
        // remove persisted form when it was submitted
        if (isSubmitted) {
            localStorage.removeItem(persistenceKey);
        }
    }, [persistenceKey, isSubmitted]);
    return _jsx(_Fragment, {}, void 0);
};
export default PersistenceHandler;
