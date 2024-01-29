import { MessageAggregator } from "../aggregators/message-aggregator"
import type { MessagePackage } from "../types/message-package"

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function fakeReply(): MessagePackage {
  const messageAggregator = new MessageAggregator(null)
  messageAggregator.setSide('left')
  messageAggregator.createdNow()
  const answers = ['ohh', 'I understand', 'oh my god!']
  messageAggregator.setTextMessage(answers[getRandomInt(answers.length)])
  messageAggregator.sent()
  return messageAggregator.getMessage()
}
