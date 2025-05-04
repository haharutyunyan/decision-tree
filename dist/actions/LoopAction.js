import { ActionType, createActionFromJSON } from '../models/Action.js';
/**
 * Action that executes a subtree a specified number of times
 */
export class LoopAction {
    iterations;
    action;
    type = ActionType.LOOP;
    /**
     * @param iterations Number of times to execute the action
     * @param action Action to execute in each iteration
     */
    constructor(iterations, action = null) {
        this.iterations = iterations;
        this.action = action;
    }
    /**
     * Execute the loop action
     * Runs the subtree the specified number of times
     */
    async execute() {
        if (!this.action) {
            console.log(`[LOOP] No action to execute for ${this.iterations} iterations`);
            return;
        }
        console.log(`[LOOP] Starting loop for ${this.iterations} iterations`);
        for (let i = 0; i < this.iterations; i++) {
            console.log(`[LOOP] Iteration ${i + 1}/${this.iterations}`);
            await this.action.execute();
        }
        console.log(`[LOOP] Completed ${this.iterations} iterations`);
    }
    /**
     * Convert to JSON representation
     */
    toJSON() {
        return {
            type: ActionType.LOOP,
            iterations: this.iterations,
            action: this.action ? this.action.toJSON() : null
        };
    }
    /**
     * Create a LoopAction from its JSON representation
     * @returns A promise that resolves to the created LoopAction
     */
    static async fromJSON(json) {
        const action = json.action ? await createActionFromJSON(json.action) : null;
        return new LoopAction(json.iterations, action);
    }
}
