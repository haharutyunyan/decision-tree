// Import the registry first to ensure all action factories are registered
import './models/ActionRegistry.js';

export { ActionType, Action, createActionFromJSON, registerActionFactory } from './models/Action.js';
export { SendSmsAction } from './actions/SendSmsAction.js';
export { SendEmailAction } from './actions/SendEmailAction.js';
export { ConditionAction } from './actions/ConditionAction.js';
export { LoopAction } from './actions/LoopAction.js';
export { SequenceAction } from './actions/SequenceAction.js';
export { DecisionTree } from './DecisionTree.js';
export { DecisionTreeService } from './DecisionTreeService.js';

// Example usage
import { DecisionTreeService } from './DecisionTreeService.js';
import { ActionType } from './models/Action.js';

// Example 1: Christmas greeting
const christmasExample = {
  type: ActionType.CONDITION,
  expression: 'new Date().getFullYear() === 2025 && new Date().getMonth() === 0 && new Date().getDate() === 1',
  trueAction: {
    type: ActionType.SEND_SMS,
    phoneNumber: '+1234567890'
  },
  falseAction: null
};

// Example 2: Send email and SMS sequence
const emailAndSmsExample = {
  type: ActionType.SEQUENCE,
  actions: [
    {
      type: ActionType.SEND_EMAIL,
      senderEmail: 'sender@example.com',
      receiverEmail: 'receiver@example.com'
    },
    {
      type: ActionType.SEND_SMS,
      phoneNumber: '+1234567890'
    },
    {
      type: ActionType.SEND_EMAIL,
      senderEmail: 'sender@example.com',
      receiverEmail: 'receiver2@example.com'
    }
  ]
};

// Example 3: Loop with condition
const loopExample = {
  type: ActionType.LOOP,
  iterations: 10,
  action: {
    type: ActionType.CONDITION,
    expression: 'Math.random() > 0.5',
    trueAction: {
      type: ActionType.SEND_SMS,
      phoneNumber: '+1234567890'
    },
    falseAction: null
  }
};

// Function to demonstrate the decision tree service
async function demonstrateDecisionTree() {
  const service = new DecisionTreeService();

  console.log('\n--- Example 1: Christmas Greeting ---');
  await service.processDecisionTree(christmasExample);

  console.log('\n--- Example 2: Email and SMS Chain ---');
  await service.processDecisionTree(emailAndSmsExample);

  console.log('\n--- Example 3: Loop with Condition ---');
  await service.processDecisionTree(loopExample);
}

// Run the demonstration if this file is executed directly
// In ES modules, we use import.meta.url to check if the file is being run directly
const isMainModule = import.meta.url.endsWith(process.argv[1]);
if (isMainModule) {
  demonstrateDecisionTree().catch(error => {
    console.error('Demonstration failed:', error);
  });
}
