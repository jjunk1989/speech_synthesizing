import sdk from "microsoft-cognitiveservices-speech-sdk";
import setting from './setting.js'
import readline from 'node:readline';
import fs from 'node:fs';
import synthesis from './synthesis.js';

console.log('loading setting', setting);

async function processLineByLine() {
    const synthesiser = new synthesis(setting); 

    const fileStream = fs.createReadStream(setting.inputFileName);
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      console.log(`Line from file: ${line}`);
      await synthesiser.speakTextAsync(line);
    }

    synthesiser.release();
  }
  
  processLineByLine();