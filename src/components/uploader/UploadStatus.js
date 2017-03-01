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
      <List.Item>
        <Grid>
          <Grid.Column width={4}>{upload.filename}</Grid.Column>
          <Grid.Column width={10} verticalAlign={"middle"}>
            <Progress percent={upload.progress} size={"small"} progress />
          </Grid.Column>
          <Grid.Column width={2}>{upload.state}</Grid.Column>
        </Grid>
      </List.Item>
    );
  }

};

export default UploadStatus;
