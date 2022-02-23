/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import {
    Glyphicon
} from 'react-bootstrap';


//
import createPlugin from '@mapstore/utils/PluginsUtils';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
//

class RadarChartWidget extends React.Component {

    render() {
        const mydata = [
            {
                subject: 'Math',
                A: 120,
                B: 110,
                fullMark: 150,
            },
            {
                subject: 'Chinese',
                A: 98,
                B: 130,
                fullMark: 150,
            },
            {
                subject: 'English',
                A: 86,
                B: 130,
                fullMark: 150,
            },
            {
                subject: 'Geography',
                A: 99,
                B: 100,
                fullMark: 150,
            },
            {
                subject: 'Physics',
                A: 85,
                B: 90,
                fullMark: 150,
            },
            {
                subject: 'History',
                A: 65,
                B: 85,
                fullMark: 150,
            },
        ];

        return (
            <div>
            <p>asdsadWWWW</p>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mydata}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            </div>
        );
    }
}

export default {
    RadarChartWidgetPlugin: RadarChartWidget
};
