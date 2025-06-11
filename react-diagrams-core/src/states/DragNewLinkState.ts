import {
	AbstractDisplacementState,
	AbstractDisplacementStateEvent,
	Action,
	ActionEvent,
	InputType
} from '@projectstorm/react-canvas-core';
import { PortModel } from '../entities/port/PortModel';
import { MouseEvent } from 'react';
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

export class DragNewLinkState<E extends DiagramEngine = DiagramEngine> extends AbstractDisplacementState<E> {
	port: PortModel;
	link: LinkModel;
	config: DragNewLinkStateOptions;

	constructor(options: DragNewLinkStateOptions = {}) {
		super({ name: 'drag-new-link' });

		this.config = {
			allowLooseLinks: true,
			allowLinksFromLockedPorts: false,
			...options
		};

		this.registerAction(
			new Action({
				type: InputType.MOUSE_DOWN,
				fire: (event: ActionEvent<MouseEvent, PortModel>) => {
					const element = this.engine.getMouseElement(event.event);
					if (!(element instanceof PortModel)) {
						this.eject();
						return;
					}
					this.port = element;

					if (!this.config.allowLinksFromLockedPorts && this.port.isLocked()) {
						this.eject();
						return;
					}

					// No se crea el link aún
					this.port.reportPosition();
				}
			})
		);

		this.registerAction(
			new Action({
				type: InputType.MOUSE_UP,
				fire: (event: ActionEvent<MouseEvent>) => {
					const model = this.engine.getMouseElement(event.event);
					// check to see if we connected to a new port
					if (model instanceof PortModel) {
						if (this.port.canLinkToPort(model)) {
							if (this.link) {
								this.link.setTargetPort(model);
								model.reportPosition();
								this.engine.repaintCanvas();
								return;
							}
						} else {
							if (this.link) {
								this.link.remove();
								this.engine.repaintCanvas();
								return;
							}

						}
					}

					if (!this.config.allowLooseLinks) {
						if (this.link) {
							this.link.remove();
							this.engine.repaintCanvas();
						}
					}
				}
			})
		);
	}

	/**
	 * Calculates the link's far-end point position on mouse move.
	 * In order to be as precise as possible the mouse initialXRelative & initialYRelative are taken into account as well
	 * as the possible engine offset
	 */
	fireMouseMoved(event: AbstractDisplacementStateEvent): any {
		if (!this.link && this.port) {
			this.link = this.port.createLinkModel();

			if (!this.link) return;

			this.link.setSourcePort(this.port);
			this.link.setSelected(true);
			this.engine.getModel().addLink(this.link);
		}

		if (!this.link || !this.port) return;

		const portPos = this.port.getPosition();
		const zoomLevelPercentage = this.engine.getModel().getZoomLevel() / 100;
		const engineOffsetX = this.engine.getModel().getOffsetX() / zoomLevelPercentage;
		const engineOffsetY = this.engine.getModel().getOffsetY() / zoomLevelPercentage;
		const initialXRelative = this.initialXRelative / zoomLevelPercentage;
		const initialYRelative = this.initialYRelative / zoomLevelPercentage;
		const linkNextX = portPos.x - engineOffsetX + (initialXRelative - portPos.x) + event.virtualDisplacementX;
		const linkNextY = portPos.y - engineOffsetY + (initialYRelative - portPos.y) + event.virtualDisplacementY;
		if (event.virtualDisplacementX === 0 && event.virtualDisplacementY === 0) return;

		this.link.getLastPoint().setPosition(linkNextX, linkNextY);
		this.engine.repaintCanvas();
	}
}
