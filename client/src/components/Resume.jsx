import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';


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
  }
};

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
    };
    this.progress = this.progress.bind(this);
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
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
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="display-4">Resume options</h1>
              <RaisedButton
                label="Upload Résumé"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
              >
                <input type="file" name="upload" style={styles.exampleImageInput} onChange={(e) => this.fileUpload(e)} />
              </RaisedButton>
              <LinearProgress className="progress-bar" mode="determinate" value={this.state.completed} />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;
