import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AlertInfo from '../../components/AlertInfo';
import * as AuthActions from '../../actions/auth';
import Login from '../../components/Login';

class Main extends Component {
    componentWillMount(){
    }
    render(){
        const { authState } = this.props;
        return (
            <section>
                <AlertInfo {...authState} />
                <Login login={this.props.login} authState={authState} ></Login>
            </section>
        );
    }
}

const mapStateToProps = (state)=> {
    const alertInfo = state.alertInfo.toJSON();
    const visible = state.auth.get('visible');
    const confirmLoading = state.auth.get('confirmLoading');
    const loginFail = state.auth.get('loginFail');
    const loginSuccess = state.auth.get('loginSuccess');
    const {...authState} = {visible, confirmLoading, loginFail, loginSuccess, alertInfo};
    return {authState};
};

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(AuthActions, dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);