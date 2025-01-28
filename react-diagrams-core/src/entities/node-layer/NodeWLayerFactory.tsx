import * as React from 'react';
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '../../DiagramEngine';
import { NodeWLayerModel } from './NodeWLayerModel';
import { NodeWLayerWidget } from './NodeWLayerWidget';

export class NodeWLayerFactory extends AbstractReactFactory<NodeWLayerModel, DiagramEngine> {
    constructor() {
        super('diagram-nodes');
    }

    generateModel(event: GenerateModelEvent): NodeWLayerModel {
        return new NodeWLayerModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<NodeWLayerModel>): JSX.Element {
        return <NodeWLayerWidget layer={event.model} engine={this.engine} />;
    }
}
