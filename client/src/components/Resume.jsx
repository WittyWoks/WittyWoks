import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class Resume extends React.Component {
  constructor(props) {
    super(props);
  }


  fileUpload(e) {
    // Get file info
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('upload', file, file.name);

    console.log('triggered', file, file.name);
    $.ajax({
      url: '/fileUpload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        console.log('made it', data);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Hello from Resume Component</h1>
        <RaisedButton
          label="Upload Résumé"
          labelPosition="before"
          style={styles.button}
          containerElement="label"
        >
          <input type="file" name="upload" style={styles.exampleImageInput} onChange={(e) => this.fileUpload(e)} />
        </RaisedButton>
      </div>
    );
  }
}

export default Resume;
