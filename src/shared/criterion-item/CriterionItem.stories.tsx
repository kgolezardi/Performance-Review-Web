import { i18n } from '@lingui/core';
import { Container, Grid } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { promptDecorator, routerDecorator, themeDecorator } from 'src/stories/decorators';
import { CriterionItem } from './CriterionItem';

storiesOf('Criterion Item', module)
  .addDecorator(themeDecorator())
  .addDecorator(promptDecorator())
  .addDecorator(routerDecorator())
  .add('simple', () => {
    return (
      <Container>
        <Forminator onSubmit={action('submit')}>
          <DictInput>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CriterionItem
                  type="self"
                  title={i18n._('Role Expertise and Self Development')}
                  details="Demonstrates role knowledge, skills, and procedures Commitment to growth and development"
                  prefix="organization-culture"
                />
              </Grid>
              <Grid item xs={12}>
                <CriterionItem type="peer" title="روحیه‌ی کار تیمی" prefix="teamwork" />
              </Grid>
              <Grid item>
                <SubmitButton variant="contained" color="primary">
                  ثبت
                </SubmitButton>
              </Grid>
            </Grid>
          </DictInput>
        </Forminator>
      </Container>
    );
  });
