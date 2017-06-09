import React from 'react';
import update from 'immutability-helper';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import UploadStatus from './UploadStatus';

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadFiles: []
    }

    this.onDrop = this.onDrop.bind(this);
  }

  updateUploadStatus(uploadFile) {

  }

  onDrop(acceptedFiles) {
    acceptedFiles.forEach((file) => {
      let newFile = { filename: file.name, progress: 0, state: 'New' }
      this.setState((state) => {
        state.uploadFiles = state.uploadFiles.concat(newFile)
      });

      let data = new FormData();
      data.append('replay', file);

      let config = {
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          let idx = _.findIndex(this.state.uploadFiles, (f) => f.filename == newFile.filename);
          const uploadFiles = this.state.uploadFiles;
          uploadFiles[idx].progress = percentCompleted;
          this.setState({uploadFiles: uploadFiles});
        }
      };

      axios.post('http://api.hotsdata.com/upload', data, config)
        .then(response => {
          let idx = _.findIndex(this.state.uploadFiles, (f) => f.filename == newFile.filename);
          const uploadFiles = this.state.uploadFiles;
          uploadFiles[idx].state = 'Finished';
          this.setState({uploadFiles: uploadFiles});
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  render() {

    let uploadStatusRows = this.state.uploadFiles.map((uploadFile, idx) => {
      return <UploadStatus key={idx} upload={uploadFile} />
    });

    return (
      <div>
        <Dropzone className="dropzone" ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
          <div>
            <div>Drop files here or </div>
            <button onClick={this.onOpenClick}>Browse Files</button>
          </div>
        </Dropzone>
        <div>
          <h2>You can download alpha versions of the uploader below</h2>
          <h4>Please let us know of any bugs you find or feedback you may have by clicking the contact link in the footer.</h4>
          <a href="https://s3-us-west-2.amazonaws.com/hotsdata-assets/uploader/HotsData+Uploader.exe">Windows Uploader</a>
          <br />
          <a href="https://s3-us-west-2.amazonaws.com/hotsdata-assets/uploader/HotsData+Uploader.dmg">Mac Uploader</a>
        </div>
        { uploadStatusRows.length > 0 &&
          <table className="table upload-status-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Percent Complete</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {uploadStatusRows}
            </tbody>
          </table>
        }
      </div>
    );
  }
 };

export default Uploader;
