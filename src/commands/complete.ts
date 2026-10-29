import pc from 'picocolors';
import { COMPLETION_SCRIPTS } from '../completion/scripts.js';
import { computeCompletions } from '../completion/engine.js';
import { OutputFormat } from '../types.js';

export interface CompletionCommandOptions {
  format?: string;
  script?: string;
  json?: boolean;
}

/**
 * `dhatugen completion <shell>` — prints the auto-completion script for
 * bash, zsh, or fish. Supports the standard --format / --json flags for
 * scriptable consumption (table = raw script text).
 */
export function handleCompletion(shell: string, options: CompletionCommandOptions): void {
  const shellName = (shell || '').toLowerCase();

  if (!COMPLETION_SCRIPTS[shellName]) {
    console.error(pc.red(`Error: unknown shell '${shell}'.`));
    console.error(pc.yellow('Usage: dhatugen completion <bash|zsh|fish>'));
    process.exit(1);
  }

  const script: string = COMPLETION_SCRIPTS[shellName]();

  let format: OutputFormat | string = options.format || 'table';
  if (options.json) format = 'json';

  switch (format) {
    case 'json': {
      console.log(JSON.stringify({ shell: shellName, command: 'completion', script }, null, 2));
      break;
    }
    case 'markdown': {
      const lang = shellName === 'fish' ? 'fish' : shellName === 'zsh' ? 'zsh' : 'bash';
      console.log(`# dhatugen ${shellName} completion`);
      console.log('');
      console.log('```' + lang);
      console.log(script.trimEnd());
      console.log('```');
      break;
    }
    case 'csv': {
      console.log('shell,script');
      console.log(`${shellName},"${script.trimEnd().replace(/"/g, '""').replace(/\n/g, '\\n')}"`);
      break;
    }
    case 'tsv': {
      console.log('shell\tscript');
      console.log(`${shellName}\t${script.trimEnd().replace(/\t/g, '\\t').replace(/\n/g, '\\n')}`);
      break;
    }
    case 'table':
    default: {
      console.log(script.trimEnd());
      break;
    }
  }
}

/**
 * `dhatugen __complete <words...>` — hidden completion engine entrypoint.
 * Receives the committed words plus the current fragment (possibly empty)
 * as the last argument; prints one candidate per line.
 */
export function handleComplete(tokens: string[]): void {
  const candidates = computeCompletions(tokens || []);
  for (const c of candidates) {
    console.log(c);
  }
}
