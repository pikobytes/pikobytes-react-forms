/**
 * Created by nicolas.looschen@pikobytes.de on 15.02.22
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import React from 'react';
import { alpha, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { joinInCustomValidation } from '../../util/validation';
import { applyConditions } from '../Form/util';
import { mapField } from '../../util/fieldMapper';
import {
  TStringIndexableObject,
  TCustomMapping,
  TVariant,
} from '../../typedefs/typedefs';
import {
  IDefaultUiSettings,
  IFieldConfig,
} from '../../typedefs/FieldConfiguration';
import { E_CONDITION_EFFECTS } from '../../typedefs/ConditionalFields';

interface ISectionProps {
  customMapping?: TCustomMapping;
  fieldConfigs: IFieldConfig;
  fields: Array<string>;
  loadingFields?: Array<string>;
  title?: string;
  uiSettings: TStringIndexableObject<IDefaultUiSettings>;
  variant?: TVariant;
}

export const Section = ({
  customMapping,
  fieldConfigs,
  fields,
  loadingFields,
  title,
  uiSettings,
  variant,
}: ISectionProps) => {
  const { getValues } = useFormContext();

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ paddingBottom: 4 }}
    >
      {title !== undefined && (
        <Grid item xs={12}>
          <Typography
            color="primary"
            variant="h3"
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: 20,
              textTransform: 'uppercase',
              borderBottom:
                '1px solid ' + alpha(theme.palette.primary.main, 0.3),
              mt: 3,
              mb: 1,
            })}
          >
            {title}
          </Typography>
        </Grid>
      )}

      {fields.map((field) => {
        let fieldConfig;

        try {
          fieldConfig = fieldConfigs[field];
        } catch (e) {
          console.error(
            `Error trying to access configuration for field "${field}". Check if it is defined in the configuration.`
          );
          throw new Error(`Invalid configuration.`);
        }

        const { condition, customProperties, fieldType, validation } =
          fieldConfig;
        const fieldUiSettings = uiSettings[field];

        const { customValidationFunctions, ...rest } = validation ?? {};

        const loading =
          loadingFields !== undefined && loadingFields.includes(field);

        const validationRules = {
          ...(customValidationFunctions !== undefined &&
            joinInCustomValidation(customValidationFunctions)),
          ...rest,
        };

        const { effect, isMet } = applyConditions(getValues(), condition);
        const FieldComponent = mapField(fieldType, customMapping);

        const uiSettingsWithConditionsApplied = Object.assign(
          {},
          {
            disabled: effect === E_CONDITION_EFFECTS.ENABLE && !isMet,
            variant,
          },
          fieldUiSettings
        );

        return (effect === E_CONDITION_EFFECTS.DISPLAY && isMet) ||
          effect !== E_CONDITION_EFFECTS.DISPLAY ? (
          <Grid key={field} item xs={fieldUiSettings.columns ?? 12}>
            <FieldComponent
              customProperties={customProperties}
              loading={loading}
              fieldId={field}
              fieldType={fieldType}
              uiSettings={uiSettingsWithConditionsApplied}
              validation={validationRules}
            />
          </Grid>
        ) : (
          <></>
        );
      })}
    </Grid>
  );
};
