/**
 * Action types supported by the decision tree
 */
export enum ActionType {
  SEND_SMS = 'SEND_SMS',
  SEND_EMAIL = 'SEND_EMAIL',
  CONDITION = 'CONDITION',
  LOOP = 'LOOP',
  SEQUENCE = 'SEQUENCE',
}

/**
 * Base interface for all actions in the decision tree
 */
export interface Action {
  /**
   * Type of the action
   */
  type: ActionType;

  /**
   * Execute the action
   */
  execute(): Promise<void>;

  /**
   * Convert the action to a JSON-serializable object
   */
  toJSON(): Record<string, any>;
}

/**
 * Type for action factory functions
 * This type allows for both synchronous and asynchronous factory functions
 */
export type ActionFactory = (json: Record<string, any>) => Promise<Action> | Action;

/**
 * Registry of action factories
 */
const actionFactories: Record<ActionType, ActionFactory> = {} as Record<ActionType, ActionFactory>;

/**
 * Register an action factory for a specific action type
 */
export function registerActionFactory(type: ActionType, factory: ActionFactory): void {
  actionFactories[type] = factory;
}

/**
 * Factory function to create an Action from its JSON representation
 * @returns A promise that resolves to the created Action
 */
export async function createActionFromJSON(json: Record<string, any>): Promise<Action> {
  if (!json || typeof json !== 'object' || !json.type) {
    throw new Error('Invalid action JSON: missing type property');
  }

  const factory = actionFactories[json.type as ActionType];
  if (!factory) {
    throw new Error(`Unknown action type: ${json.type}`);
  }

  // Handle both Promise and non-Promise return values
  const result = factory(json);
  return result instanceof Promise ? result : Promise.resolve(result);
}
