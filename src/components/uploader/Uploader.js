 import React from 'react';
 import { Button, List } from 'semantic-ui-react';
 import UploadStatus from './UploadStatus';

 class Uploader extends React.Component {

   render() {
     // to be replaced by state
     const uploads = [
       {
          filename: "Battlefield of Eternity.stormReplay",
          progress: 100,
          state: "Processing"
       },
       {
          filename: "Infernal Shrines.stormReplay",
          progress: 100,
          state: "Duplicate"
       },
       {
          filename: "Sky Temple.stormReplay",
          progress: 77,
          state: "Uploading"
       },
       {
          filename: "Garden of Terror.stormReplay",
          progress: 23,
          state: "Uploading"
       }
     ];

     const uploadStatuses = uploads.map((upload, i) => {
        return (
          <UploadStatus key={i} upload={upload} />
        )
     });

     return (
       <div>
        <Button>Select Files to Upload</Button>
        <List divided relaxed>
          {uploadStatuses}
        </List>
       </div>
     );
   }
 };

export default Uploader;
