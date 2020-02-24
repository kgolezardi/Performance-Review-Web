import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { ClassKeyOfStyles } from '@material-ui/styles/withStyles';

export type Styles<S> = { classes?: Partial<ClassNameMap<ClassKeyOfStyles<S>>> };
