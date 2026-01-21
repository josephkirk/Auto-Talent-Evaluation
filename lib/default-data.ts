import * as toml from 'toml';
import { readFileSync } from 'fs';
import { join } from 'path';

interface DefaultData {
  award_types: {
    types: string[];
  };
}

export function getAwardTypes(): string[] {
  try {
    const configPath = join(process.cwd(), 'default_data.toml');
    const fileContent = readFileSync(configPath, 'utf-8');
    const data = toml.parse(fileContent) as DefaultData;
    return data.award_types.types || [];
  } catch (error) {
    console.error('Error loading award types from TOML:', error);
    // Return default values if file doesn't exist or can't be parsed
    return [
      'Best Staff',
      'Employee of the year',
      'Top Contributor',
      'Innovation Award'
    ];
  }
}
