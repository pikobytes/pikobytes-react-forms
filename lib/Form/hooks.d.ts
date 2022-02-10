/**
 * Created by nicolas.looschen@pikobytes.de on 01.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
/**
 * Allow access to local storage
 * found here: https://usehooks-typescript.com/react-hook/use-local-storage
 * @param key
 * @param initialValue
 */
export declare function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void];
/**
 * Function to preserve previous values within a react function component.
 */
export declare function usePrevious(value: any): any;
