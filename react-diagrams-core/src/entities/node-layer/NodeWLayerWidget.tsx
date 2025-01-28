import * as React from 'react';
import _map from 'lodash/map';
import { NodeModel } from '../node/NodeModel';
import { NodeWidget } from '../node/NodeWidget';
import { NodeWLayerModel } from './NodeWLayerModel';
import { DiagramEngine } from '../../DiagramEngine';

export interface NodeLayerWidgetProps {
    layer: NodeWLayerModel;
    engine: DiagramEngine;
}

export class NodeWLayerWidget extends React.Component<NodeLayerWidgetProps> {
    render() {
        return (
            <>
                {_map(this.props.layer.getNodes(), (node: NodeModel) => {
                    return <NodeWidget  key={node.getID()} diagramEngine={this.props.engine} node={node} />;
                })}
            </>
        );
    }
}
