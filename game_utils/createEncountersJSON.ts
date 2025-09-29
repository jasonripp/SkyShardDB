// This script parses encounter files and combines them into a single Encounters.json file.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const triggerWord = '[resource]';
const sourceFolder = path.join(__dirname, '../ignore/ProjectSkyShard/encounters/Resources');
const outputFile = path.join(__dirname, '../public/game_info/encounters.json');

async function processEncounterFiles() {
    const resultsArray: Record<string, string>[] = [];

    try {
        const files = await fs.readdir(sourceFolder);
        const encounterFiles = files.filter(file => path.extname(file).toLowerCase() === '.tres');

        console.log(`Found ${encounterFiles.length} encounter files to process...`);

        for (const file of encounterFiles) {
            const filePath = path.join(sourceFolder, file);
            const content = await fs.readFile(filePath, 'utf8');
            const lines = content.split(/\r?\n/);
            const startIndex = lines.findIndex(line => line.includes(triggerWord));

            if (startIndex !== -1) {
                const fileObject: Record<string, string> = {};
                const linesToProcess = lines.slice(startIndex + 1);

                linesToProcess.forEach((line) => {
                    if (line.trim() !== '') {
                        const [key, ...valueParts] = line.split('=');
                        let value = valueParts.join('=').trim();

                        if (key && value) {
                            value = value.replace(/^"|"$/g, '');
                            fileObject[key.trim()] = value;
                        }
                    }
                });

                if (Object.keys(fileObject).length > 0) {
                    resultsArray.push(fileObject);
                }
            } else {
                console.warn(`Warning: Trigger word "${triggerWord}" not found in ${file}.`);
            }
        }

        const jsonOutput = JSON.stringify(resultsArray, null, 2);

        await fs.writeFile(outputFile, jsonOutput, 'utf8');
        console.log(`✅ Success! Data has been combined into ${outputFile}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error('❌ An error occurred:', error.message);
        } else {
            console.error('❌ An unknown error occurred:', error);
        }
    }
}

processEncounterFiles();