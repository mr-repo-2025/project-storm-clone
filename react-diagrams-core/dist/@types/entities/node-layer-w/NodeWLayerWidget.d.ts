import * as React from 'react';
import { NodeWLayerModel } from './NodeWLayerModel';
import { DiagramEngine } from '../../DiagramEngine';
export interface NodeWLayerWidgetProps {
    layer: NodeWLayerModel;
    engine: DiagramEngine;
}
export declare class NodeWLayerWidget extends React.Component<NodeWLayerWidgetProps> {
    render(): React.JSX.Element;
}
