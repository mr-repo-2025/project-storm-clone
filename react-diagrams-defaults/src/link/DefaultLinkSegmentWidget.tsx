import * as React from 'react';
import { DefaultLinkFactory } from './DefaultLinkFactory';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultLinkModel } from './DefaultLinkModel';
import { Menu, MenuItem, Button } from '@mui/material';

export interface DefaultLinkSegmentWidgetProps {
	path: string;
	link: DefaultLinkModel;
	selected: boolean;
	forwardRef: React.RefObject<SVGPathElement>;
	factory: DefaultLinkFactory;
	diagramEngine: DiagramEngine;
	onSelection: (selected: boolean) => any;
	extras: object;
	propsE: object;
}
const displayTooltip = (e, props) => {
	const { link, propsE } = props;
	e.stopPropagation();
	e.preventDefault();

	try {
		propsE?.setLinkToRemove({
			id: link.options.id,
			clientX: e.clientX,
			clientY: e.clientY,
			publicId:
				link.sourcePort.parent.title +
				'_' +
				link.sourcePort.parent.order +
				'_' +
				link.targetPort.parent.title +
				'_' +
				link.targetPort.parent.order,
		});
	} catch (error) {
		console.log('error', error);

	}

};
const displayTooltipCustom = (e, props) => {
	// const { link,propsE } = props;
	e.stopPropagation();
	e.preventDefault();


}


export class DefaultLinkSegmentWidget extends React.Component<DefaultLinkSegmentWidgetProps> {
	render() {
		const Bottom = React.cloneElement(
			this.props.factory.generateLinkSegment(
				this.props.link,
				this.props.selected || this.props.link.isSelected(),
				this.props.path
			),
			{
				ref: this.props.forwardRef
			}
		);
		const [contextMenu, setContextMenu] = React.useState<{
			mouseX: number;
			mouseY: number;
		} | null>(null);

		// const handleContextMenu = (event: React.MouseEvent) => {
		// 	event.preventDefault(); // Evita el menú del navegador
		// 	setContextMenu(
		// 		contextMenu === null
		// 			? {
		// 				mouseX: event.clientX + 2,
		// 				mouseY: event.clientY - 6,
		// 			}
		// 			: // Reabrir en la misma posición
		// 			null,
		// 	);
		// };

		const Top = React.cloneElement(Bottom, {
			strokeLinecap: 'round',
			onMouseLeave: () => {
				this.props.onSelection(false);
			},
			onMouseEnter: () => {
				this.props.onSelection(true);
			},
			...this.props.extras,
			ref: null,
			'data-linkid': this.props.link.getID(),
			strokeOpacity: this.props.selected ? 0.1 : 0,
			strokeWidth: 20,
			fill: 'none',
			onDoubleClick: (e) => {
				if (!this.props.link.isLocked()) {
					this.props.link.remove();
				}
			},
			onContextMenu: (e) => {
				if (!this.props.link.isLocked()) {
					e.preventDefault();
					// this.props.link.remove();
					// console.log('this.props', this.props);
					// displayTooltip(e, this.props);
						setContextMenu(
							contextMenu === null
								? {
									mouseX: e.clientX + 2,
									mouseY: e.clientY - 6,
								}
								: // Reabrir en la misma posición
								null,
						);
				}
			}
		});

		return (
			<>
				<g>
					{Bottom}
					{Top}
				</g>
				<Menu
					open={contextMenu !== null}
					// onClose={handleClose}
					anchorReference="anchorPosition"
					anchorPosition={
						contextMenu !== null
							? { top: contextMenu.mouseY, left: contextMenu.mouseX }
							: undefined
					}
				>
					<MenuItem onClick={()=>{
						if (!this.props.link.isLocked()) {
						  this.props.link.remove();
						}
					}}>Opción 1</MenuItem>
		 
				</Menu>

			</>

		);
	}
}
