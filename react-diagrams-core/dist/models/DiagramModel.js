import _filter from 'lodash/filter';
import _flatMap from 'lodash/flatMap';
import _forEach from 'lodash/forEach';
import _some from 'lodash/some';
import _values from 'lodash/values';
import { LinkModel } from '../entities/link/LinkModel';
import { NodeModel } from '../entities/node/NodeModel';
import { CanvasModel } from '@projectstorm/react-canvas-core';
import { NodeLayerModel } from '../entities/node-layer/NodeLayerModel';
import { LinkLayerModel } from '../entities/link-layer/LinkLayerModel';
import { NodeWLayerModel } from '../entities/node-layer-w/NodeWLayerModel';
export class DiagramModel extends CanvasModel {
    constructor(options = {}) {
        super(options);
        this.addLayer(new LinkLayerModel());
        this.addLayer(new NodeLayerModel());
        this.addLayer(new NodeWLayerModel());
    }
    deserialize(event) {
        this.layers = [];
        super.deserialize(event);
    }
    addLayer(layer) {
        super.addLayer(layer);
        if (layer instanceof NodeLayerModel) {
            this.activeNodeLayer = layer;
        }
        if (layer instanceof LinkLayerModel) {
            this.activeLinkLayer = layer;
        }
    }
    getLinkLayers() {
        return _filter(this.layers, (layer) => {
            return layer instanceof LinkLayerModel;
        });
    }
    getNodeLayers() {
        return _filter(this.layers, (layer) => {
            return layer instanceof NodeLayerModel;
        });
    }
    getNodeWLayers() {
        return _filter(this.layers, (layer) => {
            return layer instanceof NodeWLayerModel;
        });
    }
    getActiveNodeLayer() {
        if (!this.activeNodeLayer) {
            const layers = this.getNodeLayers();
            if (layers.length === 0) {
                this.addLayer(new NodeLayerModel());
            }
            else {
                this.activeNodeLayer = layers[0];
            }
        }
        return this.activeNodeLayer;
    }
    getActiveNodeWLayer() {
        if (!this.activeNodeWLayer) {
            const layers = this.getNodeWLayers();
            if (layers.length === 0) {
                this.addLayer(new NodeWLayerModel());
            }
            else {
                this.activeNodeWLayer = layers[0];
            }
        }
        return this.activeNodeWLayer;
    }
    getActiveLinkLayer() {
        if (!this.activeLinkLayer) {
            const layers = this.getLinkLayers();
            if (layers.length === 0) {
                this.addLayer(new LinkLayerModel());
            }
            else {
                this.activeLinkLayer = layers[0];
            }
        }
        return this.activeLinkLayer;
    }
    getNode(node) {
        for (const layer of this.getNodeLayers()) {
            const model = layer.getModel(node);
            if (model) {
                return model;
            }
        }
    }
    getNodeW(node) {
        for (const layer of this.getNodeWLayers()) {
            const model = layer.getModel(node);
            if (model) {
                return model;
            }
        }
    }
    getLink(link) {
        for (const layer of this.getLinkLayers()) {
            const model = layer.getModel(link);
            if (model) {
                return model;
            }
        }
    }
    //  un comentario 
    addAll(...models) {
        _forEach(models, (model) => {
            if (model instanceof LinkModel) {
                this.addLink(model);
            }
            else if (model instanceof NodeModel) {
                this.addNode(model);
            }
        });
        return models;
    }
    addLink(link) {
        this.getActiveLinkLayer().addModel(link);
        this.fireEvent({
            link,
            isCreated: true
        }, 'linksUpdated');
        return link;
    }
    addNode(node) {
        this.getActiveNodeLayer().addModel(node);
        this.fireEvent({ node, isCreated: true }, 'nodesUpdated');
        return node;
    }
    addNodeW(node) {
        this.getActiveNodeWLayer().addModel(node);
        this.fireEvent({ node, isCreated: true }, 'nodesUpdated');
        return node;
    }
    removeLink(link) {
        const removed = _some(this.getLinkLayers(), (layer) => {
            return layer.removeModel(link);
        });
        if (removed) {
            this.fireEvent({ link, isCreated: false }, 'linksUpdated');
        }
    }
    removeNode(node) {
        const removed = _some(this.getNodeLayers(), (layer) => {
            return layer.removeModel(node);
        });
        if (removed) {
            this.fireEvent({ node, isCreated: false }, 'nodesUpdated');
        }
    }
    getLinks() {
        return _flatMap(this.getLinkLayers(), (layer) => {
            return _values(layer.getModels());
        });
    }
    getNodes() {
        return _flatMap([...this.getNodeLayers(), ...this.getNodeWLayers()], (layer) => {
            return _values(layer.getModels());
        });
    }
}
//# sourceMappingURL=DiagramModel.js.map