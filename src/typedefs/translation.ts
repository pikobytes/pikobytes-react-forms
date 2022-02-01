/**
 * Created by nicolas.looschen@pikobytes.de on 3/12/21.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export interface ITranslationFunction {
  (input: string): string;

  (input: string, options: { count: number }): string;

  (input: string, translationFunction: ITranslationFunction): string;
}
