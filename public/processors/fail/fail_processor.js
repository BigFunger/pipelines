import { assign } from 'lodash';
import { Processor } from 'plugins/pipelines/lib/processor';

export class FailProcessor extends Processor {
  constructor(model) {
    super(
      'fail',
      'Fail',
      `Raises an exception.`,
      null,
      {
        message: ''
      },
      model
    );
  }

  get description() {
    const chunks = [];

    if (this.message) chunks.push(` with '${this.message}'`);
    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        message: this.message || ''
      }
    );
  }
};
