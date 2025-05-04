import { ActionType } from '../models/Action.js';
/**
 * Action to send an SMS to a specified phone number
 */
export class SendSmsAction {
    phoneNumber;
    type = ActionType.SEND_SMS;
    /**
     * @param phoneNumber The phone number to send the SMS to
     */
    constructor(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    /**
     * Execute the SMS sending action
     * Note: This is a mock implementation that just logs the action
     */
    async execute() {
        console.log(`[SMS] Sending SMS to ${this.phoneNumber}`);
    }
    /**
     * Convert to JSON representation
     */
    toJSON() {
        return {
            type: ActionType.SEND_SMS,
            phoneNumber: this.phoneNumber
        };
    }
    /**
     * Create a SendSmsAction from its JSON representation
     */
    static fromJSON(json) {
        return new SendSmsAction(json.phoneNumber);
    }
}
