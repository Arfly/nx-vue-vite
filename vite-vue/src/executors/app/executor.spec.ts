import { AppExecutorSchema } from './schema';
import executor from './executor';

const options: AppExecutorSchema = {};

describe('App Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
