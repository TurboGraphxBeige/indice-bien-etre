
import React from 'react';
import { Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Accordion from '@js/components/misc/panels/Accordion';
import RadarChartsDimensions from '@js/components/data/identify/RadarChartsDimensions';
import './style/topchart.css';

import { updateNode } from '@mapstore/actions/layers';
import { connect } from 'react-redux';
import ToggleButton from '@mapstore/components/buttons/ToggleButton';


const mapDispatchToProps = {
    updateNode
};

class IdentifyIBEAccordion extends React.Component {
    static PropTypes = {
        data: PropTypes.object,
        activePanel: PropTypes.string,
        onChange: PropTypes.func,
        selectedLayer: PropTypes.string
    };

    static defaultProps = {
        name: ''
    }

    state = {
        activePanel: "panel-environnement",
        environnement_lock: "eye-close",
        sociale_lock: "eye-close",
        economique_lock: "eye-close",
        current_lock: ""
    };

    visualizationLockButtonGlyph(button) {
        if (this.state.current_lock === button) return 'eye-open';
        return 'eye-close';
    }

    visualizationLockButtonToggled(button) {
        if (this.state.current_lock === button) return true;
        return false;
    }

    toggleVisualizationLockButton(button) {
        // console.log(button);
        if (button === this.state.current_lock) {
            this.setState({ current_lock: "" }, this.resetVisualization);
        } else {
            this.setState({ current_lock: button }, this.changeVisualization);
        }
    }

    // changeVisualization(button) {
    changeVisualization() {
        if (this.state.current_lock === 'Environnement') {
            this.props.updateNode("aire_diffusion", 'layers', {style: 'indice_bien_etre_environnement'});
            this.props.updateNode("hexagone", 'layers', {style: 'indice_bien_etre_environnement'});
            this.props.updateNode("ilot_diffusion", 'layers', {style: 'indice_bien_etre_environnement'});
        }
        if (this.state.current_lock === 'Sociale') {
            this.props.updateNode("aire_diffusion", 'layers', {style: 'indice_bien_etre_environnement'});
            this.props.updateNode("hexagone", 'layers', {style: 'indice_bien_etre_environnement'});
            this.props.updateNode("ilot_diffusion", 'layers', {style: 'indice_bien_etre_environnement'});
        }
        if (this.state.current_lock === 'Économique') {
            this.props.updateNode("aire_diffusion", 'layers', {style: 'indice_bien_etre_environnement'});
            this.props.updateNode("hexagone", 'layers', {style: 'indice_bien_etre_environnement'});
            this.props.updateNode("ilot_diffusion", 'layers', {style: 'indice_bien_etre_environnement'});
        }
    }

    resetVisualization() {
        // console.log("RESETING VISZ");
        this.props.updateNode("aire_diffusion", 'layers', {style: 'indice_bien_etre'});
        this.props.updateNode("ilot_diffusion", 'layers', {style: 'indice_bien_etre'});
        this.props.updateNode("hexagone", 'layers', {style: 'indice_bien_etre'});
    }

    handleToggleButtonClick(button) {
        this.toggleVisualizationLockButton(button);
    }

    render() {
        var chartData = JSON.stringify(this.props.data[0]);
        var parsedChartData;
        var environnement;
        var social;
        var economique;

        if (this.props.data[0] !==  undefined) {
            parsedChartData = JSON.parse(chartData);
            environnement = parsedChartData.response.features[0].properties.ibe_d1;
            social = parsedChartData.response.features[0].properties.ibe_d2;
            economique = parsedChartData.response.features[0].properties.ibe_d3;
        } else {
            parsedChartData = "";
        }

        const panels = [
            {
                id: 'panel-environnement',
                head: {
                    preview: <h1>{environnement}</h1>,
                    title: 'Environnement',
                    description: 'Indicateurs de la dimension environnementale',
                    size: 'sm'
                },
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Environnement"}/>,
                tool: <ToggleButton pressed={this.visualizationLockButtonToggled('Environnement')} glyphicon={this.visualizationLockButtonGlyph('Environnement')} tooltip={<Tooltip>Visualiser les résultats selon les polygones d'aires de diffusion</Tooltip>} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('Environnement'); } }/>
            },

            {
                id: 'panel-social',
                head: {
                    preview: <h1>{social}</h1>,
                    title: 'Social',
                    description: 'Indicateurs de la dimension sociale',
                    size: 'sm'
                },
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Sociale"}/>,
                tool: <ToggleButton pressed={this.visualizationLockButtonToggled('Sociale')} glyphicon={this.visualizationLockButtonGlyph('Sociale')} tooltip={<Tooltip>Visualiser les résultats selon les polygones d'aires de diffusion</Tooltip>} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('Sociale'); } }/>
            },
            {
                id: 'panel-economique',
                head: {
                    preview: <h1>{economique}</h1>,
                    title: 'Économique',
                    description: 'Indicateurs de la dimension économique',
                    size: 'sm'
                },
                body: <RadarChartsDimensions width="100%" height="100%" data={this.props.data} name={"Économique"}/>,
                tool: <ToggleButton pressed={this.visualizationLockButtonToggled('Économique')} glyphicon={this.visualizationLockButtonGlyph('Économique')} tooltip={<Tooltip>Visualiser les résultats selon les polygones d'aires de diffusion</Tooltip>} style={{marginLeft: 8 + 'px', marginRight: 8 + 'px', borderRadius: 6 + 'px'}} onClick={ () => { this.handleToggleButtonClick('Économique'); } }/>
            }
        ];

        return (
            <>
                <Accordion activePanel={this.props.activePanel} panels={panels} onSelect={ (key) => {
                    this.setState({activePanel: key});
                } } />
            </>
        );
    }
}

export default connect(null, mapDispatchToProps)(IdentifyIBEAccordion);
