require('dotenv').config();
import { Command } from 'commander';
import { exec } from 'child_process';
import testCommand from './testCommand';
import compareCommand from './compareCommand';

const program = new Command();

program
  .command('test <model_name>')
  .option('-a, --append-results', 'Append result to last existing file for the model')
  .description('Run the HTR test for the specified model')
  .action(async (modelName, options) => {
    console.log(`Running test for model: ${modelName}`);
    console.log(`Append results: ${!!options.appendResults}`);
    
    try {
      const result = await testCommand(modelName, !!options.appendResults);
      console.log(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

program
  .command('compare <result_path>')
  .description('Compare the performance of different HTR models')
  .action(async (resultPath: string) => {
    
    try {
      const result = await compareCommand(resultPath);
      console.log(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

program.parse(process.argv);
