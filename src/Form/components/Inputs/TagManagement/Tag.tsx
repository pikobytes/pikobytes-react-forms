/**
 * Created by nicolas.looschen@pikobytes.de on 16/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import {Cancel as CancelIcon} from '@mui/icons-material';
import { Card, Grid, IconButton, useTheme, Theme, Typography} from '@mui/material';


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: (props: { isDelete: boolean }) => ({
//       backgroundColor: props.isDelete
//         ? theme.palette.grey['100']
//         : theme.palette.grey.A100,
//       color: props.isDelete
//         ? theme.palette.text.disabled
//         : theme.palette.text.primary,
//       padding: theme.spacing(1),
//       textDecoration: props.isDelete ? 'line-through' : 'none',
//     }),
//     button: {
//       padding: theme.spacing(0.5),
//     },
//     icon: {
//       height: theme.spacing(2),
//       width: theme.spacing(2),
//       minWidth: theme.spacing(2),
//       minHeight: theme.spacing(2),
//     },
//     tagLabel: {
//       maxWidth: '100%',
//       lineBreak: 'anywhere',
//     },
//   })
// );

interface TagProps {
  isDelete: boolean;
  onToggleTag(
    tag: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void;
  tag: string;
}

export function Tag(props: TagProps) {
  const { isDelete, onToggleTag, tag } = props;

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onToggleTag(tag, event);
  };

  const theme: Theme = useTheme();

  // const classes = useStyles({ isDelete });

  return (
    <Grid item xs="auto">
      <Card >
        <Grid
          alignItems="center"
          container
          justifyContent="flex-end"
          spacing={2}
        >
          <Grid  item xs="auto">
            <Typography>{tag}</Typography>
          </Grid>
          <Grid item style={{ padding: `${theme.spacing(1)}px 0` }} xs="auto">
            <IconButton  onClick={onClick}>
                <CancelIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default React.memo(Tag);
