/* eslint-disable jsdoc/require-description-complete-sentence */
/* eslint-disable jsdoc/match-description */
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

const ColoredSwitch = withStyles({
  checked: {},
  bar: {
    backgroundColor: '#ffffff'
  },
  colorPrimary: {
    '&$checked + $bar': {
      color: 'rgb(61, 165, 243)',
      backgroundColor: 'rgb(61, 165, 243)'
    }
  }
})(Switch);

/**
 * Wrapper for Material UI switch component. Supply off and on label text with `off` being the left label and `on` being the right label. Only one label is required.
 * Style rule names: https://material-ui.com/api/switch/#css
 *
 * @param {object} props - Props to use for this instantiation.
 * @param {Function} props.changeHandler - The on change handler function for when the switch is interacted with.
 * @param {object} props.labels - The labels to use.
 * @param {string} props.labels.off - The left label to use. Optional.
 * @param {string} props.labels.on - The right label to use. Optional.
 * @param {boolean} props.initialState - The initial state of the switch; false = off & true = on. Modifies the `checked` prop on the <Switch /> component.
 * @param {boolean} props.disabled - Whether or not the component will be interactable (enabled).
 * @param {boolean} props.required - If `true`, the component is required.
 * @param {string} props.size - `small` | `medium`. The size of the switch. `small` is equivalent to the dense switch styling.
 * @returns {SwitchToggle} - Switch component with off/on labels.
 */
class SwitchToggle extends React.PureComponent {
  render() {
    const {
      changeHandler,
      switchClass,
      initialState,
      labels,
      disabled,
      required,
      size
    } = this.props;

    // If only one label is provided, use different spacing.
    const labelKeys = Object.keys(labels);
    const spacing = labelKeys.length > 0 ? 8 : 0;
    const labelLeft = labels['off'] ? labels['off'] : null;
    const labelRight = labels['on'] ? labels['on'] : null;

    return (
      <FormGroup className={ switchClass }>
        <Typography component='div'>
          <Grid component='label' container alignItems='center' spacing={ spacing }>
            {labelLeft !== null ? <Grid item>{labelLeft}</Grid> : null}
            <Grid item>
              <ColoredSwitch
                checked={ initialState }
                color={ 'primary' }
                disabled={ disabled }
                onChange={ changeHandler('checked') }
                required={ required }
                size={ size }
                value='checked'
              />
            </Grid>
            {labelRight !== null ? <Grid item>{labelRight}</Grid> : null}
          </Grid>
        </Typography>
      </FormGroup>
    );
  }
}

export default SwitchToggle;