import React, { Dispatch, SetStateAction } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { i18n } from '@lingui/core';
import { useLabelWidth } from 'src/shared/hooks';

import type { Filters, Status } from './useFilters';

interface OwnProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

type Props = FCProps<OwnProps>;

export function TableFilters(props: Props) {
  const { filters, setFilters } = props;
  const { labelWidth: statusSelectLabelWidth, labelRef: statusSelectInputLabelRef } = useLabelWidth();

  return (
    <Grid container spacing={1}>
      <Grid item md={4}>
        <TextField
          fullWidth
          label={i18n._('Colleague name')}
          margin="dense"
          onChange={(e) => {
            setFilters((filters) => ({ ...filters, user: e.target.value }));
          }}
          value={filters.user}
          variant="outlined"
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          fullWidth
          label={i18n._('Manager')}
          margin="dense"
          onChange={(e) => {
            setFilters((filters) => ({ ...filters, manager: e.target.value }));
          }}
          value={filters.manager}
          variant="outlined"
        />
      </Grid>
      <Grid item md={4}>
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel ref={statusSelectInputLabelRef}>{i18n._('Evaluation Status')}</InputLabel>
          <Select
            labelWidth={statusSelectLabelWidth}
            onChange={(e) => {
              setFilters((filters) => ({ ...filters, status: e.target.value as Status }));
            }}
            value={filters.status}
          >
            <MenuItem value="all">{i18n._('All')}</MenuItem>
            <MenuItem value="todo">{i18n._('Todo')}</MenuItem>
            <MenuItem value="doing">{i18n._('Doing')}</MenuItem>
            <MenuItem value="done">{i18n._('Done')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
