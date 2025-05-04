import { ActionType, registerActionFactory, ActionFactory } from './Action.js';
import { SendSmsAction } from '../actions/SendSmsAction.js';
import { SendEmailAction } from '../actions/SendEmailAction.js';
import { ConditionAction } from '../actions/ConditionAction.js';
import { LoopAction } from '../actions/LoopAction.js';
import { SequenceAction } from '../actions/SequenceAction.js';

registerActionFactory(ActionType.SEND_SMS, ((json: any) => SendSmsAction.fromJSON(json)) as ActionFactory);
registerActionFactory(ActionType.SEND_EMAIL, ((json: any) => SendEmailAction.fromJSON(json)) as ActionFactory);
registerActionFactory(ActionType.CONDITION, ((json: any) => ConditionAction.fromJSON(json)) as ActionFactory);
registerActionFactory(ActionType.LOOP, ((json: any) => LoopAction.fromJSON(json)) as ActionFactory);
registerActionFactory(ActionType.SEQUENCE, ((json: any) => SequenceAction.fromJSON(json)) as ActionFactory);
