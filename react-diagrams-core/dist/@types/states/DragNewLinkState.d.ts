import { AbstractDisplacementState, AbstractDisplacementStateEvent } from '@projectstorm/react-canvas-core';
import { PortModel } from '../entities/port/PortModel';
import { LinkModel } from '../entities/link/LinkModel';
import { DiagramEngine } from '../DiagramEngine';
export interface DragNewLinkStateOptions {
    /**
     * If enabled, the links will stay on the canvas if they dont connect to a port
     * when dragging finishes
     */
    allowLooseLinks?: boolean;
    /**
     * If enabled, then a link can still be drawn from the port even if it is locked
     */
    allowLinksFromLockedPorts?: boolean;
}
export declare class DragNewLinkState<E extends DiagramEngine = DiagramEngine> extends AbstractDisplacementState<E> {
    port: PortModel;
    link: LinkModel;
    config: DragNewLinkStateOptions;
    constructor(options?: DragNewLinkStateOptions);
    /**
     * Calculates the link's far-end point position on mouse move.
     * In order to be as precise as possible the mouse initialXRelative & initialYRelative are taken into account as well
     * as the possible engine offset
     */
    fireMouseMoved(event: AbstractDisplacementStateEvent): any;
}
