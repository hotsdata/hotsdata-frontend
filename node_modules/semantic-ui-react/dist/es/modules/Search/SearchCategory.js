import _extends from 'babel-runtime/helpers/extends';
import cx from 'classnames';
import React, { PropTypes } from 'react';

import { customPropTypes, getElementType, getUnhandledProps, META, useKeyOnly } from '../../lib';

var defaultRenderer = function defaultRenderer(_ref) {
  var name = _ref.name;
  return name;
};

function SearchCategory(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      renderer = props.renderer;

  var classes = cx(useKeyOnly(active, 'active'), 'category', className);
  var rest = getUnhandledProps(SearchCategory, props);
  var ElementType = getElementType(SearchCategory, props);

  return React.createElement(
    ElementType,
    _extends({}, rest, { className: classes }),
    React.createElement(
      'div',
      { className: 'name' },
      renderer ? renderer(props) : defaultRenderer(props)
    ),
    children
  );
}

SearchCategory.handledProps = ['active', 'as', 'children', 'className', 'name', 'renderer', 'results'];
SearchCategory._meta = {
  name: 'SearchCategory',
  parent: 'Search',
  type: META.TYPES.MODULE
};

process.env.NODE_ENV !== "production" ? SearchCategory.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** The item currently selected by keyboard shortcut. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Display name. */
  name: PropTypes.string,

  /**
   * A function that returns the category contents.
   * Receives all SearchCategory props.
   */
  renderer: PropTypes.func,

  /** Array of Search.Result props. */
  results: PropTypes.array
} : void 0;

export default SearchCategory;