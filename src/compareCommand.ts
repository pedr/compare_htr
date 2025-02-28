import fs from 'node:fs/promises'
import csv from 'csv/sync';

export default async (reportFilePath: string) => {
    
    const file = await fs.readFile(reportFilePath, 'utf-8');
    const csvFile = csv.parse(file);

    const headerRemoved = csvFile.slice(1);
    const wers = headerRemoved.map(line => line[2])
    .map((wer) => parseFloat(wer))

    const averageWER = wers
     .reduce((a, b) => {
        return a + b;
    }, 0) / headerRemoved.length
    const medianWER = median(wers);
    const worstTranscription =  headerRemoved.sort((a, b) => parseFloat(b[2]) - parseFloat(a[2]))[0];

    const averageSeconds = headerRemoved.map(line => parseFloat(line[3])).reduce((a, b) => a + b, 0) / headerRemoved.length;

    const humanReadable = (val: number) => (val * 100).toFixed(2) + '%'

    let l = '';
    l += '\n' + "Metric is based on WER (Word error rate), lower is better, 0% means that is identical.";
    l += '\n' + '| Result | Average | Median | Worst Transcription | Worst WER | Average duration (seconds) |';
    l += '\n' + '| --- | --- | --- | --- | --- | --- |';
    l += '\n' + `|${reportFilePath.split('/')[reportFilePath.split('/').length - 1]}|${humanReadable(averageWER)}|${humanReadable(medianWER)}|${worstTranscription[0]}|${humanReadable(parseFloat(worstTranscription[2]))}| ${averageSeconds.toFixed(0)} |`;

    l += '\n\n' + `Worst transcription:\n${worstTranscription[1]}`;

    return l;

}

function median(values: number[]): number {

  if (values.length === 0) {
    throw new Error('Input array is empty');
  }

  values = [...values].sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  return (values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2
  );

}