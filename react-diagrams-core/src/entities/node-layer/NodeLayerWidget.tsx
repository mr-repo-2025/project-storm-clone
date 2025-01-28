import * as React from 'react';
import _map from 'lodash/map';
import { NodeModel } from '../node/NodeModel';
import { NodeWidget } from '../node/NodeWidget';
import { NodeLayerModel } from './NodeLayerModel';
import { DiagramEngine } from '../../DiagramEngine';

export interface NodeLayerWidgetProps {
	layer: NodeLayerModel;
	engine: DiagramEngine;
}

export class NodeLayerWidget extends React.Component<NodeLayerWidgetProps> {
	render() {
		let node1: NodeModel
		return (
			<div className='worktable_ms'>
				{_map(this.props.layer.getNodes(), (node: NodeModel) => {
					return <NodeWidget key={node.getID()} diagramEngine={this.props.engine} node={node} />;
				})}
			</div>
		);
	}
}
