import { ClassKeyOfStyles, ClassNameMap } from '@material-ui/styles/withStyles';

export type Styles<S> = { classes?: Partial<ClassNameMap<ClassKeyOfStyles<S>>> };
