/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { branch, renameProps } from 'recompose';
import BorderLayout from '@mapstore/components/layout/BorderLayout';
import DockPanel from '@js/components/misc/panels/DockPanel';
import ResizableModal from '@mapstore/components/misc/ResizableModal';

/**
 * Component for rendering a DockPanel or Modal based on dock props.
 * @memberof components.misc.panels
 * @name DockablePanel
 * @class
 * @prop {bool} dock true renders a DockPanel and false a RisizableModal
 * @prop {bool} open show/hide component
 */

const Modal = renameProps({
    open: 'show'
})(({
    children,
    header,
    ...props
}) => {
    return (
        <ResizableModal {...props}>
            <BorderLayout header={<div className="ms-header">{header}</div>}>
                {children}
            </BorderLayout>
        </ResizableModal>
    );
});

export default branch(
    ({dock}) => !dock,
    () => props => <Modal {...props}/>
)(DockPanel);
