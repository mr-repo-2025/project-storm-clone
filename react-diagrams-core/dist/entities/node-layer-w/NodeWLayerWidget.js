import * as React from 'react';
import _map from 'lodash/map';
import { NodeWidget } from '../node/NodeWidget';
export class NodeWLayerWidget extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null, _map(this.props.layer.getNodes(), (node) => {
            return React.createElement(NodeWidget, { key: node.getID(), diagramEngine: this.props.engine, node: node });
        })));
    }
}
//# sourceMappingURL=NodeWLayerWidget.js.map