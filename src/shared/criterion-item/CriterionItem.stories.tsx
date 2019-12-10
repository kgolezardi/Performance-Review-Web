import { Container, Grid } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { CriterionItem } from './CriterionItem';

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
                  title="انطباق با فرهنگ سازمانی"
                  subheader="همکاری و کار تیمی . گرایش به تعهد به کار. تعهد به نتایج. صداقت و صراحت. تلاش مستمر در مسیر رشد حرفه‌ای. دغدغه‌مند مشتاق و مؤثر در پیشرفت سحابی‌ها و سحاب."
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
