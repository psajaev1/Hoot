import React from 'react';
import axios from "axios";
import AuthUserContext from './context';
// import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        username: ""
      };
    }

    checkAuth() {
        axios
        .get("/checkAuth")
        .then((res) => {
            if (res) {
                this.setState({
                    authUser: res.data,
                    username: res.data.username
                });
            } else {
                this.setState({
                    authUser: null,
                    username: ""
                });
            }
        })
        .catch((err) => console.log(err, "heyo"));
    }

    componentDidMount() {
        // this.listener = 
        this.checkAuth();
    }

    // componentDidMount() {
    //   this.listener = this.props.firebase.auth.onAuthStateChanged(
    //     authUser => {
    //       authUser
    //         ? this.setState({ authUser })
    //         : this.setState({ authUser: null });
    //     },
    //   );
    // }

    // componentWillUnmount() {
    //   this.listener();
    // }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

//   return withFirebase(WithAuthentication);
  return WithAuthentication;
};

export default withAuthentication;