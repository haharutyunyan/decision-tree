import { Action, ActionType } from '../models/Action.js';

/**
 * Interface for SendEmailAction JSON representation
 */
export interface SendEmailActionJSON {
  type: ActionType.SEND_EMAIL;
  senderEmail: string;
  receiverEmail: string;
}

/**
 * Action to send an email from a sender to a receiver
 */
export class SendEmailAction implements Action {
  type = ActionType.SEND_EMAIL;

  /**
   * @param senderEmail The email address of the sender
   * @param receiverEmail The email address of the receiver
   */
  constructor(
    public senderEmail: string,
    public receiverEmail: string
  ) {}

  /**
   * Execute the email sending action
   * Note: This is a mock implementation that just logs the action
   */
  async execute(): Promise<void> {
    console.log(`[EMAIL] Sending email from ${this.senderEmail} to ${this.receiverEmail}`);
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): SendEmailActionJSON {
    return {
      type: ActionType.SEND_EMAIL,
      senderEmail: this.senderEmail,
      receiverEmail: this.receiverEmail
    };
  }

  /**
   * Create a SendEmailAction from its JSON representation
   */
  static fromJSON(json: SendEmailActionJSON): SendEmailAction {
    return new SendEmailAction(json.senderEmail, json.receiverEmail);
  }
}
