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
import WidgetContainer from '@mapstore/components/widgets/widget/WidgetContainer';
import ContainerDimensions from 'react-container-dimensions';

//

class RadarChartWidget extends React.Component {

    render() {
        const data = [
            {subject: 'Environnement', A: 100, B: 85, fullMark: 100,},
            {subject: 'Économie', A: 40, B: 50, fullMark: 100,},
            {subject: 'Sociale', A: 66, B: 70, fullMark: 100,},

        ];

        const style = {
            position: "absolute",
            zIndex: 100000,
            top: 50,
            left: 50
        };

        return (
                    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar
                            name="Mike"
                            dataKey="A"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
        );
    }
}

export default {
    RadarChartWidgetPlugin: RadarChartWidget
};
