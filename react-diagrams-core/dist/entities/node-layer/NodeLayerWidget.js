import * as React from 'react';
import _map from 'lodash/map';
import { NodeWidget } from '../node/NodeWidget';
export class NodeLayerWidget extends React.Component {
    render() {
        let node1;
        return (React.createElement("div", { className: 'worktable_ms' }, _map(this.props.layer.getNodes(), (node) => {
            return React.createElement(NodeWidget, { key: node.getID(), diagramEngine: this.props.engine, node: node });
        })));
    }
}
//# sourceMappingURL=NodeLayerWidget.js.map