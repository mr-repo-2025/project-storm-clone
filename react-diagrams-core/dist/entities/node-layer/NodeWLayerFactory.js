import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { NodeWLayerModel } from './NodeWLayerModel';
import { NodeWLayerWidget } from './NodeWLayerWidget';
export class NodeWLayerFactory extends AbstractReactFactory {
    constructor() {
        super('diagram-nodes');
    }
    generateModel(event) {
        return new NodeWLayerModel();
    }
    generateReactWidget(event) {
        return React.createElement(NodeWLayerWidget, { layer: event.model, engine: this.engine });
    }
}
//# sourceMappingURL=NodeWLayerFactory.js.map