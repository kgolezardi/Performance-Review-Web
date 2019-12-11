import { i18n } from '@lingui/core';
import { Grid } from '@material-ui/core';
import React from 'react';
import { CriterionItem } from 'src/shared/criterion-item';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { StickyActionBar } from 'src/shared/sticky-action-bar';
import { FCProps } from 'src/shared/types/FCProps';
import { CriteriaFormData } from './CriteriaPage';

interface OwnProps {
  onSubmit: (data: CriteriaFormData) => void;
}

type Props = FCProps<OwnProps>;

export function CriteriaForm(props: Props) {
  const { onSubmit } = props;

  return (
    <Forminator onSubmit={onSubmit}>
      <DictInput>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CriterionItem
              title="انطباق با فرهنگ سازمانی"
              subheader="همکاری و کار تیمی . گرایش به تعهد به کار. تعهد به نتایج. صداقت و صراحت. تلاش مستمر در مسیر رشد حرفه‌ای. دغدغه‌مند مشتاق و مؤثر در پیشرفت سحابی‌ها و سحاب."
              prefix="sahabiness"
            />
          </Grid>
          <Grid item xs={12}>
            <CriterionItem
              title="حل مسئله"
              subheader="تحقیق و تحلیل با هدف اشراف بر موضوع. تفکر خلاق. ارائه‌ی پیشنهاد راه حل قابل اجرا و چابک. بررسی راه حل‌های جایگزین. تصمیم گیری."
              prefix="problemSolving"
            />
          </Grid>
          <Grid item xs={12}>
            <CriterionItem
              title="اجرا"
              subheader="انجام کار با کیفیت با حداقل راهنمایی. برنامه‌ریزی و زمان بندی. حفظ توازن سرعت و دقت. قدرت تحلیل الگوریتمی. مستند سازی و ارتباط نوشتاری واضح، منسجم و دقیق. حجم کار Done شده."
              prefix="execution"
            />
          </Grid>
          <Grid item xs={12}>
            <CriterionItem
              title="مرجعیت تخصصی"
              subheader="یادگیری در رشد فردی. احاطه بر دانش تخصصی. آشنایی با ابزارهای کاربردی. انتخاب و تمرکز بر یک زمینه‌ی تخصصی."
              prefix="thoughtLeadership"
            />
          </Grid>
          <Grid item xs={12}>
            <CriterionItem
              title="رهبری خود ظهور"
              subheader="گرفتن هدایت مسئله‌ها و پروژه‌ها. پذیرفتن مسئولیت نتایج. Proactiveبودن."
              prefix="leadership"
            />
          </Grid>
          <Grid item xs={12}>
            <CriterionItem
              title="اثر حضور"
              subheader="ارتباط کلامی واضح، منسجم و دقیق. ارائه و دریافت بازخورد. مهارت شنیده‌شدن. حضور قابل اتکا و موثر."
              prefix="presence"
            />
          </Grid>

          <StickyActionBar elevation={4}>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Submit')}
            </SubmitButton>
          </StickyActionBar>
        </Grid>
      </DictInput>
    </Forminator>
  );
}
