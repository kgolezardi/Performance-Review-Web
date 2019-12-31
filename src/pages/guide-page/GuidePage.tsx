import { i18n } from '@lingui/core';
import { Box, Card, CardContent, CardHeader, Container, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
// @ts-ignore
import { MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import React, { useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

const Content = React.lazy(() => importMDX('./Content.mdx'));

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function GuidePage(props: Props) {
  const classes = useStyles(props);
  const components = useContext(MDXContext);

  return (
    <Container maxWidth="md">
      <Box marginY={2}>
        <Card>
          <CardHeader
            title={i18n._('How to give feedback to each other?')}
            subheader={i18n._('A guide to Nonviolent Communication(NVC)')}
            classes={{ root: classes.headerRoot }}
          />
          <CardContent>
            <Box padding={4} paddingTop={0}>
              <Content components={components} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

const styles = (theme: Theme) => ({
  headerRoot: {
    marginTop: theme.spacing(5),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'GuidePage' });
type StyleProps = Styles<typeof styles>;
