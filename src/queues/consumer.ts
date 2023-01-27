import { Channel, ConsumeMessage } from 'amqplib';
import _ from 'lodash';

export const consumer = async (msg: ConsumeMessage | null, channel: Channel): Promise<void> => {
  if (msg) {
    // Display the received message
    try {
      console.log('Received', msg.content.toString());
      const data = JSON.parse(msg.content.toString());
      console.log('Received', data);
      channel.ack(msg);
    } catch (error) {
      console.log(error);
    }
  }
};
