import { State } from "../core-state/State";
import { Action, InputType } from "../core-actions/Action";
import { SelectionBoxState } from "./SelectionBoxState";
export class SelectingState extends State {
    constructor() {
        super({
            name: "selecting",
        });
        // this.keys = ["shift"];
        this.keys = ["ctrlKey"];
        this.registerAction(new Action({
            type: InputType.MOUSE_DOWN,
            fire: (event) => {
                const element = this.engine
                    .getActionEventBus()
                    .getModelForEvent(event);
                console.log("event.event", event.event);
                console.log("event.event2", this.keys);
                // go into a selection box on the canvas state
                if (!element) {
                    this.transitionWithEvent(new SelectionBoxState(), event);
                }
                else {
                    element.setSelected(true);
                    this.engine.repaintCanvas();
                }
            },
        }));
    }
}
//# sourceMappingURL=SelectingState.js.map