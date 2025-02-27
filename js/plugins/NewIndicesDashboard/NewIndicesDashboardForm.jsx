/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FormControl, FormGroup, Checkbox, ControlLabel, Alert } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import PropTypes from 'prop-types';

import Message from '@mapstore/components/I18N/Message';
import { getMessageById } from '@mapstore/utils/LocaleUtils';
import Button from '@mapstore/components/misc/Button';

/**
 * A Form to login menu for user details:
 */
class NewIndicesDashboardForm extends React.Component {
    static propTypes = {
        // props
        user: PropTypes.object,
        onLoginSuccess: PropTypes.func,
        showSubmitButton: PropTypes.bool,
        loginError: PropTypes.object,

        // actions
        onSubmit: PropTypes.func,
        onError: PropTypes.func,

        // localization
        userNameText: PropTypes.node,
        passwordText: PropTypes.node,
        loginFailedStatusMessages: PropTypes.object,
        loginFailedMessage: PropTypes.node
    };

    static contextTypes = {
        messages: PropTypes.object
    };

    static defaultProps = {
        onSubmit: () => {},
        onLoginError: () => {},
        showSubmitButton: true,
        userNameText: <Message msgId="user.username"/>,
        passwordText: <Message msgId="user.password"/>,
        loginFailedMessage: <Message msgId="user.loginFail"/>,
        loginFailedStatusMessages: {
            0: <Message msgId="user.loginFailedStatusMessages.usernamePwdInsert"/>,
            401: <Message msgId="user.loginFailedStatusMessages.usernamePwdIncorrect"/>
        }

    };

    state = {
        loading: false,
        municipalite: '',
        username: '',
        password: ''
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        let newUser = nextProps.user;
        let oldUser = this.props.user;
        let userChange = newUser !== oldUser;
        if ( newUser && userChange ) {
            this.props.onLoginSuccess(nextProps.user);
        }
        this.setState({
            loading: false
        } );
    }

    renderError = () => {
        let error = this.props.loginError;
        if (error) {
            return (
                <Alert bsStyle="danger" key="errorMessage">
                    <strong>{this.props.loginFailedMessage}</strong> {this.renderErrorText(error)}
                </Alert>
            );
        }
        return null;
    };

    renderErrorText = (error) => {
        return this.props.loginFailedStatusMessages[error.status] || error.status;
    };

    renderLoading = () => {
        return this.state.loading ? <Spinner spinnerName="circle" key="loadingSpinner" noFadeIn overrideSpinnerClassName="spinner"/> : null;
    };

    renderSubmit = () => {
        let submitText = getMessageById(this.context.messages, "user.signIn");
        if (this.props.showSubmitButton) {
            return (<Button
                type="submit"
                value={submitText}
                bsStyle="primary"
                key="submit" onClick={this.handleSubmit}>{submitText}</Button>);
        }
        return null;
    };

    render() {
        return (

            <form ref="loginForm">
                <FormGroup>
                    <ControlLabel>Nom de la municipalité</ControlLabel>
                    <FormControl ref="username" key="username" type="text" value={this.state.municipalite} onChange={this.setMunicipalite} />
                </FormGroup>

                <Checkbox >
                    Visible pour tout le monde
                </Checkbox>

                <div style={{"float": "right"}}>{this.renderLoading()}</div>
            </form>
        );
    }

    setMunicipalite = (e) => {
        this.setState({
            municipalite: e.target.value
        });
    };

    setPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.submit();
    };

    handleKeyPress = (target) => {
        if (target.charCode === 13) {
            this.submit();
        }

    };

    submit = () => {
        let username = this.state.username;
        let password = this.state.password;
        if (!username || !password) {
            this.props.onError({status: 0});
        }
        this.props.onSubmit(username, password);
        this.setState({loading: true});
    };
}

export default NewIndicesDashboardForm;
