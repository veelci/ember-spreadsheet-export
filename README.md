ember-spreadsheet-export
==============================================================================

Addon that encapsulates ability to render a data set as either excel or csv.

Forked from [roofstock/ember-cli-data-export](https://github.com/roofstock/ember-cli-data-export).


Differences from `ember-cli-data-export` include:
------------------------------------------------------------------------------

- Dependencies have been updated to address various deprecations
- The undocumented `export-selector` and `export-selector-onselect` components have been removed, in order to remove
the dependency on `ember-select-list`, which hasn't been updated in a long time
- The `csv` and `excel` services are not automatically injected
- The dummy app now has content (a couple of buttons to generate demo files)
- Multiple sheets can be added to a single XLSX file
- [v0.3.0] The `excel` service supports merging cells via an additional `merges` option
- [v0.4.0] The `csv` service supports a new `raw` option, which disables quoting and escaping of cell contents
- [v0.5.0] The `csv` service supports a new `autoQuote` option, which only quotes/escapes cells which need it
(those containing quotes, commas or newlines).
- [v0.6.0] The `excel` service accepts either a nested array or an `HTMLTableElement` as data for any sheet
- [v0.6.0] Both services can optionally return the generated blob instead of (or as well as) downloading it


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-spreadsheet-export
```


## Usage

 - Inject the service(s) for Excel and/or CSV formats, depending on your needs.
 - Feed a datastructure that's an array of arrays, where each internal array is the set of data to be rendered for that row.
   - Example: `[['Title 1', 'Title 2', 'Title 3'],['row1cell1', 'row1cell2', 'row1cell3'],['row2cell1', 'row2cell2', 'row2cell3']]`
 - Alternatively, the Excel service accepts an `HTMLTableElement` instead of an array, and will parse the table.
 - The Excel service can generate a multi-sheet workbook - pass an array of objects, each containing a sheet name and data (array or HTML table).

#### Merging Cells (Excel only)

In order to merge cells, an array of `merges` can be passed in the `options` hash.
Each element of this array should be an object taking the following form:
```javascript
{
  s: {
    r: 0,
    c: 0,
  },
  e: {
    r: 1,
    c: 0,
  },
}
``` 
`s` defines the start of the range to be merged, and `e` the end of the range.
Within each, `r` is the row index and `c` is the column index.
The example above would therefore merge the first two cells in the first column.

## Examples
```javascript
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  // Don't forget to inject the service(s) as needed
  @service csv;
  @service excel;

  // Then go ahead and use it in your code
  @action export() {
    const data = [
      ['Title 1', 'Title 2', 'Title 3'],
      ['row1cell1', 'row1cell2', 'row1cell3'],
      ['row2cell1', 'row2cell2', 'row2cell3'],
    ];

    if (type === 'MultiExcel') {
      const sheets = [
        {
          name: 'Demo sheet',
          data,
        },
        {
          name: 'Supplemental sheet',
          data: [
            ['Foo', 'Bar'],
            ['Baz', 'Foobar'],
          ],
        },
        {
          name: 'HTML table',
          data: document.querySelector('#data'),
        },
      ];
      this.excel.export(sheets, { multiSheet: true, fileName: 'test.xlsx' });
    } else if (type === 'Excel') {
      this.excel.export(data, { sheetName: 'sheet1', fileName: 'test.xlsx' });
    } else if (type === 'CSV') {
      this.csv.export(data, { fileName: 'test.csv', autoQuote: true });
    }
  }
}
```
