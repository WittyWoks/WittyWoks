import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12,
  },
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <Navbar />

        <div className="view hm-black-strong" id="home">
          <div className="mask">
            <div className="row vert-center">
              <div className="col text-center align-self-center">
                <h1 className="display-1 hero wow fadeInDown" data-wow-delay="0.2s">BestFit</h1>
                <p className="sub-hero wow fadeIn" data-wow-delay="0.2s">Your one stop autoshop for your job search</p>
                <a className="btn btn-primary btn-lg wow fadeInLeft" data-wow-delay="0.6s" href="/auth/google"><i className="fa fa-google" aria-hidden="true"></i> Log In</a>
                <Link className="btn btn-default btn-lg wow fadeInRight" data-wow-delay="0.6s" to="/dashboard"> Guest </Link>
              </div>
            </div>
          </div>
        </div>

        <section id="about" className="container wow fadeIn">
            <div className="divider-new">
              <h2 className="h2-responsive">About us</h2>
            </div>
            <div className="wow fadeIn">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
            </div>
        </section>

        <section id="offer" className="container wow fadeIn">
          <div className="divider-new">
            <h2 className="h2-responsive">What we offer</h2>
          </div>
          <div className="wow fadeIn">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
          </div>
        </section>

        <section id="contact" className="container">
          <div className="divider-new wow fadeIn">
            <h2 className="h2-responsive">Contact us</h2>
          </div>
          <div className="wow fadeIn">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
          </div>
        </section>

      </div>
    );
    
  }
}

export default HomePage;
