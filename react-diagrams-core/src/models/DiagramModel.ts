import _filter from 'lodash/filter';
import _flatMap from 'lodash/flatMap';
import _forEach from 'lodash/forEach';
import _some from 'lodash/some';
import _values from 'lodash/values';
import { LinkModel } from '../entities/link/LinkModel';
import { NodeModel } from '../entities/node/NodeModel';
import {
	BaseEntityEvent,
	BaseEntityListener,
	BaseModel,
	CanvasModel,
	CanvasModelGenerics,
	LayerModel,
	DeserializeEvent
} from '@projectstorm/react-canvas-core';
import { NodeLayerModel } from '../entities/node-layer/NodeLayerModel';
import { LinkLayerModel } from '../entities/link-layer/LinkLayerModel';
import { NodeWLayerModel } from '../entities/node-layer-w/NodeWLayerModel';

export interface DiagramListener extends BaseEntityListener {
	nodesUpdated?(event: BaseEntityEvent & { node: NodeModel; isCreated: boolean }): void;
	linksUpdated?(event: BaseEntityEvent & { link: LinkModel; isCreated: boolean }): void;
}

export interface DiagramModelGenerics extends CanvasModelGenerics {
	LISTENER: DiagramListener;
}

export class DiagramModel<G extends DiagramModelGenerics = DiagramModelGenerics> extends CanvasModel<G> {
	protected activeNodeWLayer: NodeWLayerModel;
	protected activeLinkLayer: LinkLayerModel;
	protected activeNodeLayer: NodeLayerModel;

	constructor(options: G['OPTIONS'] = {}) {
		super(options);
		this.addLayer(new NodeWLayerModel());
		this.addLayer(new LinkLayerModel());
		this.addLayer(new NodeLayerModel());
	}

	deserialize(event: DeserializeEvent<this>) {
		this.layers = [];
		super.deserialize(event);
	}

	addLayer(layer: LayerModel): void {
		super.addLayer(layer);
		if (layer instanceof NodeWLayerModel) {
			this.activeNodeWLayer = layer;
		}
		if (layer instanceof LinkLayerModel) {
			this.activeLinkLayer = layer;
		}
		if (layer instanceof NodeLayerModel) {
			this.activeNodeLayer = layer;
		}
	}

	getLinkLayers(): LinkLayerModel[] {
		return _filter(this.layers, (layer) => {
			return layer instanceof LinkLayerModel;
		}) as LinkLayerModel[];
	}

	getNodeLayers(): NodeLayerModel[] {
		return _filter(this.layers, (layer) => {
			return layer instanceof NodeLayerModel;
		}) as NodeLayerModel[];
	}

	getNodeWLayers(): NodeWLayerModel[] {
		return _filter(this.layers, (layer) => {
			return layer instanceof NodeWLayerModel;
		}) as NodeWLayerModel[];
	}

	getActiveNodeLayer(): NodeLayerModel {
		if (!this.activeNodeLayer) {
			const layers = this.getNodeLayers();
			if (layers.length === 0) {
				this.addLayer(new NodeLayerModel());
			} else {
				this.activeNodeLayer = layers[0];
			}
		}
		return this.activeNodeLayer;
	}

	getActiveNodeWLayer(): NodeWLayerModel {
		if (!this.activeNodeWLayer) {
			const layers = this.getNodeWLayers();
			if (layers.length === 0) {
				this.addLayer(new NodeWLayerModel());
			} else {
				this.activeNodeWLayer = layers[0];
			}
		}
		return this.activeNodeWLayer;
	}

	getActiveLinkLayer(): LinkLayerModel {
		if (!this.activeLinkLayer) {
			const layers = this.getLinkLayers();
			if (layers.length === 0) {

				this.addLayer(new LinkLayerModel());
			} else {
				this.activeLinkLayer = layers[0];
			}
		}
		return this.activeLinkLayer;
	}

	getNode(node: string): NodeModel {
		for (const layer of this.getNodeLayers()) {
			const model = layer.getModel(node);
			if (model) {
				return model;
			}
		}
	}
	getNodeW(node: string): NodeModel {
		for (const layer of this.getNodeWLayers()) {
			const model = layer.getModel(node);
			if (model) {
				return model;
			}
		}
	}

	getLink(link: string): LinkModel {
		for (const layer of this.getLinkLayers()) {
			const model = layer.getModel(link);
			if (model) {
				return model;
			}
		}
	}
//  un comentario 
	addAll(...models: BaseModel[]): BaseModel[] {
		_forEach(models, (model) => {
			if (model instanceof LinkModel) {
				this.addLink(model);
			} else if (model instanceof NodeModel) {
				this.addNode(model);
			}
		});
		return models;
	}

	addLink(link: LinkModel): LinkModel {
		this.getActiveLinkLayer().addModel(link);
		this.fireEvent(
			{
				link,
				isCreated: true
			},
			'linksUpdated'
		);
		return link;
	}

 

	addNode(node: NodeModel): NodeModel {
		this.getActiveNodeLayer().addModel(node);
		this.fireEvent({ node, isCreated: true }, 'nodesUpdated');
		return node;
	}

	addNodeW(node: NodeModel): NodeModel {
		this.getActiveNodeWLayer().addModel(node);
		this.fireEvent({ node, isCreated: true }, 'nodesUpdated');
		return node;
	}

	removeLink(link: LinkModel) {
		const removed = _some(this.getLinkLayers(), (layer) => {
			return layer.removeModel(link);
		});
		if (removed) {
			this.fireEvent({ link, isCreated: false }, 'linksUpdated');
		}
	}

	removeNode(node: NodeModel) {
		const removed = _some(this.getNodeLayers(), (layer) => {
			return layer.removeModel(node);
		});
		if (removed) {
			this.fireEvent({ node, isCreated: false }, 'nodesUpdated');
		}
	}
	removeNodeW(node: NodeModel) {
		const removed = _some(this.getNodeWLayers(), (layer) => {
			return layer.removeModel(node);
		});
		if (removed) {
			this.fireEvent({ node, isCreated: false }, 'nodesUpdated');
		}
	}

	getLinks(): LinkModel[] {
		return _flatMap(this.getLinkLayers(), (layer) => {
			return _values(layer.getModels());
		});
	}

	getNodes(): NodeModel[] {
		return _flatMap([...this.getNodeLayers() ,...this.getNodeWLayers()], (layer) => {
			return _values(layer.getModels());
		});
	}
}
