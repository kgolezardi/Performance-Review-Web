import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { Evaluation } from 'src/global-types';
import { LoremIpsum } from 'lorem-ipsum';
import { i18n } from '@lingui/core';
import { storiesOf } from '@storybook/react';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';

import { CriterionOutputItem } from './CriterionOutputItem';

storiesOf('Criterion Output Item', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CriterionOutputItem
              title={i18n._('Role Expertise and Self Development')}
              evaluation={Evaluation.EXCEEDS_EXPECTATIONS}
              evidence={new LoremIpsum().generateSentences(2)}
            />
          </Grid>
          <Grid item xs={12}>
            <CriterionOutputItem
              title="روحیه‌ی کار تیمی"
              evaluation={Evaluation.MEETS_EXPECTATIONS}
              evidence={new LoremIpsum().generateSentences(2)}
            />
          </Grid>
        </Grid>
      </Container>
    );
  });
