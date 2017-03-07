import { assign, difference, get } from 'lodash';
import { keysDeep } from 'plugins/pipelines/lib/keys_deep';
import { Processor } from 'plugins/pipelines/lib/processor';

export class GrokProcessor extends Processor {
  constructor(model) {
    super(
      'grok',
      'Grok',
      `Extracts structured fields out of a single text field within a document.
You choose which field to extract matched fields from, as well as the
grok pattern you expect will match. A grok pattern is like a regular
expression that supports aliased expressions that can be reused.`,
      'field',
      {
        field: '',
        patterns: [],
        traceMatch: false,
        patternDefinitions: [],
        ignoreMissing: false
      },
      model
    );
  }

  get description() {
    const inputKeys = keysDeep(get(this, 'processorShell.inputObject.doc'));
    const outputKeys = keysDeep(get(this, 'processorShell.outputObject.doc'));
    const addedKeys = difference(outputKeys, inputKeys);
    const chunks = [];

    if (this.field) chunks.push(` '${this.field}'`);
    if (addedKeys.length === 1) chunks.push(` into '${addedKeys.length[0]}'`);
    if (addedKeys.length > 1) chunks.push(` into ${addedKeys.length} fields`);

    return chunks.join('');
  }

  get errorConversions() {
    return [
      {
        pattern: /path cannot be null nor empty/,
        matchLength: 1,
        substitution: (matches) => {
          if (!this.field) {
            return {
              message: `Field is required`,
              field: 'field'
            };
          }
        }
      },
      {
        pattern: /\[patterns\] List of patterns must not be empty/,
        matchLength: 1,
        substitution: (matches) => {
          return {
            message: `Please provide at least one Pattern`,
            field: 'patterns'
          };
        }
      }
    ];
  };


  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        patterns: this.patterns || [],
        traceMatch: this.traceMatch,
        patternDefinitions: this.patternDefinitions || [],
        ignoreMissing: this.ignoreMissing || false,
      }
    );
  }
};
