import fs from 'node:fs/promises'
import StoreResult from './storeResults';
import { wordErrorRate } from 'word-error-rate';

const getModel = async (modelName: string) => {
    const parentPath = process.cwd() + '/dist/models/'
    const file = parentPath + modelName;

    const imported = await import(file);
    const ModelClass = imported.default;
    const model = new ModelClass();
    await model.init();

    return model;
}

export default async (modelName: string, isAppendResults: boolean) => {
    
    const model = await getModel(modelName); 
    const storeResult = new StoreResult(modelName, isAppendResults);
    await storeResult.init();

    const content = await fs.readdir(process.cwd() + '/images/');
    const images = content.filter(file => !file.endsWith('.json'));

    const groundTruth = await import(process.cwd() + '/images/_ground-truth.json');

    for (const image of images) {
        console.log('Processing: ' + image)
        const started = new Date().getTime();
        const imageAlreadyProcessed = await storeResult.has(image);
        if (imageAlreadyProcessed) {
            continue;
        }
        const fullPath = process.cwd() + '/images/' + image;
        const transcription = await model.run(fullPath);
        const gt = groundTruth.default[image];
        const wer = wordErrorRate(normalizeBeforeWER(gt), normalizeBeforeWER(transcription));
        const durationInSeconds = Math.floor((new Date().getTime() - started) / 1000);
        console.log(`Duration: ${durationInSeconds} seconds`)
        storeResult.append(image, transcription, wer, durationInSeconds);
    }

    storeResult.resume()

}

const normalizeBeforeWER = (text) => {
    return text
        .replaceAll('\n', ' ')
        .replaceAll('\t', ' ')
        .replaceAll('“', '"')
        .replaceAll('”', '"')
        // multiple spaces with single one
        .replaceAll(/\s\s+/g, ' ')
        .toLowerCase();
}