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
export const UserRegion = 'UserRegion' as any;

const regions = [NavbarRegion, ContentRegion, BrandRegion, UserRegion];

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

  const contentChild = map.get(ContentRegion);
  const navbarChild = map.get(NavbarRegion);
  const brandChild = map.get(BrandRegion);
  const userChild = map.get(UserRegion);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.brandToolbar}>{brandChild}</div>
          {navbarChild}
          <div className={classes.userRegion}>{userChild}</div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{contentChild}</main>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  } as CSSProperties,
  appBar: {
    height: headerHeight,
  } as CSSProperties,
  toolbar: {
    paddingLeft: 0,
    height: '100%',
  } as CSSProperties,
  brandToolbar: {
    backgroundColor: theme.palette.primary.dark,
    overflow: 'hidden',
    width: brandWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: theme.spacing(2),
  } as CSSProperties,
  content: {
    flex: 1,
    marginTop: headerHeight,
    overflow: 'auto',
    maxHeight: `calc(100vh - ${headerHeight}px)`,
    position: 'relative',
  } as CSSProperties,
  userRegion: {
    marginRight: theme.spacing(8),
    marginLeft: 'auto',
  },
});

const useStyles = makeStyles(styles, { name: 'DashboardLayout' });
type StyleProps = Styles<typeof styles>;
