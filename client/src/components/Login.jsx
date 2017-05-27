import React from 'react';
import GoogleButton from 'react-google-button';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {

        googleSignInStyle: {
          textDecoration: 'none',
        }
    }
    return (
      <div>
        Hello from Login
        <a href="/auth/google"
        style = {styles.googleSignInStyle}>
        <GoogleButton />
        </a>
      </div>
    );
  }
}

export default Login;
