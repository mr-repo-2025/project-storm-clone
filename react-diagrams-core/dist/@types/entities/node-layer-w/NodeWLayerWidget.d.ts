import * as React from 'react';
import { NodeWLayerModel } from './NodeWLayerModel';
import { DiagramEngine } from '../../DiagramEngine';
export interface NodeLayerWidgetProps {
    layer: NodeWLayerModel;
    engine: DiagramEngine;
}
export declare class NodeWLayerWidget extends React.Component<NodeLayerWidgetProps> {
    render(): React.JSX.Element;
}
