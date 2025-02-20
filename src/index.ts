import { Command } from 'commander';
import { exec } from 'child_process';
import testCommand from './testCommand';

const program = new Command();

program
  .command('test <model_name>')
  .description('Run the HTR test for the specified model')
  .action(async (modelName) => {
    console.log(`Running test for model: ${modelName}`);
    
    try {
      const result = await testCommand(modelName);
      console.log(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
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
