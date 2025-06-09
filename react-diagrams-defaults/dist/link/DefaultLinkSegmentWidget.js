import * as React from 'react';
const displayTooltip = (e, props) => {
    const { link, propsE } = props;
    e.stopPropagation();
    e.preventDefault();
    propsE.setLinkToRemove({
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
            } }, this.props.extras), { ref: null, 'data-linkid': this.props.link.getID(), strokeOpacity: this.props.selected ? 0.1 : 0, strokeWidth: 1, fill: 'none', onDoubleClick: (e) => {
                if (!this.props.link.isLocked()) {
                    this.props.link.remove();
                }
            }, onContextMenu: (e) => {
                if (!this.props.link.isLocked()) {
                    e.preventDefault();
                    // this.props.link.remove();
                    displayTooltip(e, this.props);
                }
            } }));
        return (React.createElement("g", null,
            Bottom,
            Top));
    }
}
//# sourceMappingURL=DefaultLinkSegmentWidget.js.map