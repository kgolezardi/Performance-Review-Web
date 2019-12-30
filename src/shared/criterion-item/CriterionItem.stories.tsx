import { i18n } from '@lingui/core';
import { Container, Grid } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { importMDX } from 'mdx.macro';
import React from 'react';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { CriterionItem } from './CriterionItem';

const Content = React.lazy(() => importMDX('./Content.mdx'));

storiesOf('Review', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Container>
        <Forminator onSubmit={action('submit')}>
          <DictInput>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CriterionItem
                  title={i18n._('Role Expertise and Self Development')}
                  details={<Content />}
                  prefix="organization-culture"
                />
              </Grid>
              <Grid item xs={12}>
                <CriterionItem title="روحیه‌ی کار تیمی" prefix="teamwork" />
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
