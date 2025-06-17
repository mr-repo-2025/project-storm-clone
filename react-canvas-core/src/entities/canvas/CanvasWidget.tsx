import * as React from 'react';
import { CanvasEngine } from '../../CanvasEngine';
import { TransformLayerWidget } from '../layer/TransformLayerWidget';
import styled from '@emotion/styled';
import { SmartLayerWidget } from '../layer/SmartLayerWidget';

export interface DiagramProps {
	engine: CanvasEngine;
	className?: string;
}

namespace S {
	export const Canvas = styled.div`
		position: relative;
		cursor: move;
		overflow: hidden;
	`;
}

export class CanvasWidget extends React.Component<DiagramProps> {
	ref: React.RefObject<HTMLDivElement>;
	keyUp: any;
	keyDown: any;
	canvasListener: any;

	constructor(props: DiagramProps) {
		super(props);

		this.ref = React.createRef();
		this.state = {
			action: null,
			diagramEngineListener: null
		};
	}

	componentWillUnmount() {
		this.props.engine.deregisterListener(this.canvasListener);
		this.props.engine.setCanvas(null);

		document.removeEventListener('keyup', this.keyUp);
		document.removeEventListener('keydown', this.keyDown);
	}

	registerCanvas() {
		this.props.engine.setCanvas(this.ref.current);
		this.props.engine.iterateListeners((list) => {
			list.rendered && list.rendered();
		});
	}

	componentDidUpdate() {
		this.registerCanvas();
	}

	componentDidMount() {
		this.canvasListener = this.props.engine.registerListener({
			repaintCanvas: () => {
				this.forceUpdate();
			}
		});

		this.keyDown = (event) => {
			this.props.engine.getActionEventBus().fireAction({ event });
		};
		this.keyUp = (event) => {
			this.props.engine.getActionEventBus().fireAction({ event });
		};

		document.addEventListener('keyup', this.keyUp);
		document.addEventListener('keydown', this.keyDown);
		this.registerCanvas();
	}

	render() {
		const engine = this.props.engine;
		const model = engine.getModel();

		
		return (
			<S.Canvas
				className={this.props.className}
				ref={this.ref}
				onWheel={(event) => {
					this.props.engine.getActionEventBus().fireAction({ event });
				}}
				onMouseDown={(event) => {
					this.props.engine.getActionEventBus().fireAction({ event });
				}}
				onMouseUp={(event) => {
					this.props.engine.getActionEventBus().fireAction({ event });
				}}
				onMouseMove={(event) => {
					this.props.engine.getActionEventBus().fireAction({ event });
				}}
				onTouchStart={(event) => {
					this.props.engine.getActionEventBus().fireAction({ event });
				}}
				onTouchEnd={(event) => {
					this.props.engine.getActionEventBus().fireAction({ event });
				}}
				onTouchMove={(event) => {
					this.props.engine.getActionEventBus().fireAction({ event });
				}}
			>
				   
					{model.getLayers()[2] &&
					<TransformLayerWidget layer={model.getLayers()[2]} key={model.getLayers()[2].getID()}>
							<SmartLayerWidget layer={model.getLayers()[2]} engine={this.props.engine} key={model.getLayers()[2].getID()} />
					</TransformLayerWidget>}
					<TransformLayerWidget layer={model.getLayers()[0]} key={model.getLayers()[0].getID()}>
							<SmartLayerWidget layer={model.getLayers()[0]} engine={this.props.engine} key={model.getLayers()[0].getID()} />
					</TransformLayerWidget>
					<TransformLayerWidget layer={model.getLayers()[1]} key={model.getLayers()[1].getID()}>
							<SmartLayerWidget layer={model.getLayers()[1]} engine={this.props.engine} key={model.getLayers()[1].getID()} />
					</TransformLayerWidget>
				  
			</S.Canvas>
		);
	}
}
