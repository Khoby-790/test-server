import client, { Channel, Connection, ConsumeMessage } from 'amqplib';
import { AMQP_URL } from '../constants';

const createConnection = async (): Promise<Connection | null> => {
  try {
    const connection: Connection = await client.connect(AMQP_URL);
    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const sendMessage = async (queue: string, message: string) => {
  const connection = await createConnection();
  const channel = await connection?.createChannel();
  await channel?.assertQueue(queue);
  channel?.sendToQueue(queue, Buffer.from(message));
  console.log(' [x] Sent %s', message);
};

export const startListener = async (
  queue: string,
  callback: (msg: ConsumeMessage | null, channel: Channel) => void,
  prefetchCount = 1,
  onConnect?: () => void
) => {
  const connection = await createConnection();
  const channel = await connection?.createChannel();
  await channel?.assertQueue(queue);
  await channel?.prefetch(prefetchCount);
  await channel?.consume(queue, data => callback(data, channel));
  onConnect && onConnect();
};
