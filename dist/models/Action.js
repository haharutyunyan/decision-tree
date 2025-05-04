/**
 * Action types supported by the decision tree
 */
export var ActionType;
(function (ActionType) {
    ActionType["SEND_SMS"] = "SEND_SMS";
    ActionType["SEND_EMAIL"] = "SEND_EMAIL";
    ActionType["CONDITION"] = "CONDITION";
    ActionType["LOOP"] = "LOOP";
    ActionType["SEQUENCE"] = "SEQUENCE";
})(ActionType || (ActionType = {}));
/**
 * Registry of action factories
 */
const actionFactories = {};
/**
 * Register an action factory for a specific action type
 */
export function registerActionFactory(type, factory) {
    actionFactories[type] = factory;
}
/**
 * Factory function to create an Action from its JSON representation
 * @returns A promise that resolves to the created Action
 */
export async function createActionFromJSON(json) {
    if (!json || typeof json !== 'object' || !json.type) {
        throw new Error('Invalid action JSON: missing type property');
    }
    const factory = actionFactories[json.type];
    if (!factory) {
        throw new Error(`Unknown action type: ${json.type}`);
    }
    // Handle both Promise and non-Promise return values
    const result = factory(json);
    return result instanceof Promise ? result : Promise.resolve(result);
}
