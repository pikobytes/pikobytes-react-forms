/**
 * Created by nicolas.looschen@pikobytes.de on 28/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { FallbackProps } from 'react-error-boundary';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     title: {
//       marginBottom: theme.spacing(2),
//     },
//   })
// );

export function FormErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {

  return (
    <Grid item xs={12}>
      <Typography variant="h4">
        Something went wrong:
      </Typography>
      <Typography align="center" variant="h6">
        {error?.message}
      </Typography>
      <Grid container justifyContent="flex-end">
        <Grid item xs="auto">
          <Button
            color="primary"
            onClick={resetErrorBoundary}
            variant="contained"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FormErrorFallback;
