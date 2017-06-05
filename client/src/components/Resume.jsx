import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import Chip from 'material-ui/Chip';
import ReactPDF from 'react-pdf';

const styles = {
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      skills: [],
      file: '',
      pageIndex: null,
      pageNumber: null,
      total: null,
    };

    this.progress = this.progress.bind(this);
    this.onDocumentCompleted = this.onDocumentCompleted.bind(this);
    this.onPageCompleted = this.onPageCompleted.bind(this);
  }

  // Set progress bar to zero on page load
  componentWillUnmount() {
    this.setState({completed: 0});
  }

  getSignedRequest(file) {
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr2.onreadystatechange = () => {
      if (xhr2.readyState === 4) {
        if (xhr2.status === 200) {
          const response = JSON.parse(xhr2.responseText);
          this.uploadFileAWS(file, response.signedRequest, response.url);
        } else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr2.send();
  }

  // Update progress bar on file upload
  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
    }
  }

  // In case resume is multiple pages long
  onDocumentCompleted(pages) {
    this.setState({pages: pages});
  }

  // In case resume is multiple pages long and we want to specify a starting page
  onPageCompleted(page) {
    this.setState({currentPage: page});
  }

  // Needed to render skills chips (Material-UI component)
  renderChip(data) {
    return (
      <Chip style={styles.chip}>
        {data}
      </Chip>
    );
  }

  uploadFileAWS(file, signedRequest, url) {
    const xhr3 = new XMLHttpRequest();
    xhr3.open('PUT', signedRequest);
    xhr3.onreadystatechange = () => {
      if (xhr3.readyState === 4) {
        if (xhr3.status === 200) {
          //do nothing, it worked
        } else {
          alert('Could not upload file.');
        }
      }
    };
    xhr3.send(file);
  }

  // Ajax call to upload resume
  fileUpload(e) {
    let file = e.target.files[0];
    this.setState({file: file});
    this.setState({completed: 0});
    this.getSignedRequest(file);

    let formData = new FormData();
    let context = this;
    formData.append('upload', file, file.name);

    $.ajax({
      url: '/fileUpload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        console.log('Upload succeeded');
        context.setState({skills: data});
      },
      xhr: () => {
        let xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (evt) => {
          if (evt.lengthComputable) {
            let percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            context.progress(percentComplete);
          }
        }, false);

        return xhr;
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          
          {/* First row */}
          <div className="row">
            {/* First column */}
            <div className="col-md-4 wow fadeInLeft" data-wow-delay="0.2s">
              <div className="card">
                  <h3 className="card-header">Upload a résumé</h3>
                  <div className="card-block">
                      <p className="card-text">Upload your résumé and we'll automatically grab your relevant job skills.</p>
                      <RaisedButton
                        label="Upload Résumé"
                        labelPosition="before"
                        style={styles.button}
                        containerElement="label"
                      >
                        <input type="file" name="upload" style={styles.exampleImageInput} onChange={(e) => this.fileUpload(e)} />
                      </RaisedButton>
                      <LinearProgress id="test" className="progress-bar" mode="determinate" value={this.state.completed} />
                  </div>
              </div>
            </div>

            {/* Second column */}
            <div className="col-md-4 wow fadeInDown" data-wow-delay="0.2s">
              <div className="card">
                  <h3 className="card-header">Your skills</h3>
                  <div className="card-block">
                      <p className="card-text">Technical skills extracted from your résumé.</p>
                      <div style={styles.wrapper}>
                        {this.state.skills.map(this.renderChip, this)}
                      </div>
                  </div>
              </div>
            </div>

            {/* Third column */}
            <div className="col-md-4 wow fadeInRight" data-wow-delay="0.2s">
              <div className="card">
                  <h3 className="card-header">Your résumé</h3>
                  <div className="card-block">
                        <ReactPDF
                          file={this.state.file} 
                          onDocumentLoad={this.onDocumentCompleted}
                          onPageLoad={this.onPageCompleted}
                        />
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Resume;