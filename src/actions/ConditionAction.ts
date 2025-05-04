import { Action, ActionType, createActionFromJSON } from '../models/Action.js';


/**
 * Interface for ConditionAction JSON representation
 */
export interface ConditionActionJSON {
  type: ActionType.CONDITION;
  expression: string;
  trueAction: Record<string, any> | null;
  falseAction: Record<string, any> | null;
}

/**
 * Action that evaluates a JavaScript expression and executes one of two branches
 * based on the result
 */
export class ConditionAction implements Action {
  type = ActionType.CONDITION;

  /**
   * @param expression JavaScript expression to evaluate
   * @param trueAction Action to execute if the expression evaluates to true
   * @param falseAction Action to execute if the expression evaluates to false
   */
  constructor(
    public expression: string,
    public trueAction: Action | null = null,
    public falseAction: Action | null = null
  ) {}

  /**
   * Execute the condition action
   * Evaluates the expression and executes the appropriate branch
   */
  async execute(): Promise<void> {
    try {
      // Using Function constructor to evaluate the expression
      // Note: This has security implications in a production environment
      const result = new Function(`return ${this.expression}`)();

      console.log(`[CONDITION] Evaluated expression "${this.expression}" with result: ${result}`);

      if (result && this.trueAction) {
        await this.trueAction.execute();
      } else if (!result && this.falseAction) {
        await this.falseAction.execute();
      }
    } catch (error) {
      console.error(`[CONDITION] Error evaluating expression "${this.expression}":`, error);
      throw error;
    }
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): ConditionActionJSON {
    return {
      type: ActionType.CONDITION,
      expression: this.expression,
      trueAction: this.trueAction ? this.trueAction.toJSON() : null,
      falseAction: this.falseAction ? this.falseAction.toJSON() : null
    };
  }

  /**
   * Create a ConditionAction from its JSON representation
   * @returns A promise that resolves to the created ConditionAction
   */
  static async fromJSON(json: ConditionActionJSON): Promise<ConditionAction> {
    const trueAction = json.trueAction ? await createActionFromJSON(json.trueAction) : null;
    const falseAction = json.falseAction ? await createActionFromJSON(json.falseAction) : null;

    return new ConditionAction(json.expression, trueAction, falseAction);
  }
}
