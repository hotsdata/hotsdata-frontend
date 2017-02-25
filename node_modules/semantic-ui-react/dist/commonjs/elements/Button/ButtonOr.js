'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Used in some Button types, such as `animated`.
 */
function ButtonOr(props) {
  var className = props.className;

  var classes = (0, _classnames2.default)('or', className);
  var rest = (0, _lib.getUnhandledProps)(ButtonOr, props);
  var ElementType = (0, _lib.getElementType)(ButtonOr, props);

  return _react2.default.createElement(ElementType, (0, _extends3.default)({}, rest, { className: classes }));
}

ButtonOr.handledProps = ['as', 'className'];
ButtonOr._meta = {
  name: 'ButtonOr',
  parent: 'Button',
  type: _lib.META.TYPES.ELEMENT
};

process.env.NODE_ENV !== "production" ? ButtonOr.propTypes = {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Additional classes. */
  className: _react.PropTypes.string
} : void 0;

exports.default = ButtonOr;