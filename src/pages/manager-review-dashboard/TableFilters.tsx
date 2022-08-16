import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { getOptionsFromDictionary } from 'src/shared/utils/getOptionsFromDictionary';
import { i18n } from '@lingui/core';
import { peerReviewEvaluationDictionary } from 'src/global-types';
import { useLabelWidth } from 'src/shared/hooks';

import type { Filters, OverallRating, Status } from './useFilters';

interface OwnProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

type Props = FCProps<OwnProps>;

export function TableFilters(props: Props) {
  const { filters, setFilters } = props;
  const { labelWidth: statusSelectLabelWidth, labelRef: statusSelectInputLabelRef } = useLabelWidth();
  const {
    labelWidth: overallEvaluationSelectLabelWidth,
    labelRef: overallEvaluationSelectInputLabelRef,
  } = useLabelWidth();

  const options = useMemo(() => getOptionsFromDictionary(peerReviewEvaluationDictionary), []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
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
      <Grid item xs={3}>
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
      <Grid item xs={3}>
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
      <Grid item xs={3}>
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel ref={overallEvaluationSelectInputLabelRef}>{i18n._('Overall Evaluation')}</InputLabel>
          <Select
            labelWidth={overallEvaluationSelectLabelWidth}
            onChange={(e) => {
              setFilters((filters) => ({ ...filters, overallRating: e.target.value as OverallRating }));
            }}
            value={filters.overallRating}
          >
            <MenuItem value="all">{i18n._('All')}</MenuItem>
            {options.map((option, index) => {
              return (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
