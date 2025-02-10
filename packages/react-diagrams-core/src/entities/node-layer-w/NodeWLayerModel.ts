import { LayerModel, LayerModelGenerics } from '@projectstorm/react-canvas-core';
import { NodeModel } from '../node/NodeModel';
import { DiagramEngine } from '../../DiagramEngine';
import { DiagramModel } from '../../models/DiagramModel';

export interface NodeWLayerModelGenerics extends LayerModelGenerics {
	CHILDREN: NodeModel;
	ENGINE: DiagramEngine;
}

export class NodeWLayerModel<G extends NodeWLayerModelGenerics = NodeWLayerModelGenerics> extends LayerModel<G> {
	constructor() {
		super({
			type: 'diagram-nodes-w',
			isSvg: false,
			transformed: true
		});
	}

	addModel(model: G['CHILDREN']): void {
		if (!(model instanceof NodeModel)) {
			throw new Error('Can only add nodes to this layer ');
		}
		model.registerListener({
			entityRemoved: () => {
				(this.getParent() as DiagramModel).removeNode(model);
			}
		});
		super.addModel(model);
	}

	getChildModelFactoryBank(engine: G['ENGINE']) {
		return engine.getNodeFactories();
	}

	getNodes() {
		return this.getModels();
	}
}
