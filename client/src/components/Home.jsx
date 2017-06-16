import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

const styles = {
  button: {
    margin: 12,
  },
  hidden: {
    visibility: 'hidden'
  },
  card: {
    background: '#424242'
  },
  hero: {
    display: 'inline'
  }
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <Navbar />

        <div className="view hm-black-strong container-fluid" id="home">
          <div className="mask">
            <div className="row h-100 justify-content-center text-center">
                <div className="col-sm-4 my-auto">
                  <div className="hero wow fadeInDown" data-wow-delay="0.2s">
                    <img src="https://res.cloudinary.com/jescobedo/image/upload/v1497587577/puzzle_wugv86.png" id="icon"/>
                    <h1 style={styles.hero} className="display-1">BestFit</h1>
                  </div>
                  <p className="sub-hero wow fadeIn" data-wow-delay="0.2s">Your one stop autoshop for your job search</p>
                  <a style={styles.hidden} className="btn btn-primary btn-lg wow fadeInLeft" data-wow-delay="0.6s" href="/auth/google"><i className="fa fa-google" aria-hidden="true"></i> Log In</a>
                  <Link style={styles.hidden} className="btn btn-default btn-lg wow fadeInRight" data-wow-delay="0.6s" to="/dashboard"> Guest </Link>
                </div>
            </div>
          </div>
        </div>

        <section id="about" className="container wow fadeIn">
            <div className="divider-new">
              <h2 className="h2-responsive primary-text">About</h2>
            </div>
            <div className="wow fadeIn text-center secondary-text">
              <p>BestFit is the best place to keep track of your job search. Gain objective
              insight into what your resume portrays, and easily view metrics regarding the 
              jobs you’ve applied for. BestFit is your one stop shop for the job hunt. Just 
              one and you’re done.</p>
            </div>
        </section>

        <section id="offer" className="container wow fadeIn">
          <div className="divider-new">
            <h2 className="h2-responsive primary-text">What we offer</h2>
          </div>
          <div className="wow fadeIn row">
            <div className="col-sm-3">
              <div className="card text-center" style={styles.card}>
                <img className="img-fluid" src="https://res.cloudinary.com/jescobedo/image/upload/v1497398712/splash-search.jpg" alt="Card image cap" />
                <div className="card-block">
                  <h4 className="card-title primary-text">Easy job searching</h4>
                  <hr/>
                  <p className="card-text secondary-text">Easily and quickly search for amazing job opportunities that interest you in your desired location.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <img className="img-fluid" src="http://res.cloudinary.com/jescobedo/image/upload/v1497398713/splash-resume.jpg" alt="Card image cap" />
                <div className="card-block text-center" style={styles.card}>
                  <h4 className="card-title primary-text">Resume insight</h4>
                  <hr/>
                  <p className="card-text secondary-text">Upload your resume and let IBM Watson provide you with objective personality and tone feedback.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <img className="img-fluid" src="http://res.cloudinary.com/jescobedo/image/upload/v1497398712/splash-metrics.jpg" alt="Card image cap" />
                <div className="card-block text-center" style={styles.card}>
                  <h4 className="card-title primary-text">Skills metrics</h4>
                  <hr/>
                  <p className="card-text secondary-text">Quickly analyze how your skillset matches up with the skills required for the job you're interested in.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <img className="img-fluid" src="http://res.cloudinary.com/jescobedo/image/upload/v1497398713/splash-tracker.png" alt="Card image cap" />
                <div className="card-block text-center" style={styles.card}>
                  <h4 className="card-title primary-text">Application tracker</h4>
                  <hr/>
                  <p className="card-text secondary-text">Keep an eye on how many job's you've applied to each day. We'll even keep track of the jobs you've applied to.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="container">
          <div className="divider-new wow fadeIn">
            <h2 className="h2-responsive primary-text">Meet the team</h2>
          </div>
          <div className="wow fadeIn text-center secondary-text">
            <p>Meet the team of engineers that brought BestFit to life. Feel free to drop them a line.</p>
          </div>
          <div className="wow fadeIn row">
            <div className="col-sm-3">
              <div className="card" style={styles.card}>
                <div>
                  <Avatar src="https://res.cloudinary.com/jescobedo/image/upload/v1497405221/1-bill-thumb_vzsjoz.jpg" size="125" className="mx-auto d-block avatar"/>
                </div>
                <div className="card-block text-center">
                  <h4 className="card-title primary-text">Bill Beedle</h4>
                  <p className="secondary-text">Software Engineer</p>
                  <hr/>
                  <div className="row">
                    <div className="col">
                      <a target="_blank" href="https://github.com/ebeedle"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="col">
                      <a target="_blank" href="https://www.linkedin.com/in/bill-beedle-97958b121/"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="col">
                      <a href="mailto:ebeedle@ucla.edu"><i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card" style={styles.card}>
                <div>
                  <Avatar src="https://res.cloudinary.com/jescobedo/image/upload/v1497405221/2-jeff-thumb_tswyzu.jpg" size="125" className="mx-auto d-block avatar"/>
                </div>
                <div className="card-block text-center">
                  <h4 className="card-title primary-text">Jeffrey Chen</h4>
                  <p className="secondary-text">Software Engineer</p>
                  <hr/>
                  <div className="row">
                    <div className="col">
                      <a target="_blank" href="https://github.com/jeffc12"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="col">
                      <a target="_blank" href="https://www.linkedin.com/in/jeffrey-chen/"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="col">
                      <a href="mailto:jeffreychen41@gmail.com"><i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card" style={styles.card}>
                <div>
                  <Avatar src="https://res.cloudinary.com/jescobedo/image/upload/v1497405221/3-airyque-thumb_t1umsq.jpg" size="125" className="mx-auto d-block avatar"/>
                </div>
                <div className="card-block text-center">
                  <h4 className="card-title primary-text">Airyque Ervin</h4>
                  <p className="secondary-text">Software Engineer</p>
                  <hr/>
                  <div className="row">
                    <div className="col">
                      <a target="_blank" href="https://github.com/airyqueervin"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="col">
                      <a target="_blank" href="https://www.linkedin.com/in/airyque/"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="col">
                      <a href="mailto:airyque@gmail.com"><i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card" style={styles.card}>
                <div>
                <Avatar src="https://res.cloudinary.com/jescobedo/image/upload/v1497405221/4-joneric-thumb_ljmw3b.jpg" size="125" className="mx-auto d-block avatar"/>
                </div>
                <div className="card-block text-center">
                  <h4 className="card-title primary-text">Jon Eric Escobedo</h4>
                  <p className="secondary-text">Software Engineer</p>
                  <hr/>
                  <div className="row">
                    <div className="col">
                      <a target="_blank" href="https://github.com/JonEricEscobedo"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="col">
                      <a target="_blank" href="https://www.linkedin.com/in/jonericescobedo/"><i className="fa fa-linkedin-square fa-2x" aria-hidden="true"></i></a>
                    </div>
                    <div className="col">
                      <a href="mailto:jonericescobedo@gmail.com"><i className="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    <footer className="footer">
      <div className="container">
        <span className="text-muted">BestFit | 2017</span>
      </div>
    </footer>

      </div>
    );
    
  }
}

export default HomePage;
