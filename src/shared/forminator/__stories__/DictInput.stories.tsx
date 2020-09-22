import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import DictInput from '../inputs/dict-input/DictInput';
import DictInputItem from '../inputs/dict-input/DictInputItem';
import SubmitButton from '../utils/SubmitButton';
import { Forminator, StringInput } from '..';

storiesOf('Forminator/Dict input', module)
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="lat">
            <StringInput label="latitude" />
          </DictInputItem>
          <DictInputItem field="lng">
            <StringInput label="longitude" />
          </DictInputItem>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })

  .add('deep path', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="location.lat">
            <StringInput label="latitude" />
          </DictInputItem>
          <DictInputItem field="location.lng">
            <StringInput label="longitude" />
          </DictInputItem>
        </DictInput>

        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })

  .add('nested', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="location">
            <DictInput>
              <DictInputItem field="lat">
                <StringInput label="latitude" />
              </DictInputItem>
              <DictInputItem field="lng">
                <StringInput label="longitude" />
              </DictInputItem>
            </DictInput>
          </DictInputItem>
        </DictInput>

        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });

storiesOf('Forminator/Dict input/with initial value', module)
  .add('on field', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="province">
            <StringInput label="province" initialValue="tehran" />
          </DictInputItem>
          <DictInputItem field="city">
            <StringInput label="city" />
          </DictInputItem>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })
  .add('on parent node', () => {
    return (
      <Forminator onSubmit={action('submit')} initialValue={{ city: 'Alamut', province: 'Qazvin', country: 'Iran' }}>
        <DictInput>
          <DictInputItem field="province">
            <StringInput label="province" initialValue="tehran" />
          </DictInputItem>
          <DictInputItem field="city">
            <StringInput label="city" />
          </DictInputItem>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })
  .add('nested on outer parent', () => {
    return (
      <Forminator
        onSubmit={action('submit')}
        initialValue={{
          address: { city: 'Alamut', province: 'Qazvin', country: 'Iran' },
        }}
      >
        <DictInput>
          <DictInputItem field="address">
            <DictInput>
              <DictInputItem field="province">
                <StringInput label="province" initialValue="tehran" />
              </DictInputItem>
              <DictInputItem field="city">
                <StringInput label="city" />
              </DictInputItem>
            </DictInput>
          </DictInputItem>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })
  .add('nested on nested parent', () => {
    return (
      <Forminator
        onSubmit={action('submit')}
        initialValue={{
          name: 'Seyyed',
          address: { city: 'Tehran', province: 'Tehran' },
        }}
      >
        <DictInput>
          <DictInputItem field="name">
            <StringInput label="name" />
          </DictInputItem>
          <br />
          <DictInputItem
            field="address"
            initialValue={{
              city: 'Alamut',
              province: 'Qazvin',
              country: 'Iran',
            }}
          >
            <DictInput>
              <DictInputItem field="province">
                <StringInput label="province" />
              </DictInputItem>
              <DictInputItem field="city">
                <StringInput label="city" />
              </DictInputItem>
            </DictInput>
          </DictInputItem>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
