# Objective
Your task is to build a simple chat application in which people can send and receive messages. This includes implementing authentication, defining permission sets, and designing the user interface.

# Assessment
- Set up a new VueJS project with the following criteria:
  - Version:
    - Preferably Vue 3.
    - Alternatively, you can use Vue 2 with the Composition API.
  - Implement a landing page with a login feature.
  - Define multiple roles, each with specific permissions:
    - Role 1:
      - Can receive and send messages.
    - Role 2:
      - Can receive messages.
  - Create a protected "chats" page.
  - Integrate a state management tool (e.g., Pinia / Vuex).

- Design:
  - Include a left sidebar allowing users to select a specific chat.
  - Once a chat is opened, users should be able to read messages and, if applicable, send messages.
  - Messages sent by the current user should be aligned to the right.
  - Messages sent by other users should be aligned to the left.
  - Display image attachments as images.
  - Provide a download link for file attachments.

# Evaluation Criteria
- Parse different kinds of messages.
- Implement the ability to send TextMessages (you can use mock js or build a simple backend).
- Incorporate at least one design pattern.
- Display dates and times in local time, but store them in UTC.

# Bonus points
- Support sending attachment message types.
- Utilize websockets/socket.io for real-time message communication between clients.
- Containerize the project.

# Types
```
type BaseMessage = {
    messageId: string;
    from: string;
    type: string;
    status: "pending" | "sent";
    time: string;
    conversationId: string;
}

type AttachmentMessage = BaseMessage & {
    url: string;
    type: "attachment-image" | "attachment-file";
    name: string;
}

type TextMessage = BaseMessage & {
    type: "text";
    message: string;
}

type Message = AttachmentMessage | TextMessage;
```