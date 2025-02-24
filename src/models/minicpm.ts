import child_process from 'node:child_process';
import { promisify } from 'node:util';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const exec = promisify(child_process.exec)
export default class MiniCPM {

    constructor () {
        console.log("loaded MiniCPM model")
    }

    public async init() {
        return wait(1000);
        // check if dependecies exists, etc
        // log parameters, etc?
    }

    public async run (imagePath: string) {
        const base = '/home/js/Desktop/joplin/r/llms_for_htr/llama.cpp';
        const pathToLlamaCli = `${base}/build/bin/llama-minicpmv-cli`;
        const pathToModel = `${base}/../MiniCPM-o-2_6/model/MiniCPM-o-7.6B-2_6-F16.gguf`;
        const pathToModel2 = `${base}/../MiniCPM-o-2_6/mmproj-model-f16.gguf`;
        const instruction = "Transcribe the content of the image into text. Output only the content. Be concise."
        const command = `${pathToLlamaCli} -m ${pathToModel} --mmproj ${pathToModel2} -c 4096 --temp 0.7 --top-p 0.8 --top-k 100 --repeat-penalty 1.05 --image ${imagePath} -p "${instruction}"`
        const result = await exec(command);
        console.error(result.stderr);
        const [_, meaningfulOutput] = result.stdout.split('<assistant>');
        return meaningfulOutput;
    }
}