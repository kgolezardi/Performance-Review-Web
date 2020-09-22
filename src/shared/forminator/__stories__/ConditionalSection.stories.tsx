import React from 'react';
import { FormControl, InputLabel } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import ConditionalSection from '../utils/ConditionalSection';
import DictInput from '../inputs/dict-input/DictInput';
import DictInputItem from '../inputs/dict-input/DictInputItem';
import FragmentRef from '../core/fragment-lens/FragmentRef';
import SelectInput from '../inputs/SelectInput';
import SubmitButton from '../utils/SubmitButton';
import { Forminator, StringInput } from '../index';
import { useFragmentLens } from '../core/fragment-lens/useFragmentLens';

storiesOf('Forminator/Conditional Section', module)
  .add('with initial value', () => {
    const lens = useFragmentLens();
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="type">
            <div>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel>Type</InputLabel>
                <SelectInput
                  initialValue="fixed"
                  options={[
                    { value: 'fixed', label: 'Fixed' },
                    { value: 'range', label: 'Range' },
                  ]}
                />
              </FormControl>
            </div>
            <FragmentRef lens={lens} />
          </DictInputItem>
          <ConditionalSection lens={lens} condition="fixed">
            <DictInputItem field="value">
              <div>
                <StringInput label="Value" />
              </div>
            </DictInputItem>
          </ConditionalSection>
          <ConditionalSection lens={lens} condition="range">
            <DictInputItem field="start">
              <div>
                <StringInput label="Start" />
              </div>
            </DictInputItem>
            <DictInputItem field="end">
              <div>
                <StringInput label="End" />
              </div>
            </DictInputItem>
          </ConditionalSection>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })
  .add('simple', () => {
    const lens = useFragmentLens();
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="type">
            <div>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel>Type</InputLabel>
                <SelectInput
                  options={[
                    { value: 'fixed', label: 'Fixed' },
                    { value: 'range', label: 'Range' },
                  ]}
                />
                <FragmentRef lens={lens} />
              </FormControl>
            </div>
          </DictInputItem>
          <ConditionalSection lens={lens} condition="fixed">
            <DictInputItem field="value">
              <div>
                <StringInput label="Value" />
              </div>
            </DictInputItem>
          </ConditionalSection>
          <ConditionalSection lens={lens} condition="range">
            <DictInputItem field="start">
              <div>
                <StringInput label="Start" />
              </div>
            </DictInputItem>
            <DictInputItem field="end">
              <div>
                <StringInput label="End" />
              </div>
            </DictInputItem>
          </ConditionalSection>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
