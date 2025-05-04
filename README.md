# Decision Tree Processing Backend

A TypeScript implementation of a decision tree processing backend that enables defining and executing business logic.

## Features

- **Serialization Support**: Decision trees can be serialized to JSON and deserialized from JSON
- **Supported Actions**:
  - **Send SMS**: Accepts a phone number as a parameter
  - **Send Email**: Accepts sender and receiver email addresses
  - **Condition**: Evaluates a JavaScript expression and executes one of two branches
  - **Loop**: Executes a subtree a specified number of times
  - **Sequence**: Executes a series of actions in order
- **Extensibility**: Designed to allow easy addition of new action types
- **Backend Service**: Receives, deserializes, and executes decision trees

## Architecture

The project follows a modular architecture with the following components:

- **Action Interface**: Base interface for all action types
- **Action Implementations**: Concrete implementations of different action types
- **Decision Tree**: Manages a tree of actions and provides execution capabilities
- **Decision Tree Service**: Backend service that processes decision trees

## Usage

### Basic Example

```typescript
import { DecisionTreeService, ActionType } from 'decision-tree';

// Create a decision tree JSON
const decisionTreeJson = {
  type: ActionType.CONDITION,
  expression: 'new Date().getDay() === 0', // Check if it's Sunday
  trueAction: {
    type: ActionType.SEND_SMS,
    phoneNumber: '+1234567890'
  },
  falseAction: null
};

// Process the decision tree
const service = new DecisionTreeService();
service.processDecisionTree(decisionTreeJson);
```

### Complex Example

```typescript
import { DecisionTreeService, ActionType } from 'decision-tree';

// Create a more complex decision tree with a sequence and loop
const complexTreeJson = {
  type: ActionType.SEQUENCE,
  actions: [
    {
      type: ActionType.SEND_EMAIL,
      senderEmail: 'sender@example.com',
      receiverEmail: 'receiver@example.com'
    },
    {
      type: ActionType.LOOP,
      iterations: 3,
      action: {
        type: ActionType.CONDITION,
        expression: 'Math.random() > 0.5',
        trueAction: {
          type: ActionType.SEND_SMS,
          phoneNumber: '+1234567890'
        },
        falseAction: null
      }
    }
  ]
};

// Process the decision tree
const service = new DecisionTreeService();
service.processDecisionTree(complexTreeJson);
```

## Extending with New Action Types

To add a new action type:

1. Add the new type to the `ActionType` enum
2. Create a new class that implements the `Action` interface
3. Implement the required methods: `execute()` and `toJSON()`
4. Add a static `fromJSON()` method for deserialization
5. Update the `createActionFromJSON` function to handle the new type

## Building and Running

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run the examples
npm run start

# Build and run in one step
npm test
```
