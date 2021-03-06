/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import { useEffect, useRef, useState } from "react";
/**
 * Allow access to local storage
 * found here: https://usehooks-typescript.com/react-hook/use-local-storage
 * @param key
 * @param initialValue
 */
export function useLocalStorage(key, initialValue) {
    // Get from local storage then
    // parse stored json or return initialValue
    var readValue = function () {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.warn("Error reading localStorage key \u201C".concat(key, "\u201D:"), error);
            return initialValue;
        }
    };
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    var _a = useState(readValue), storedValue = _a[0], setStoredValue = _a[1];
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    var setValue = function (value) {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window == 'undefined') {
            console.warn("Tried setting localStorage key \u201C".concat(key, "\u201D even though environment is not a client"));
        }
        try {
            // Allow value to be a function so we have the same API as useState
            var newValue = value instanceof Function ? value(storedValue) : value;
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(newValue));
            // Save state
            setStoredValue(newValue);
            // We dispatch a custom event so every useLocalStorage hook are notified
            window.dispatchEvent(new Event('local-storage'));
        }
        catch (error) {
            console.warn("Error setting localStorage key \u201C".concat(key, "\u201D:"), error);
        }
    };
    useEffect(function () {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(function () {
        var handleStorageChange = function () {
            setStoredValue(readValue());
        };
        // this only works for other documents, not the current one
        window.addEventListener('storage', handleStorageChange);
        // this is a custom event, triggered in writeValueToLocalStorage
        window.addEventListener('local-storage', handleStorageChange);
        return function () {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage', handleStorageChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [storedValue, setValue];
}
/**
 * Function to preserve previous values within a react function component.
 */
// @ts-ignore
export function usePrevious(value) {
    var ref = useRef();
    useEffect(function () {
        ref.current = value;
    });
    return ref.current;
}
