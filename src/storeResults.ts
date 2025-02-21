import fs from 'node:fs/promises'
export default class StoreResult {

    modelName: string;
    isAppendResults: boolean
    private storageFile: any;

    constructor(modelName: string, isAppendResults: boolean) {
        this.modelName = modelName;
        this.isAppendResults = isAppendResults
    }

    public resume() {
        // get all metrics and make and gave a unique WER value
    }

    public async append(image: string, transcription: string, wer: number) {
        const storage = await this.storage()

        const escapeStrings = (str: string) => {
            return str.replace(/"/g, '""');
        }

        const line = '"' + escapeStrings(image) + '","' + escapeStrings(transcription) + '","' + wer + '"\n';
        console.log({ storage})
        await fs.appendFile(storage, line, 'utf-8');
    }

    private async storage() {
        if (this.storageFile) {
            return this.storageFile;
        }

        if (!this.isAppendResults) {
            const date = (new Date()).getTime();
            const fileName = process.cwd() + '/results/' + this.modelName + '_' +  date + '.csv';
            await fs.writeFile(fileName, 'image,transcription,wer\n');
            this.storageFile = fileName;
            return this.storageFile;
        }

        const files = await fs.readdir(process.cwd() + '/results/');
        const orderByDate = files.filter(file => file.startsWith(this.modelName)).sort();
        this.storageFile = process.cwd() + '/results/' + orderByDate[orderByDate.length - 1];
        return this.storageFile;
    }
}