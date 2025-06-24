import * as React from 'react';
import { DefaultLinkFactory } from './DefaultLinkFactory';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultLinkModel } from './DefaultLinkModel';

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
	e.stopPropagation();
	e.preventDefault();
	
	try {
		props.link.propsE = {
			id: props.link.getID(),
			clientX: e.clientX,
			clientY: e.clientY,
			publicId:
				props.link.sourcePort.parent.title +
				'_' +
				props.link.sourcePort.parent.order +
				'_' +
				props.link.targetPort.parent.title +
				'_' +
				props.link.targetPort.parent.order,
		};
	} catch (error) {
		console.log('error', error);

	}

};
 

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
	 

		const Top = React.cloneElement(Bottom, {
			strokeLinecap: 'round',
			onMouseLeave: () => {
				this.props.onSelection(false);
			},
			onMouseEnter: () => {
				this.props.onSelection(true);
			},
			onMouseUp : (e)=>{
				this.props.link.fireEvent({ mouseEvent: e, function: 'onMouseUp' }, 'eventDidFire');
			},
			onKeyUp : (e)=>{
				this.props.link.fireEvent({ mouseEvent: e, function: 'onKeyUp', key: e.key }, 'eventDidFire');
			},
			...this.props.extras,
			ref: null,
			'data-linkid': this.props.link.getID(),
			strokeOpacity: this.props.selected ? 0.1 : 0,
			strokeWidth: 20,
			fill: 'none',
			onDoubleClick: (e) => {
				// if (!this.props.link.isLocked()) {
				// 	this.props.link.remove();
				// }
			},
			onContextMenu: (e) => {
				if (!this.props.link.isLocked()) {
					// e.preventDefault();
					// this.props.link.remove();
					displayTooltip(e, this.props);
					let linka  =this.props.link;
					this.props.link.fireEvent({ mouseEvent: e, linka }, 'onContextMenu');
				}
			}
		});
		

		return (
				<g>
					{Bottom}
					{Top}
				</g>
		);
	}
}
