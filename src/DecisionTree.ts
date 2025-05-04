import { Action, createActionFromJSON } from './models/Action.js';

/**
 * Decision Tree class that manages a tree of actions
 */
export class DecisionTree {
  /**
   * @param rootAction The root action of the decision tree
   */
  constructor(private rootAction: Action) {}

  /**
   * Execute the decision tree starting from the root action
   */
  async execute(): Promise<void> {
    console.log('[DECISION TREE] Starting execution');

    try {
      await this.rootAction.execute();
      console.log('[DECISION TREE] Execution completed successfully');
    } catch (error) {
      console.error('[DECISION TREE] Execution failed:', error);
      throw error;
    }
  }

  /**
   * Convert the decision tree to a JSON-serializable object
   */
  toJSON(): Record<string, any> {
    return this.rootAction.toJSON();
  }

  /**
   * Create a DecisionTree from its JSON representation
   * @returns A promise that resolves to the created DecisionTree
   */
  static async fromJSON(json: Record<string, any>): Promise<DecisionTree> {
    const rootAction = await createActionFromJSON(json);
    return new DecisionTree(rootAction);
  }
}
