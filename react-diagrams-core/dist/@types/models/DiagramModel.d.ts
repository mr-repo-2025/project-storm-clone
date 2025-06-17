import { LinkModel } from '../entities/link/LinkModel';
import { NodeModel } from '../entities/node/NodeModel';
import { BaseEntityEvent, BaseEntityListener, BaseModel, CanvasModel, CanvasModelGenerics, LayerModel, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { NodeLayerModel } from '../entities/node-layer/NodeLayerModel';
import { LinkLayerModel } from '../entities/link-layer/LinkLayerModel';
import { NodeWLayerModel } from '../entities/node-layer-w/NodeWLayerModel';
export interface DiagramListener extends BaseEntityListener {
    nodesUpdated?(event: BaseEntityEvent & {
        node: NodeModel;
        isCreated: boolean;
    }): void;
    linksUpdated?(event: BaseEntityEvent & {
        link: LinkModel;
        isCreated: boolean;
    }): void;
}
export interface DiagramModelGenerics extends CanvasModelGenerics {
    LISTENER: DiagramListener;
}
export declare class DiagramModel<G extends DiagramModelGenerics = DiagramModelGenerics> extends CanvasModel<G> {
    protected activeNodeWLayer: NodeWLayerModel;
    protected activeLinkLayer: LinkLayerModel;
    protected activeNodeLayer: NodeLayerModel;
    constructor(options?: G['OPTIONS']);
    deserialize(event: DeserializeEvent<this>): void;
    addLayer(layer: LayerModel): void;
    getLinkLayers(): LinkLayerModel[];
    getNodeLayers(): NodeLayerModel[];
    getNodeWLayers(): NodeWLayerModel[];
    getActiveNodeLayer(): NodeLayerModel;
    getActiveNodeWLayer(): NodeWLayerModel;
    getActiveLinkLayer(): LinkLayerModel;
    getNode(node: string): NodeModel;
    getNodeW(node: string): NodeModel;
    getLink(link: string): LinkModel;
    addAll(...models: BaseModel[]): BaseModel[];
    addLink(link: LinkModel): LinkModel;
    addNode(node: NodeModel): NodeModel;
    addNodeW(node: NodeModel): NodeModel;
    removeLink(link: LinkModel): void;
    removeNode(node: NodeModel): void;
    removeNodeW(node: NodeModel): void;
    getLinks(): LinkModel[];
    getNodes(): NodeModel[];
}
