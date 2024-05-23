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
        console.log('already rexists');
        const gitPull = spawn('git', ['pull'], { cwd: localRepoPath });
        gitPull.stdout.on('data', (data) => console.log(data.toString()));
        // resolve promise on end
        gitPull.stdout.on('end', () => {
          resolve();
        });
      } else {
        console.log('cloning repo...');
        // use -f due to repos and under ignored folder
        const gitCommand = spawn('git', [
          'submodule',
          'add',
          '-f',
          repo,
          localRepoPath,
        ]);
        gitCommand.stdout.on('data', (data) => console.log(data.toString()));
        // resolve promise on end
        gitCommand.stdout.on('end', () => {
          resolve();
        });
      }
    });
  });
}, Promise.resolve());
