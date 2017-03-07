import { assign } from 'lodash';
import { Processor } from 'plugins/pipelines/lib/processor';

export class TrimProcessor extends Processor {
  constructor(model) {
    super(
      'trim',
      'Trim',
      `Trims whitespace from field.`,
      'field',
      {
        field: '',
        ignoreMissing: false
      },
      model
    );
  }

  get description() {
    const chunks = [];

    if (this.field) chunks.push(` '${this.field}'`);
    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        ignoreMissing: this.ignoreMissing
      }
    );
  }
};
