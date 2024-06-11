const { spawn } = require('child_process');
const { existsSync, mkdirSync } = require('fs');
const { repos } = require('./repos');

if (!existsSync('repos')) mkdirSync('repos');

repos.reduce((currentPromise, repo) => {
  return currentPromise.then(() => {
    return new Promise((resolve) => {
      const cleanRepoPath = repo.replace('https://github.com/', '');
      const repoList = cleanRepoPath.split('/');
      if (repoList.length !== 2) return;
      const localRepoPath = `repos/${cleanRepoPath}`;
      console.log(' ');
      console.log(cleanRepoPath);
      const alreadyExists = existsSync(localRepoPath);
      if (alreadyExists) {
        console.log('remobinf submodule');
        const gitRm = spawn('git', ['rm', localRepoPath]);
        gitRm.stdout.on('data', (data) => console.log(data.toString()));
        // resolve promise on end
        gitRm.stdout.on('end', () => {
          resolve();
        });
      } else {
        console.log('already removed');
        resolve();
      }
    });
  });
}, Promise.resolve());
