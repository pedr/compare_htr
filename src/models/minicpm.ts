import child_process from 'node:child_process';
import { promisify } from 'node:util';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const exec = promisify(child_process.exec)
export default class MiniCPM {

    constructor () {
        console.log("loaded MiniCPM model")
    }

    public async init() {
        if (!process.env.LLAMACPP_PATH) {
            throw new Error("LLAMACPP_PATH not set");
        }
        if (!process.env.MINICPM_PATH) {
            throw new Error("MINICPM_PATH not set"); 
        }
    }

    public async run (imagePath: string) {
        const llamacpp = process.env.LLAMACPP_PATH;
        const modelFiles = process.env.MINICPM_PATH
        const pathToLlamaCli = `${llamacpp}/build/bin/llama-minicpmv-cli`;
        const pathToModel = `${modelFiles}/Model-7.6B-Q4_K_M.gguf`;
        const pathToModel2 = `${modelFiles}/mmproj-model-f16.gguf`;
        const pathToExampleImage = process.cwd() + '/example/text-lines-7.jpeg';

        const instruction = "SYSTEM: you are an agent of a OCR system. Your job is to be concise and correct. You should NEVER deviate from the content of the image. You should NEVER add any context or new information. Your only job should be to transcribe the text presented in the image as text without anything new inforation. Use the first image as an example, the output for it should be: ```This is a page with well-spaced lines of text to be recognized and segmented.```. Your turn:";

        const command = `${pathToLlamaCli} -m ${pathToModel} --mmproj ${pathToModel2} -c 4096 --temp 0.4 --top-p 0.8 --top-k 100 --repeat-penalty 1.05 --image ${pathToExampleImage} --image ${imagePath} -p "${instruction}"`

        const result = await exec(command);
        const log = result.stdout.split('<assistant>');
        return (log[log.length -1]).trim();
    }
}