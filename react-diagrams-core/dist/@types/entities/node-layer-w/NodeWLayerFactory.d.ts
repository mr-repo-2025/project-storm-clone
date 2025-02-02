import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '../../DiagramEngine';
import { NodeWLayerModel } from './NodeWLayerModel';
export declare class NodeWLayerFactory extends AbstractReactFactory<NodeWLayerModel, DiagramEngine> {
    constructor();
    generateModel(event: GenerateModelEvent): NodeWLayerModel;
    generateReactWidget(event: GenerateWidgetEvent<NodeWLayerModel>): JSX.Element;
}
