const cron = require('node-cron');

module.exports = {
  initiateTask: (time, fun) => {
    return cron.schedule(time, fun, {
      scheduled: false,
    });
  },
  startTask: (task, taskName) => {
    console.log(`${taskName} started`);
    task.start();
    return true;
  },
  stopTask: (task, taskName) => {
    console.log(`${taskName} stopped`);
    task.stop();
    return true;
  },
  destroyTask: (task, taskName) => {
    console.log(`${taskName} destroyed`);
    task.destroy();
    return true;
  },
};
