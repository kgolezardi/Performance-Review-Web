import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function ProjectsDescriptionCard(props: Props) {
  return (
    <Card>
      <CardHeader title="مرور دستاوردها" />
      <CardContent>
        <Typography>
          توی این بخش تمرکزمون میخواد روی دستاورد ها و اثری که طی یک سال گذشته روی پروژه‌ها داشتیم باشه. برای همین از
          لیست پروژه‌ها، اونهایی که توش مشارکت داشتیم رو انتخاب می‌کنیم و نقش و دستاوردی که توی اون داشتیم رو توضیح
          میدیم. توی نوشتن دستاورد با توجه به اینکه به مباحث رفتاری یا شایستگی‌ها، توی بخش های قبل پرداختیم؛ حتما به
          صورت عینی و مشخص به کاری که انجام دادیم و نقشمون توی پیشرفت پروژه بپردازیم.
        </Typography>
        <Typography>در ادامه اثر نقشمون در پروژه رو رتبه بندی می‌کنیم.</Typography>
        <Typography>
          در آخر هم همکارایی که میخواهیم عملکردمون رو مرور کنن رو به تفکیک هر پروژه انتخاب میکنیم تا توی مرحله‌ی بعد
          عملکردمون رو مرور کنن.
        </Typography>
        <Typography>(این بخش توسط همکارانی که مرورمون می کنن و مدیر مستقیمون قابل مشاهده است.)</Typography>
      </CardContent>
    </Card>
  );
}
