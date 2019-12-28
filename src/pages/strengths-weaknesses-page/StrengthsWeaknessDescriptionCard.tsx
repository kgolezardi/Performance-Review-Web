import { Card, CardContent, CardHeader, Container, Typography } from '@material-ui/core';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function StrengthsWeaknessDescriptionCard(props: Props) {
  return (
    <Card>
      <CardHeader title="مرور ویژگی‌های بارز" />
      <CardContent>
        <Container maxWidth="sm">
          <Typography>
            توی یک سال گذشته هر کدوم از ما ویژگی های مفید و مثبتی از خودمون نشون دادیم که وقتی به گدشته نگاه میکنیم نقاط
            قوت رفتاریمون هستن و علاقمند هستیم این رفتارها یا ویژگی ها رو ادامه بدیم یا حتی تقویت کنیم. از طرفی
            رفتارهایی داشتیم که شاید با نگاه به گذشته و اثرات اونها، به نظرمون بیاد که باید این رفتارها رو کنار بذاریم
            یا روی اون ویژگیمون کار کنیم که اثرات منفی توی عملکردمون نداشته باشه.
          </Typography>
          <Typography>
            توی این بخش حداکثر ۳ تا مهمترین ویژگی یا رفتاری که باید ادامه شون بدیم و حداکثر ۳ تا مهمترین ویژگی یا رفتاری
            که باید توی خودمون بهبود بدیم تا عملکردمون تقویت بشه رو می نویسیم.
          </Typography>
          <Typography>(این بخش فقط توسط مدیر مستقیممون قابل مشاهده است)</Typography>
        </Container>
      </CardContent>
    </Card>
  );
}
