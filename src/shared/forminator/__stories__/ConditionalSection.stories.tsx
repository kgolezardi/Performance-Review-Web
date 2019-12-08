import { FormControl, InputLabel } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDecorator } from 'src/stories/decorator';
import FragmentRef from '../core/fragment-lens/FragmentRef';
import { useFragmentLens } from '../core/fragment-lens/useFragmentLens';
import { Forminator, StringInput } from '../index';
import DictInput from '../inputs/dict-input/DictInput';
import DictInputItem from '../inputs/dict-input/DictInputItem';
import SelectInput from '../inputs/SelectInput';
import ConditionalSection from '../utils/ConditionalSection';
import SubmitButton from '../utils/SubmitButton';

storiesOf('Forminator|Conditional Section', module)
  .addDecorator(themeDecorator(false))
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
