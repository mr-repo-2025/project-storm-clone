import { Action, ActionEvent, InputType } from '../core-actions/Action';
import { KeyboardEvent } from 'react';
import _forEach from 'lodash/forEach';
import _isEqual from 'lodash/isEqual';

export interface DeleteItemsActionOptions {
    keys?: string[];
    modifiers?: {
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
        metaKey?: boolean;
    };
}

/**
 * Deletes all selected items
 */




export class DeleteItemsAction extends Action {
    constructor(options: DeleteItemsActionOptions = {}) {
        const keyCodes = options.keys || ['Delete', 'Backspace'];
        const modifiers = {
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            metaKey: false,
            ...options.modifiers
        };

        super({
            type: InputType.KEY_DOWN,
            fire: (event: ActionEvent<KeyboardEvent>) => {
                const { key, ctrlKey, shiftKey, altKey, metaKey } = event.event;

                if (keyCodes.indexOf(key) && _isEqual({ ctrlKey, shiftKey, altKey, metaKey }, modifiers)) {
                    _forEach(this.engine.getModel().getSelectedEntities(), (model) => {
                        // only delete items which are not locked
                        if (!model.isLocked()) {
                            model.remove();
                        }
                    });
                    this.engine.repaintCanvas();
                }
            }
        });
    }
}