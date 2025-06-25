import { Action } from '../core-actions/Action';
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
export declare class DeleteItemsAction extends Action {
    constructor(options?: DeleteItemsActionOptions);
}
