import { DecisionTree } from './DecisionTree.js';

/**
 * Service for processing decision trees
 */
export class DecisionTreeService {
  /**
   * Process a decision tree from its JSON representation
   * 
   * @param json JSON representation of a decision tree
   * @returns A promise that resolves when the decision tree execution is complete
   */
  async processDecisionTree(json: Record<string, any>): Promise<void> {
    try {
      console.log('[SERVICE] Received decision tree JSON:', JSON.stringify(json, null, 2));

      // Deserialize the JSON into a decision tree
      const decisionTree = await DecisionTree.fromJSON(json);

      console.log('[SERVICE] Decision tree deserialized successfully');

      // Execute the decision tree
      await decisionTree.execute();

      console.log('[SERVICE] Decision tree execution completed');
    } catch (error) {
      console.error('[SERVICE] Error processing decision tree:', error);
      throw error;
    }
  }
}
