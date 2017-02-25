import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';
import { customPropTypes, getElementType, getUnhandledProps, META } from '../../lib';

/**
 * A TextArea can be used to allow for extended user input.
 * @see Form
 */

var TextArea = function (_Component) {
  _inherits(TextArea, _Component);

  function TextArea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextArea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e) {
      var onChange = _this.props.onChange;

      if (onChange) onChange(e, _extends({}, _this.props, { value: e.target && e.target.value }));

      _this.updateHeight(e.target);
    }, _this.removeAutoHeightStyles = function () {
      _this.rootNode.removeAttribute('rows');
      _this.rootNode.style.height = null;
      _this.rootNode.style.minHeight = null;
      _this.rootNode.style.resize = null;
    }, _this.updateHeight = function () {
      if (!_this.rootNode) return;

      var autoHeight = _this.props.autoHeight;

      if (!autoHeight) return;

      var _window$getComputedSt = window.getComputedStyle(_this.rootNode),
          borderTopWidth = _window$getComputedSt.borderTopWidth,
          borderBottomWidth = _window$getComputedSt.borderBottomWidth;

      borderTopWidth = parseInt(borderTopWidth, 10);
      borderBottomWidth = parseInt(borderBottomWidth, 10);

      _this.rootNode.rows = '1';
      _this.rootNode.style.minHeight = '0';
      _this.rootNode.style.resize = 'none';
      _this.rootNode.style.height = 'auto';
      _this.rootNode.style.height = _this.rootNode.scrollHeight + borderTopWidth + borderBottomWidth + 'px';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextArea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateHeight();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // removed autoHeight
      if (!this.props.autoHeight && prevProps.autoHeight) {
        this.removeAutoHeightStyles();
      }
      // added autoHeight or value changed
      if (this.props.autoHeight && !prevProps.autoHeight || prevProps.value !== this.props.value) {
        this.updateHeight();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var value = this.props.value;

      var rest = getUnhandledProps(TextArea, this.props);
      var ElementType = getElementType(TextArea, this.props);

      return React.createElement(ElementType, _extends({}, rest, {
        value: value,
        onChange: this.handleChange,
        ref: function ref(c) {
          return _this2.rootNode = c;
        }
      }));
    }
  }]);

  return TextArea;
}(Component);

TextArea._meta = {
  name: 'TextArea',
  type: META.TYPES.ADDON
};
TextArea.defaultProps = {
  as: 'textarea'
};
process.env.NODE_ENV !== "production" ? TextArea.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Indicates whether height of the textarea fits the content or not. */
  autoHeight: PropTypes.bool,

  /**
   * Called on change.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange: PropTypes.func,

  /** The value of the textarea. */
  value: PropTypes.string
} : void 0;
TextArea.handledProps = ['as', 'autoHeight', 'onChange', 'value'];


export default TextArea;