import * as React from 'react';
import { DefaultLabelModel } from './DefaultLabelModel';
import styled from '@emotion/styled';

export interface DefaultLabelWidgetProps {
	model: DefaultLabelModel;
}
export interface Props {
	x: number;
	y: number;
  }
namespace S {
	export const Label = styled.div`
		background: rgba(0, 0, 0, 0.8);
		border-radius: 5px;
		color: white;
		font-size: 12px;
		padding: 4px 8px;
		font-family: sans-serif;
		user-select: none;
	
	`;
	// 	 transform : translate(${(p:Props)  =>  p.x}px, ${(p:Props)  =>  p.y}px) 
}

export class DefaultLabelWidget extends React.Component<DefaultLabelWidgetProps> {
	calculate = (point1 , point2) => {
		const dx = point2.position.x - point1.position.x;
		const dy = point2.position.y - point1.position.y;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const midX = (point1.position.x + point2.position.x) / 2;
		const midY = (point1.position.y + point2.position.y) / 2;
	  
		// setDistance(dist);
	   return { x: midX, y: midY };
	  };
	
	  calpos = () => {
		var distancer  ={x:0 , y : 0 };
		for (let j = 0; j < this.props.model.getParent().getPoints().length - 1; j++) {
				distancer = this.calculate(this.props.model.getParent().getPoints()[j], this.props.model.getParent().getPoints()[j + 1]) ;
			}
		
		const labelCoordinates = {
				x: distancer.x + 30 - 10 / 2 + this.props.model.getOptions().offsetX,
				y: distancer.y + 10 - 10 / 2 + this.props.model.getOptions().offsetY
			};
	 
		return {x: labelCoordinates.x , y :labelCoordinates.y}; 
	  }
	//   x={this.calpos().x} y={this.calpos().y} 
	render() {
		return <S.Label    >{this.props.model.getOptions().label}</S.Label>;
	}
}
