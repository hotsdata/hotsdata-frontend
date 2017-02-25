import _extends from 'babel-runtime/helpers/extends';
import cx from 'classnames';
import React, { PropTypes } from 'react';

import { customPropTypes, getElementType, getUnhandledProps, META } from '../../lib';

/**
 * Used in some Button types, such as `animated`.
 */
function ButtonOr(props) {
  var className = props.className;

  var classes = cx('or', className);
  var rest = getUnhandledProps(ButtonOr, props);
  var ElementType = getElementType(ButtonOr, props);

  return React.createElement(ElementType, _extends({}, rest, { className: classes }));
}

ButtonOr.handledProps = ['as', 'className'];
ButtonOr._meta = {
  name: 'ButtonOr',
  parent: 'Button',
  type: META.TYPES.ELEMENT
};

process.env.NODE_ENV !== "production" ? ButtonOr.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string
} : void 0;

export default ButtonOr;