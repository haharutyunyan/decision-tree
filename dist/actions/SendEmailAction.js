import { ActionType } from '../models/Action.js';
/**
 * Action to send an email from a sender to a receiver
 */
export class SendEmailAction {
    senderEmail;
    receiverEmail;
    type = ActionType.SEND_EMAIL;
    /**
     * @param senderEmail The email address of the sender
     * @param receiverEmail The email address of the receiver
     */
    constructor(senderEmail, receiverEmail) {
        this.senderEmail = senderEmail;
        this.receiverEmail = receiverEmail;
    }
    /**
     * Execute the email sending action
     * Note: This is a mock implementation that just logs the action
     */
    async execute() {
        console.log(`[EMAIL] Sending email from ${this.senderEmail} to ${this.receiverEmail}`);
    }
    /**
     * Convert to JSON representation
     */
    toJSON() {
        return {
            type: ActionType.SEND_EMAIL,
            senderEmail: this.senderEmail,
            receiverEmail: this.receiverEmail
        };
    }
    /**
     * Create a SendEmailAction from its JSON representation
     */
    static fromJSON(json) {
        return new SendEmailAction(json.senderEmail, json.receiverEmail);
    }
}
