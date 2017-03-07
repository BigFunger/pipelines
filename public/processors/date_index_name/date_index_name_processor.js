import { assign } from 'lodash';
import { Processor } from 'plugins/pipelines/lib/processor';

export class DateIndexNameProcessor extends Processor {
  constructor(model) {
    super(
      'date_index_name',
      'Date Index Name',
      `Assigns the _index meta field with a date math index name expression based on the provided
index name prefix, date or timestamp field in the documents being
processed and the provided date rounding.`,
      'field',
      {
        field: '',
        indexNamePrefix: '',
        dateRounding: '',
        formats: [],
        timezone: '',
        locale: '',
        indexNameFormat: ''
      },
      model
    );
  }

  get description() {
    const chunks = [];

    if (this.field) chunks.push(` derived from '${this.field}'`);
    return chunks.join('');
  }

  get model() {
    return assign(
      super.model,
      {
        field: this.field || '',
        indexNamePrefix: this.indexNamePrefix || '',
        dateRounding: this.dateRounding || '',
        formats: this.formats || [],
        timezone: this.timezone || '',
        locale: this.locale || '',
        indexNameFormat: this.indexNameFormat || ''
      }
    );
  }
};
