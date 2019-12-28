import { Card, CardContent, CardHeader, Container, Typography } from '@material-ui/core';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function CriteriaDescriptionCard(props: Props) {
  return (
    <Card>
      <CardHeader title="مرور شایستگی‌های عملکردی" />
      <CardContent>
        <Container maxWidth="sm">
          <Typography>
            توی این بخش قراره توی ۶ شایستگی به خودمون رتبه بدیم و شواهدی که مؤید رتبه‌ی مد نظرمون هست رو بنویسیم.
          </Typography>
          <Typography>(این بخش فقط توسط مدیر مستقیممون قابل مشاهده است)</Typography>
        </Container>
      </CardContent>
    </Card>
  );
}
