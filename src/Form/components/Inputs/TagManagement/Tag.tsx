/**
 * Created by nicolas.looschen@pikobytes.de on 16/11/20.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import {Cancel as CancelIcon} from '@mui/icons-material';
import {Card, Grid, IconButton, useTheme, Theme, Typography} from '@mui/material';


interface TagProps {
    isDelete: boolean;

    onToggleTag(
        tag: string,
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void;

    tag: string;
}

export function Tag(props: TagProps) {
    const {isDelete, onToggleTag, tag} = props;

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onToggleTag(tag, event);
    };

    const theme: Theme = useTheme();

    return (
        <Grid item xs="auto">
            <Card sx={(theme) => ({
                backgroundColor: isDelete ? theme.palette.grey["100"] : theme.palette.grey["A100"],
                colors: isDelete ? theme.palette.text.disabled : theme.palette.text.primary,
                padding: 1,
                textDecoration: isDelete ? "line-through" : "none"
            })}>
                <Grid
                    alignItems="center"
                    container
                    justifyContent="flex-end"
                    spacing={2}
                >
                    <Grid item xs="auto" sx={{maxWidth: "100%", lineBreak: "anywhere"}}>
                        <Typography>{tag}</Typography>
                    </Grid>
                    <Grid item style={{padding: `${theme.spacing(1)}px 0`}} xs="auto">
                        <IconButton onClick={onClick} sx={{padding: 0.5}}>
                            <CancelIcon sx={theme => ({
                                height: theme.spacing(2),
                                width: theme.spacing(2),
                                maxWidth: theme.spacing(2),
                                minWidth: theme.spacing(2),
                            })}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}

export default React.memo(Tag);
