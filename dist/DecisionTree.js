import { createActionFromJSON } from './models/Action.js';
/**
 * Decision Tree class that manages a tree of actions
 */
export class DecisionTree {
    rootAction;
    /**
     * @param rootAction The root action of the decision tree
     */
    constructor(rootAction) {
        this.rootAction = rootAction;
    }
    /**
     * Execute the decision tree starting from the root action
     */
    async execute() {
        console.log('[DECISION TREE] Starting execution');
        try {
            await this.rootAction.execute();
            console.log('[DECISION TREE] Execution completed successfully');
        }
        catch (error) {
            console.error('[DECISION TREE] Execution failed:', error);
            throw error;
        }
    }
    /**
     * Convert the decision tree to a JSON-serializable object
     */
    toJSON() {
        return this.rootAction.toJSON();
    }
    /**
     * Create a DecisionTree from its JSON representation
     * @returns A promise that resolves to the created DecisionTree
     */
    static async fromJSON(json) {
        const rootAction = await createActionFromJSON(json);
        return new DecisionTree(rootAction);
    }
}
