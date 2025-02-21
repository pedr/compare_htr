
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default class Mock {

    constructor () {
        console.log("loaded Mock model")
    }

    public async init() {
        return wait(1000);
    }

    public async run (imagePath: string) {
        await wait(500)
        return "J'étdie français."
    }

}
