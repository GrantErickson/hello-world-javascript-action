const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        console.log(`Starting`);

        // `who-to-greet` input defined in action metadata file
        const nameToGreet = core.getInput('who-to-greet');
        console.log(`Hello ${nameToGreet}!`);
  
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
  
        const myToken = core.getInput('token');
            console.log(`Token: ${myToken}`);
        const octokit = github.getOctokit(myToken);
        console.log("Got Octokit");
        
        const data = await octokit.rest.pulls.get({
            owner: 'GrantErickson',
            repo: 'hello-world-javascript-action',
            pull_number: 1,
            mediaType: {
                format: 'diff'
            }
        });
        console.log("Data:");
        console.log(data);

        core.setOutput("diff", data.data);
    
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();