import { AppBar, Theme, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { groupChildrenByType } from 'src/shared/utils/groupChildrenByType.utils';
import { brandWidth, headerHeight } from './constants';

// typescript only allows string when it defined at `JSX.IntrinsicElements`
export const ContentRegion = 'ContentRegion' as any;
export const NavbarRegion = 'NavbarRegion' as any;
export const BrandRegion = 'BrandRegion' as any;

const regions = [NavbarRegion, ContentRegion, BrandRegion];

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

/**
 *
 * create layout structure.
 *
 * children type only can be `NavbarRegion`, `DrawerRegion`, `ContentRegion`
 *
 * @example
 ```js
 <DashboardLayout>
 <NavbarRegion>
 app bar content is here
 </NavbarRegion>
 <ContentRegion>
 main content is here
 </ContentRegion>
 </DashboardLayout>
 ```
 */
export function DashboardLayout(props: Props) {
  const classes = useStyles(props);

  const map = groupChildrenByType(props.children, regions);

  const appBarClassName = classes.appBar;

  const contentClassName = classes.content;

  const contentChild = map.get(ContentRegion);
  const navbarChild = map.get(NavbarRegion);
  const brandChild = map.get(BrandRegion);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={appBarClassName}>
        <div className={classes.brandToolbar}>{brandChild}</div>
        <Toolbar>{navbarChild}</Toolbar>
      </AppBar>
      <main className={contentClassName}>{contentChild}</main>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,
  /* ---- app bar ----*/
  appBar: {
    flexDirection: 'row',
    height: headerHeight,
  } as CSSProperties,
  /* ---- drawer ----*/
  brandToolbar: {
    backgroundColor: theme.palette.primary.dark,
    overflow: 'hidden',
    width: brandWidth,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  } as CSSProperties,

  /* ---- content ----*/
  content: {
    flex: 1,
    marginTop: headerHeight,
    overflow: 'auto',
    maxHeight: `calc(100vh - ${headerHeight}px)`,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'DashboardLayout' });
type StyleProps = Styles<typeof styles>;
