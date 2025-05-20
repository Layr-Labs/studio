import * as fs from 'fs';
import * as path from 'path';

const INPUT_FILE = path.join(__dirname, '../hello-world-avs-json.txt');
const OUTPUT_FILE = path.join(__dirname, '../hello-world-avs-json.txt');

function generateSummary(filePath: string, content: string): string {
  // Simple heuristics for summary
  if (filePath.endsWith('.json')) {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return `JSON ABI with ${parsed.length} entries.`;
      } else if (typeof parsed === 'object') {
        return `JSON file with keys: ${Object.keys(parsed).join(', ')}.`;
      }
    } catch {
      // Not valid JSON, fall through
    }
    return 'JSON file.';
  }
  if (filePath.endsWith('.ts')) {
    const match = content.match(/export\s+(?:default\s+)?(class|function)\s+(\w+)/);
    if (match) {
      return `TypeScript file exporting ${match[1]} '${match[2]}'`;
    }
    return 'TypeScript source file.';
  }
  if (filePath.endsWith('.js')) {
    const match = content.match(/module\.exports\s*=\s*(\w+)/);
    if (match) {
      return `JavaScript file exporting '${match[1]}'`;
    }
    return 'JavaScript source file.';
  }
  // Fallback: use first line or a generic message
  const firstLine = content.split('\n').find(line => line.trim().length > 0);
  return firstLine ? `File starts: ${firstLine.slice(0, 60)}` : 'No summary available.';
}

function parseBlocks(input: string) {
  const blocks = input.split(/={16,}\s*File: /g).slice(1); // skip first empty split
  return blocks.map(block => {
    const [header, ...contentLines] = block.split(/={16,}\s*\n/);
    const filePath = header.trim();
    const content = contentLines.join('====\n').trim();
    return { filePath, content };
  });
}

function main() {
  const input = fs.readFileSync(INPUT_FILE, 'utf-8');
  const blocks = parseBlocks(input);
  const result = blocks.map(({ filePath, content }) => ({
    path: filePath,
    summary: generateSummary(filePath, content),
    content: content
  }));
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Wrote ${result.length} entries to ${OUTPUT_FILE}`);
}

main(); 