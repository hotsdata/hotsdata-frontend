import React, { Component } from 'react';
import { Line } from 'rc-progress';

class UploadStatus extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let progressColor = this.props.upload.progress < 100 ? '#3498DB' : 'green';
    return (
      <tr className="upload-status">
        <td>{this.props.upload.filename}</td>
        <td>
          <Line
            percent={this.props.upload.progress}
            strokeWidth="2"
            strokeColor={progressColor} />
        </td>
        <td className={(this.props.upload.state == 'Finished') ? 'success' : ''}>{this.props.upload.state}</td>
      </tr>
    );
  }

};

export default UploadStatus;
