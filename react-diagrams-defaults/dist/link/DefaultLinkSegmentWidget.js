import * as React from 'react';
import { Menu, MenuItem } from '@mui/material';
const displayTooltip = (e, props) => {
    const { link, propsE } = props;
    e.stopPropagation();
    e.preventDefault();
    try {
        propsE === null || propsE === void 0 ? void 0 : propsE.setLinkToRemove({
            id: link.options.id,
            clientX: e.clientX,
            clientY: e.clientY,
            publicId: link.sourcePort.parent.title +
                '_' +
                link.sourcePort.parent.order +
                '_' +
                link.targetPort.parent.title +
                '_' +
                link.targetPort.parent.order,
        });
    }
    catch (error) {
        console.log('error', error);
    }
};
const displayTooltipCustom = (e, props) => {
    // const { link,propsE } = props;
    e.stopPropagation();
    e.preventDefault();
};
export class DefaultLinkSegmentWidget extends React.Component {
    render() {
        const Bottom = React.cloneElement(this.props.factory.generateLinkSegment(this.props.link, this.props.selected || this.props.link.isSelected(), this.props.path), {
            ref: this.props.forwardRef
        });
        const [contextMenu, setContextMenu] = React.useState(null);
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
        const Top = React.cloneElement(Bottom, Object.assign(Object.assign({ strokeLinecap: 'round', onMouseLeave: () => {
                this.props.onSelection(false);
            }, onMouseEnter: () => {
                this.props.onSelection(true);
            } }, this.props.extras), { ref: null, 'data-linkid': this.props.link.getID(), strokeOpacity: this.props.selected ? 0.1 : 0, strokeWidth: 20, fill: 'none', onDoubleClick: (e) => {
                if (!this.props.link.isLocked()) {
                    this.props.link.remove();
                }
            }, onContextMenu: (e) => {
                if (!this.props.link.isLocked()) {
                    e.preventDefault();
                    // this.props.link.remove();
                    // console.log('this.props', this.props);
                    // displayTooltip(e, this.props);
                    setContextMenu(contextMenu === null
                        ? {
                            mouseX: e.clientX + 2,
                            mouseY: e.clientY - 6,
                        }
                        : // Reabrir en la misma posición
                            null);
                }
            } }));
        return (React.createElement(React.Fragment, null,
            React.createElement("g", null,
                Bottom,
                Top),
            React.createElement(Menu, { open: contextMenu !== null, 
                // onClose={handleClose}
                anchorReference: "anchorPosition", anchorPosition: contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined },
                React.createElement(MenuItem, { onClick: () => {
                        if (!this.props.link.isLocked()) {
                            this.props.link.remove();
                        }
                    } }, "Opci\u00F3n 1"))));
    }
}
//# sourceMappingURL=DefaultLinkSegmentWidget.js.map