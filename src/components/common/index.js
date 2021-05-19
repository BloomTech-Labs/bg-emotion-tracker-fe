import { StyledBtn } from './Buttons/StyledBtn';
import BackButton from './Buttons/BackButton';
import FormButton from './FormButton';
import FormInput from './FormInput';
import List from './List';
import LoadingComponent from './LoadingComponent';
import LayoutContainer from './LayoutContainer';
import { ViewSingleton } from './ViewSingleton';
import Button from './Button';
// notice we're building out a 'package' of reusables here and exporting them as an object of component properties.
// to use this, simply `import {foo, bar, baz} from '<path-to-this-directory>/ReusableComponents';`
export {
  BackButton,
  StyledBtn,
  FormButton,
  FormInput,
  LayoutContainer,
  List,
  LoadingComponent,
  Button,
  ViewSingleton,
};
