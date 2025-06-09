import * as React from 'react';
import { DefaultLinkModel } from './DefaultLinkModel';
import { DefaultLinkWidget } from './DefaultLinkWidget';
import styled from '@emotion/styled';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { css, keyframes } from '@emotion/react';
var S;
(function (S) {
    S.Keyframes = keyframes `
		from {
			stroke-dashoffset: 24;
		}
		to {
			stroke-dashoffset: 0;
		}
	`;
    const selected = css `
		 stroke: #c9c9c9;
	`;
    //se elimina animacion 
    // animation: ${Keyframes} 1s linear infinite;
    // stroke-dasharray: 10, 2;
    S.Path = styled.path `
		${(p) => p.selected};
		fill: none;
		pointer-events: auto;
	`;
})(S || (S = {}));
export class DefaultLinkFactory extends AbstractReactFactory {
    constructor(type = 'default', propst = {}) {
        super(type);
        this.propst = propst;
    }
    generateReactWidget(event) {
        return React.createElement(DefaultLinkWidget, { link: event.model, diagramEngine: this.engine, propst: this.propst });
    }
    generateModel(event) {
        return new DefaultLinkModel({}, this.propst);
    }
    generateLinkSegment(model, selected, path) {
        return (React.createElement(S.Path, { selected: selected, stroke: selected ? model.getOptions().selectedColor : model.getOptions().color, strokeWidth: model.getOptions().width, d: path }));
    }
}
//# sourceMappingURL=DefaultLinkFactory.js.map