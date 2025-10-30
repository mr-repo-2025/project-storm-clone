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
		background: #ffffff85;
		border-radius: 5px;
		color: #626262;
		font-size: 12px;
		padding: 4px 8px;
		font-family: sans-serif;
		user-select: none;
	
	`;
	// 	 transform : translate(${(p:Props)  =>  p.x}px, ${(p:Props)  =>  p.y}px) 
}

export class DefaultLabelWidget extends React.Component<DefaultLabelWidgetProps> {
	calculate = (point1, point2) => {
    const dx = point2.position.x - point1.position.x;
    const dy = point2.position.y - point1.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const midX = (point1.position.x + point2.position.x) / 2;
    const midY = (point1.position.y + point2.position.y) / 2;
    
    // Calcular el ángulo de la línea
    const angle = Math.atan2(dy, dx);
    
    return { x: midX, y: midY, angle: angle, distance: dist };
};

calpos = () => {
    var distancer = { x: 0, y: 0, angle: 0, distance: 0 };
    
    for (let j = 0; j < this.props.model.getParent().getPoints().length - 1; j++) {
        distancer = this.calculate(
            this.props.model.getParent().getPoints()[j], 
            this.props.model.getParent().getPoints()[j + 1]
        );
    }
    
    // Offset perpendicular a la línea (distancia desde la línea)
    const offset = 40;
    
    // Calcular ángulo perpendicular (90 grados = PI/2 radianes)
    const perpAngle = distancer.angle + Math.PI / 2;
    
    // Posición del label perpendicular a la línea
    const labelX = distancer.x + Math.cos(perpAngle) * offset;
    const labelY = distancer.y + Math.sin(perpAngle) * offset;
    
    const labelCoordinates = {
        x: labelX + this.props.model.getOptions().offsetX,
        y: labelY + this.props.model.getOptions().offsetY
    };
 
    return { x: labelCoordinates.x, y: labelCoordinates.y }; 
}

render() {
    const pos = this.calpos();
    return (
        <S.Label 
            style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)'
            }}
        >
            {this.props.model.getOptions().label}
        </S.Label>
    );
}
}
