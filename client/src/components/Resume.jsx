import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import Chip from 'material-ui/Chip';
import ReactPDF from 'react-pdf';
import $ from 'jquery';

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
  },
  card: {
    background: '#424242'
  },
  div: {
    height: '100px'
  }
};

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      skills: [],
      file: null,
      pageIndex: null,
      pageNumber: null,
      total: null
    };
    
    this.progress = this.progress.bind(this);
    this.onDocumentCompleted = this.onDocumentCompleted.bind(this);
    this.onPageCompleted = this.onPageCompleted.bind(this);
    this.getResume();
  }


  // Set progress bar to zero on page load
  componentWillUnmount() {
    this.setState({completed: 0});
  }

  getResume() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done((user) => {
      $.ajax({
        url: '/getResume',
        type: 'GET',
        data: {resume_id: user.resume_id},
      })
      .done((resume) => {
        context.setState({
          skills: resume.skills.split(','),
          file: resume.resume_url
        });
      })
      .fail(function(err) {
        console.log('failed to GET', err);
      });
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    });
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
      <Chip style={styles.chip} key={Math.random() * 1000}>
        {data}
      </Chip>
    );
  }

  uploadFileAWS(file, signedRequest, url) {
    let context = this;
    const xhr3 = new XMLHttpRequest();
    xhr3.open('PUT', signedRequest);
    xhr3.onreadystatechange = () => {
      if (xhr3.readyState === 4) {
        if (xhr3.status === 200) {
          this.setState({file: url});

          $.ajax({
            url: '/fileUpload',
            type: 'POST',
            data: context.state.file,
            success: function(data) { 
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
        } else {
          alert('Could not upload file.');
        }
      }
    };
    xhr3.send(file);
  }

  // On button press, trigger Amazon S3 actions
  fileUpload(e) {
    let file = e.target.files[0];

    this.setState({completed: 0});
    this.getSignedRequest(file);
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            {/* Resume Column */}
            <div className="col-md-6 mb-r">
              { this.state.file === null ? 
                <ReactPDF
                  file={this.state.file} 
                  onDocumentLoad={this.onDocumentCompleted}
                  onPageLoad={this.onPageCompleted}
                />
              :
              <a target="_blank" href={this.state.file}>
                <ReactPDF
                  file={this.state.file} 
                  onDocumentLoad={this.onDocumentCompleted}
                  onPageLoad={this.onPageCompleted}
                />
              </a>
              }
            </div>

            {/* Text Column */}
            <div className="col-md-5 offset-md-1">
              {/* Upload Row */}
              <div className="row">
                <div className="col-1 mr-1">
                    <i className="fa fa-upload fa-2x secondary-text" aria-hidden="true"></i>
                </div>
                <div className="col-10">
                  <h4 className="feature-title highlight-text">Upload</h4>
                  <p className="secondary-text">Upload your résumé and we'll automatically grab your relevant job skills.</p>
                  <a className="btn btn-default">Upload<input type="file" name="upload" style={styles.exampleImageInput} onChange={(e) => this.fileUpload(e)} /></a>

                  <LinearProgress id="test" className="progress-bar" mode="determinate" value={this.state.completed} />
                </div>
              </div>

              <div style={styles.div}></div>

              {/* Skills Row */} 
              <div className="row">
                <div className="col-1 mr-1">
                  <i className="fa fa-eye fa-2x secondary-text"></i>
                </div>
                <div className="col-10">
                  <h4 className="feature-title highlight-text">Review</h4>
                  <p className="secondary-text">Technical skills extracted from your résumé.</p>
                  <div style={styles.wrapper}>
                    {this.state.skills.map(this.renderChip, this)}
                  </div>
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