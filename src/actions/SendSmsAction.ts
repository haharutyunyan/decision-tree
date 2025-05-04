import { Action, ActionType } from '../models/Action.js';

/**
 * Interface for SendSmsAction JSON representation
 */
export interface SendSmsActionJSON {
  type: ActionType.SEND_SMS;
  phoneNumber: string;
}

/**
 * Action to send an SMS to a specified phone number
 */
export class SendSmsAction implements Action {
  type = ActionType.SEND_SMS;

  /**
   * @param phoneNumber The phone number to send the SMS to
   */
  constructor(public phoneNumber: string) {}

  /**
   * Execute the SMS sending action
   * Note: This is a mock implementation that just logs the action
   */
  async execute(): Promise<void> {
    console.log(`[SMS] Sending SMS to ${this.phoneNumber}`);
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): SendSmsActionJSON {
    return {
      type: ActionType.SEND_SMS,
      phoneNumber: this.phoneNumber
    };
  }

  /**
   * Create a SendSmsAction from its JSON representation
   */
  static fromJSON(json: SendSmsActionJSON): SendSmsAction {
    return new SendSmsAction(json.phoneNumber);
  }
}
