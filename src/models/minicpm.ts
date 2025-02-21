
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default class MiniCPM {

    constructor () {
        console.log("loaded MiniCPM model")
    }

    public async init() {
        // check if dependecies exists, etc
        // log parameters, etc?
    }

    public async run (imagePath: string) {
        console.log('Running: ', imagePath)
        await wait(500)
        return "Finished: " + imagePath
    }

}
