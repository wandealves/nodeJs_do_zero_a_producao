import { SetupServer } from './server';
import config from 'config';
import logger from './logger';

enum ExitStatus{
  Failure = 1,
  Sucess = 0,
}

process.on('unhandledRejection', (reason, promise)=>{
  logger.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);
  throw reason;
});

process.on('uncaughtException', (error)=>{
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

(async (): Promise<void> => {
  try{
  const server = new SetupServer(config.get('App'));
  await server.init();
  server.start();

  const exitSignals : NodeJS.Signals[] = ['SIGINT','SIGTERM','SIGQUIT'];
  exitSignals.map((sig) => process.on(sig, async() => {
    try{
      await server.close();
      logger.info(`App exited with sucess`);
      process.exit(ExitStatus.Sucess);
    }catch(error){
      logger.error(`App exited with error: ${error}`);
      process.exit(ExitStatus.Failure);
    }
  }));

  }catch(error){
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();
