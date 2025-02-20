import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
export default async (modelName: string) => {
    
    // check if file exists
    const file = await fs.readFile('./models/' + modelName + '.js', 'utf-8')

    // run through files on /images and run test
    spawn('node', ['test.js', modelName], 

    // record results
}