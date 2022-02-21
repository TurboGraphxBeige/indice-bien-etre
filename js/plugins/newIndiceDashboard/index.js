/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Glyphicon } from 'react-bootstrap';

import { setControlProperty } from '@mapstore/actions/controls';
import { checkPendingChanges } from '@mapstore/actions/pendingChanges';
import { changePassword, login, loginFail, logout, logoutWithReload, resetError } from '@mapstore/actions/security';
import LoginModalComp from '@mapstore/components/security/modals/LoginModal';
import PasswordResetModalComp from '@mapstore/components/security/modals/PasswordResetModal';
import UserDetailsModalComp from '@mapstore/components/security/modals/UserDetailsModal';
import UserMenuComp from '@mapstore/components/security/UserMenu';
import { unsavedMapSelector, unsavedMapSourceSelector } from '@mapstore/selectors/controls';
import ConfigUtils from '@mapstore/utils/ConfigUtils';
import { connect } from '@mapstore/utils/PluginsUtils';

export const closeLogin = () => {
    return (dispatch) => {
        dispatch(setControlProperty('LoginForm', 'enabled', false));
        dispatch(resetError());
    };
};

const checkUnsavedMapChanges = (action) => {
    return dispatch => {
        dispatch(checkPendingChanges(action, 'logout'));
    };
};

export const UserMenu = connect((state) => ({
    user: state.security && state.security.user
}), {
    onShowLogin: setControlProperty.bind(null, "LoginForm", "enabled", true, true),
    onShowAccountInfo: setControlProperty.bind(null, "AccountInfo", "enabled", true, true),
    onShowChangePassword: setControlProperty.bind(null, "ResetPassword", "enabled", true, true),
    onLogout: logoutWithReload
})(UserMenuComp);

export const UserDetails = connect((state) => ({
        user: state.security && state.security.user,
        show: state.controls.AccountInfo && state.controls.AccountInfo.enabled}
), {
    onClose: setControlProperty.bind(null, "AccountInfo", "enabled", false, false)
})(UserDetailsModalComp);

export const PasswordReset = connect((state) => ({
    user: state.security && state.security.user,
    show: state.controls.ResetPassword && state.controls.ResetPassword.enabled,
    changed: state.security && state.security.passwordChanged && true || false,
    error: state.security && state.security.passwordError,
    loading: state.security && state.security.changePasswordLoading || false
}), {
    onPasswordChange: (user, pass) => { return changePassword(user, pass); },
    onClose: setControlProperty.bind(null, "ResetPassword", "enabled", false, false)
})(PasswordResetModalComp);

export const Login = connect((state) => ({
    show: state.controls.LoginForm && state.controls.LoginForm.enabled,
    user: state.security && state.security.user,
    loginError: state.security && state.security.loginError
}), {
    onLoginSuccess: setControlProperty.bind(null, 'LoginForm', 'enabled', false, false),
    onClose: closeLogin,
    onSubmit: login,
    onError: loginFail
})(LoginModalComp);

export const LoginNav = connect((state) => ({
    user: state.security && state.security.user,
    nav: false,
    renderButtonText: false,
    renderButtonContent: () => {return <Glyphicon glyph="user" />; },
    bsStyle: "primary",
    className: "square-button",
    renderUnsavedMapChangesDialog: ConfigUtils.getConfigProp('unsavedMapChangesDialog'),
    displayUnsavedDialog: unsavedMapSelector(state)
        && unsavedMapSourceSelector(state) === 'logout'
}), {
    onShowLogin: setControlProperty.bind(null, "LoginForm", "enabled", true, true),
    onShowAccountInfo: setControlProperty.bind(null, "AccountInfo", "enabled", true, true),
    onShowChangePassword: setControlProperty.bind(null, "ResetPassword", "enabled", true, true),
    onLogout: logoutWithReload,
    onCheckMapChanges: checkUnsavedMapChanges,
    onCloseUnsavedDialog: setControlProperty.bind(null, "unsavedMap", "enabled", false),
    onLogoutConfirm: logout.bind(null, undefined)

})(UserMenuComp);

export default {
    UserDetails,
    UserMenu,
    PasswordReset,
    Login,
    LoginNav
};
