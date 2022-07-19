/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';

// import HTML from '@mapstore/components/I18N/HTML';

class Tutorial extends React.Component {

    static propTypes = {
        logo: PropTypes.object,
        logoudes: PropTypes.object
    };

    static defaultProps = {
    };

    render() {

        return (
            <div>
                <Button tooltipId="resources.dashboards.newDashboard" bsSize="large" bsStyle="primary" onClick={() => { this.displayNewIndicesDashboardDialog(); }}>
                    <span className="glyphicon glyphicon-plus"></span> Nouvelle visualisation
                </Button>
            </div>
        );
    }
}

export const TutorialPlugin = Tutorial;
