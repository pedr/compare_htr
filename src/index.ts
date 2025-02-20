import { Command } from 'commander';
import { exec } from 'child_process';

const program = new Command();

program
  .command('test <model_name>')
  .description('Run the HTR test for the specified model')
  .action((modelName) => {
    console.log(`Running test for model: ${modelName}`);
    
    exec(`echo "Running ${modelName} model..."`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Output: ${stdout}`);
    });
  });

program
  .command('compare')
  .description('Compare the performance of different HTR models')
  .action(() => {
    console.log('Comparing models...');
    
    exec('echo "Generating comparison report..."', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Output: ${stdout}`);
    });
  });

program.parse(process.argv);
