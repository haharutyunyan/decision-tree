import { ActionType, createActionFromJSON } from '../models/Action.js';
/**
 * Action that executes a sequence of actions in order
 */
export class SequenceAction {
    actions;
    type = ActionType.SEQUENCE;
    /**
     * @param actions Array of actions to execute in sequence
     */
    constructor(actions) {
        this.actions = actions;
    }
    /**
     * Execute all actions in sequence
     */
    async execute() {
        console.log(`[SEQUENCE] Starting sequence of ${this.actions.length} actions`);
        for (let i = 0; i < this.actions.length; i++) {
            console.log(`[SEQUENCE] Executing action ${i + 1}/${this.actions.length}`);
            await this.actions[i].execute();
        }
        console.log(`[SEQUENCE] Sequence completed`);
    }
    /**
     * Convert to JSON representation
     */
    toJSON() {
        return {
            type: ActionType.SEQUENCE,
            actions: this.actions.map(action => action.toJSON())
        };
    }
    /**
     * Create a SequenceAction from its JSON representation
     * @returns A promise that resolves to the created SequenceAction
     */
    static async fromJSON(json) {
        // Use Promise.all to wait for all async createActionFromJSON calls to complete
        const actions = await Promise.all(json.actions.map(actionJson => createActionFromJSON(actionJson)));
        return new SequenceAction(actions);
    }
}
