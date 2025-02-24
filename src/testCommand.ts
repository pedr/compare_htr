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
        const fullPath = process.cwd() + '/images/' + image;
        const transcription = await model.run(fullPath);
        const gt = groundTruth.default[image];
        const wer = wordErrorRate(gt, transcription);
        storeResult.append(image, transcription, wer);
    }

    storeResult.resume()

}