import React, { Component } from 'react';
import { List, Grid, Progress } from 'semantic-ui-react';

class UploadStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      upload: props.upload
    }
  }

  render() {
    const upload = this.state.upload;

    return (
      <tr className="upload-status">
        <td>{upload.filename}</td>
        <td>{upload.progress}</td>
        <td className={(upload.state == 'Finished') ? 'success' : ''}>{upload.state}</td>
      </tr>
    );
  }

};

export default UploadStatus;
