/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import WidgetContainer from '@mapstore/components/widgets/widget/WidgetContainer';
import {
    Glyphicon
} from 'react-bootstrap';


//
import createPlugin from '@mapstore/utils/PluginsUtils';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
//


const style = {position: "absolute", top: "100px", left: "100px", zIndex: 1000000};

const Component = () => <div style={style}>WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwww</div>;

export default createPlugin('RadarChartWidget', {
    component: Component
});
