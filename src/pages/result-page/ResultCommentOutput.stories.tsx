import React from 'react';
import { ResultCommentOutput } from 'src/pages/result-page/ResultCommentOutput';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';

const value =
  'لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.';

storiesOf('Result Comment Output', module)
  .addDecorator(storyWrapperDecorator({ width: 500 }))
  .addDecorator(themeDecorator())
  .add('Simple Self Type', () => {
    return <ResultCommentOutput value={value} type="self" />;
  })
  .add('Simple Peer Type', () => {
    return <ResultCommentOutput value={value} type="peer" />;
  })
  .add('No Truncation Self Type', () => {
    return <ResultCommentOutput value={value} type="self" disableTruncating />;
  })
  .add('No Truncation Peer Type', () => {
    return <ResultCommentOutput value={value} type="peer" disableTruncating />;
  })
  .add('Null Value Self Type', () => {
    return <ResultCommentOutput value={null} type="self" />;
  })
  .add('Null Value Peer Type', () => {
    return <ResultCommentOutput value={null} type="peer" />;
  });
