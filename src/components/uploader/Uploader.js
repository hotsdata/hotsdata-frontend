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
      uploadFiles: [{filename: "Test.stormReplay", progress: 35, state: 'New'}]
    }

    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
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
          console.log(this);
          let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          let idx = _.findIndex(this.state.uploadFiles, (f) => f.filename == newFile.filename);
          const uploadFiles = this.state.uploadFiles;
          uploadFiles[idx].progress = percentCompleted;
          this.setState({uploadFiles: uploadFiles});
        }
      };

      axios.post('http://54.202.193.48/upload', data, config)
      .then(response => {
        let idx = _.findIndex(this.state.uploadFiles, (f) => f.filename == newFile.filename);
        const uploadFiles = this.state.uploadFiles;
        uploadFiles[idx].state = 'Finished';
        this.setState({uploadFiles: uploadFiles});
        console.log('done');
      })
      .catch(error => {
        console.log(error);
      });
    });
  }

  onOpenClick() {
    this.dropzone.open();
  }

  render() {

    let uploadStatusRows = this.state.uploadFiles.map((uploadFile, idx) => {
      return <UploadStatus key={idx} upload={uploadFile} />
    });

    return (
      <div>
        <Dropzone className="dropzone" onClick={this.onOpenClick} ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
          <div>
            <div>Drop files here or </div>
            <button onClick={this.onOpenClick}>Browse Files</button>
          </div>
        </Dropzone>
        <table className="table upload-status-table">
          <thead>
          </thead>
          <tbody>
            {uploadStatusRows}
          </tbody>
        </table>
      </div>
    );
  }
 };

export default Uploader;
