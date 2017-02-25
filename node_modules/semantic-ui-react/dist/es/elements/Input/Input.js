import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _includes from 'lodash/includes';
import _map from 'lodash/map';
import _isNil from 'lodash/isNil';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import _get from 'lodash/get';

import React, { Children, cloneElement, Component, PropTypes } from 'react';
import cx from 'classnames';

import { createHTMLInput, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, META, SUI, useKeyOnly, useValueAndKey } from '../../lib';
import Button from '../../elements/Button';
import Icon from '../../elements/Icon';
import Label from '../../elements/Label';

export var htmlInputPropNames = [
// REACT
'selected', 'defaultValue', 'defaultChecked',

// LIMITED HTML PROPS
'autoCapitalize', 'autoComplete', 'autoFocus', 'checked', 'form', 'max', 'maxLength', 'min', 'name', 'pattern', 'placeholder', 'readOnly', 'required', 'step', 'type', 'value',

// Heads Up!
// Do not pass disabled, it duplicates the SUI CSS opacity rule.
// 'disabled',

// EVENTS
// keyboard
'onKeyDown', 'onKeyPress', 'onKeyUp',

// focus
'onFocus', 'onBlur',

// form
'onChange', 'onInput',

// mouse
'onClick', 'onContextMenu', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp',

// selection
'onSelect',

// touch
'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];

/**
 * An Input is a field used to elicit a response from a user.
 * @see Button
 * @see Form
 * @see Icon
 * @see Label
 */

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e) {
      var value = _get(e, 'target.value');

      var onChange = _this.props.onChange;

      if (onChange) onChange(e, _extends({}, _this.props, { value: value }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          action = _props.action,
          actionPosition = _props.actionPosition,
          children = _props.children,
          className = _props.className,
          disabled = _props.disabled,
          error = _props.error,
          fluid = _props.fluid,
          focus = _props.focus,
          icon = _props.icon,
          iconPosition = _props.iconPosition,
          input = _props.input,
          inverted = _props.inverted,
          label = _props.label,
          labelPosition = _props.labelPosition,
          loading = _props.loading,
          onChange = _props.onChange,
          size = _props.size,
          tabIndex = _props.tabIndex,
          transparent = _props.transparent,
          type = _props.type;


      var classes = cx('ui', size, useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(fluid, 'fluid'), useKeyOnly(focus, 'focus'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(transparent, 'transparent'), useValueAndKey(actionPosition, 'action') || useKeyOnly(action, 'action'), useValueAndKey(iconPosition, 'icon') || useKeyOnly(icon, 'icon'), useValueAndKey(labelPosition, 'labeled') || useKeyOnly(label, 'labeled'), 'input', className);
      var unhandled = getUnhandledProps(Input, this.props);

      var rest = _omit(unhandled, htmlInputPropNames);

      var htmlInputProps = _pick(this.props, htmlInputPropNames);
      if (onChange) htmlInputProps.onChange = this.handleChange;

      var ElementType = getElementType(Input, this.props);

      // tabIndex
      if (!_isNil(tabIndex)) htmlInputProps.tabIndex = tabIndex;else if (disabled) htmlInputProps.tabIndex = -1;

      // Render with children
      // ----------------------------------------
      if (!_isNil(children)) {
        // add htmlInputProps to the `<input />` child
        var childElements = _map(Children.toArray(children), function (child) {
          if (child.type !== 'input') return child;

          return cloneElement(child, _extends({}, htmlInputProps, child.props));
        });

        return React.createElement(
          ElementType,
          _extends({}, rest, { className: classes }),
          childElements
        );
      }

      // Render Shorthand
      // ----------------------------------------
      var actionElement = Button.create(action, function (elProps) {
        return {
          className: cx(
          // all action components should have the button className
          !_includes(elProps.className, 'button') && 'button')
        };
      });
      var iconElement = Icon.create(icon);
      var labelElement = Label.create(label, function (elProps) {
        return {
          className: cx(
          // all label components should have the label className
          !_includes(elProps.className, 'label') && 'label',
          // add 'left|right corner'
          _includes(labelPosition, 'corner') && labelPosition)
        };
      });

      return React.createElement(
        ElementType,
        _extends({}, rest, { className: classes }),
        actionPosition === 'left' && actionElement,
        iconPosition === 'left' && iconElement,
        labelPosition !== 'right' && labelElement,
        createHTMLInput(input || type, htmlInputProps),
        actionPosition !== 'left' && actionElement,
        iconPosition !== 'left' && iconElement,
        labelPosition === 'right' && labelElement
      );
    }
  }]);

  return Input;
}(Component);

Input.defaultProps = {
  type: 'text'
};
Input._meta = {
  name: 'Input',
  type: META.TYPES.ELEMENT
};
process.env.NODE_ENV !== "production" ? Input.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** An Input can be formatted to alert the user to an action they may perform. */
  action: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

  /** An action can appear along side an Input on the left or right. */
  actionPosition: PropTypes.oneOf(['left']),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** An Input field can show that it is disabled. */
  disabled: PropTypes.bool,

  /** An Input field can show the data contains errors. */
  error: PropTypes.bool,

  /** Take on the size of it's container. */
  fluid: PropTypes.bool,

  /** An Input field can show a user is currently interacting with it. */
  focus: PropTypes.bool,

  /** Optional Icon to display inside the Input. */
  icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

  /** An Icon can appear inside an Input on the left or right. */
  iconPosition: PropTypes.oneOf(['left']),

  /** Shorthand for creating the HTML Input. */
  input: customPropTypes.itemShorthand,

  /** Format to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Optional Label to display along side the Input. */
  label: customPropTypes.itemShorthand,

  /** A Label can appear outside an Input on the left or right. */
  labelPosition: PropTypes.oneOf(['left', 'right', 'left corner', 'right corner']),

  /** An Icon Input field can show that it is currently loading data. */
  loading: PropTypes.bool,

  /**
   * Called on change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange: PropTypes.func,

  /** An Input can vary in size. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** An Input can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Transparent Input has no background. */
  transparent: PropTypes.bool,

  /** The HTML input type. */
  type: PropTypes.string
} : void 0;
Input.handledProps = ['action', 'actionPosition', 'as', 'children', 'className', 'disabled', 'error', 'fluid', 'focus', 'icon', 'iconPosition', 'input', 'inverted', 'label', 'labelPosition', 'loading', 'onChange', 'size', 'tabIndex', 'transparent', 'type'];


Input.create = createShorthandFactory(Input, function (type) {
  return { type: type };
});

export default Input;