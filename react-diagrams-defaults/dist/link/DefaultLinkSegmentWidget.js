import * as React from 'react';
const displayTooltip = (e, props, propsdef) => {
    e.stopPropagation();
    e.preventDefault();
    try {
        props === null || props === void 0 ? void 0 : props.setLinkToRemove({
            id: propsdef.link.getID(),
            clientX: e.clientX,
            clientY: e.clientY,
            publicId: propsdef.link.sourcePort.parent.title +
                '_' +
                propsdef.link.sourcePort.parent.order +
                '_' +
                propsdef.link.targetPort.parent.title +
                '_' +
                propsdef.link.targetPort.parent.order,
        });
    }
    catch (error) {
        console.log('error', error);
    }
};
export class DefaultLinkSegmentWidget extends React.Component {
    render() {
        const Bottom = React.cloneElement(this.props.factory.generateLinkSegment(this.props.link, this.props.selected || this.props.link.isSelected(), this.props.path), {
            ref: this.props.forwardRef
        });
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
                    displayTooltip(e, this.props.propsE, this.props);
                }
            } }));
        return (React.createElement("g", null,
            Bottom,
            Top));
    }
}
//# sourceMappingURL=DefaultLinkSegmentWidget.js.map