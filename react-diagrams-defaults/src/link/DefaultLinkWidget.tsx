import { DiagramEngine, LinkWidget, PointModel } from '@projectstorm/react-diagrams-core';
import * as React from 'react';
import { MouseEvent, useEffect, useRef } from 'react';
import { DefaultLinkModel } from './DefaultLinkModel';
import { DefaultLinkPointWidget } from './DefaultLinkPointWidget';
import { DefaultLinkSegmentWidget } from './DefaultLinkSegmentWidget';
 
 
export interface DefaultLinkProps {
	link: DefaultLinkModel;
	diagramEngine: DiagramEngine;
	pointAdded?: (point: PointModel, event: MouseEvent) => any;
	renderPoints?: boolean;
	selected?: (event: MouseEvent) => any;
}


const CustomLinkArrowWidget = (props) => {
	const { point, previousPoint,path,points } = props;
	const angle =
		270 +
		(Math.atan2(
			point.getPosition().y - previousPoint.getPosition().y,
			point.getPosition().x - previousPoint.getPosition().x
		) *
			180) /
			Math.PI;
 
		var distancer = {x:0, y:0} ;
		for (let j = 0; j < points.length - 1; j++) {
			distancer = calculate(points[j], points[j + 1]) ;
		}
	   
	return (
		<g className="arrow" transform={'translate(' + (distancer.x)  + ', ' + (distancer.y) + ')'}>
		   	<g style={{ transform: 'rotate(' + angle + 'deg)' }}>
				<g transform={'translate(-10, -15)'}>
				<path d="M4.14645 4.85355C4.34171 5.04882 4.65829 5.04882 4.85355 4.85355L8.03553 1.67157C8.2308 1.47631 8.2308 1.15973 8.03553 0.964466C7.84027 0.769204 7.52369 0.769204 7.32843 0.964466L4.5 3.79289L1.67157 0.964466C1.47631 0.769204 1.15973 0.769204 0.964466 0.964466C0.769204 1.15973 0.769204 1.47631 0.964466 1.67157L4.14645 4.85355ZM4 3.5V4.5H5V3.5H4Z" fill="#ACACAC" />
				</g>
			</g>
		</g> 
		
	);
};


const calculate = (point1 , point2) => {
    const dx = point2.position.x - point1.position.x;
    const dy = point2.position.y - point1.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const midX = (point1.position.x + point2.position.x) / 2;
    const midY = (point1.position.y + point2.position.y) / 2;

    // setDistance(dist);
   return { x: midX, y: midY };
 };

export const DefaultLinkWidget: React.FC<DefaultLinkProps> = (props) => {
	const [selected, setSelected] = React.useState(false);
	const refPaths = useRef<React.RefObject<SVGPathElement>[]>([]);

	const renderPoints = () => {
		return props.renderPoints ?? true;
	};

	useEffect(() => {
		props.link.setRenderedPaths(refPaths.current.map((ref) => ref.current).filter(Boolean) as SVGPathElement[]);
		return () => {
			props.link.setRenderedPaths([]);
		};
	}, [props.link]);

	const generateRef = () => {
		const ref = React.createRef<SVGPathElement>();
		refPaths.current.push(ref);
		return ref;
	};

	const addPointToLink = (event: MouseEvent, index: number) => {
		if (
			!event.shiftKey &&
			!props.link.isLocked() &&
			props.link.getPoints().length - 1 <= props.diagramEngine.getMaxNumberPointsPerLink()
		) {
			const position = props.diagramEngine.getRelativeMousePoint(event);
			const point = props.link.point(position.x, position.y, index);
			event.persist();
			event.stopPropagation();
			props.diagramEngine.getActionEventBus().fireAction({
				event,
				model: point
			});
		}
	};

	const generatePoint = (point: PointModel): JSX.Element => {
		return (
			<DefaultLinkPointWidget
				key={point.getID()}
				point={point as any}
				colorSelected={props.link.getOptions().selectedColor ?? ''}
				color={props.link.getOptions().color}
			/>
		);
	};

	const generateLink = (path: string, extraProps: any, id: string | number): JSX.Element => {
		return (
			<DefaultLinkSegmentWidget
				key={`link-${id}`}
				path={path}
				selected={selected}
				diagramEngine={props.diagramEngine}
				factory={props.diagramEngine.getFactoryForLink(props.link)}
				link={props.link}
				forwardRef={generateRef()}
				onSelection={setSelected}
				extras={extraProps}
			/>
		);
	};

	const generateArrow = (point, previousPoint,points) => {
		
		return (
			<CustomLinkArrowWidget
				key={point.getID()}
				point={point}
				points={points}
				previousPoint={previousPoint}
				colorSelected={props.link.getOptions().selectedColor}
				color={props.link.getOptions().color}
			/>
		);
	}

	const points = props.link.getPoints();
	const paths = [];
	refPaths.current = []; // Reset the refPaths for the current render

	if (points.length === 2) {
		paths.push(
			generateLink(
				props.link.getSVGPath(),
				{
					onMouseDown: (event: MouseEvent) => {
						props.selected?.(event);
						addPointToLink(event, 1);
					}
				},
				'0'
			)
		);

		if (props.link.getTargetPort() == null) {
			paths.push(generatePoint(points[1]));
		}
	} else {
		for (let j = 0; j < points.length - 1; j++) {
			paths.push(
				generateLink(
					LinkWidget.generateLinePath(points[j], points[j + 1]),
					{
						'data-linkid': props.link.getID(),
						'data-point': j,
						onMouseDown: (event: MouseEvent) => {
							props.selected?.(event);
							addPointToLink(event, j + 1);
						}
					},
					j
				)
			);
		}

		 
			for (let i = 1; i < points.length - 1; i++) {
				paths.push(generatePoint(points[i]));
			}

			if (props.link.getTargetPort() !== null) {
				console.log('entrando a arrow');
				paths.push(generateArrow(points[points.length - 1], points[points.length - 2],points));
			} else {
				console.log('entrando a points');
				paths.push(generatePoint(points[points.length - 1]));
			}
		  console.log('paths',paths);
		  
		
	}

	return <g data-default-link-test={props.link.getOptions().testName}>{paths}</g>;
};
