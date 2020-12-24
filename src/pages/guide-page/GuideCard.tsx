import React, { useContext } from 'react';
import { Box, Card, CardContent, CardHeader, Container, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXComponentProps, MDXContext } from '@mdx-js/react';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  title: React.ReactNode;
  Content: React.ComponentType<MDXComponentProps>;
}

type Props = FCProps<OwnProps> & StyleProps;

export function GuideCard(props: Props) {
  const { title, Content } = props;
  const classes = useStyles(props);
  const components = useContext(MDXContext);

  return (
    <Container maxWidth="md">
      <Box marginY={4}>
        <Card>
          <CardHeader title={title} classes={{ root: classes.headerRoot }} />
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

const styles = (theme: Theme) =>
  createStyles({
    headerRoot: {
      marginTop: theme.spacing(5),
    },
  });

const useStyles = makeStyles(styles, { name: 'GuideCard' });
type StyleProps = Styles<typeof styles>;
