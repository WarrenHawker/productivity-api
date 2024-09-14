import { Queue, Worker } from 'bullmq';
import { IOredisClient } from '../../lib/redis/client.redis';

const redisConnect = {
  connection: IOredisClient,
};

const syncRedis = async () => {
  const hour6 = 6 * 60 * 60 * 1000;
  const syncRedis = new Queue('syncRedis', redisConnect);
  await syncRedis.add(
    'tasks',
    {},
    { repeat: { every: hour6 }, removeOnComplete: true }
  );

  new Worker(
    'syncRedis',
    async (job) => {
      if (job.name == 'tasks') {
      }
    },
    redisConnect
  );
};

export default syncRedis;
