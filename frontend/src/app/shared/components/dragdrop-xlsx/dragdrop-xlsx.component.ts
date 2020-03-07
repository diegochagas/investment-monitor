import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import * as _ from 'lodash';

import * as XLSX from 'xlsx';

type AOA = any[][];

import { LoadingBarService } from '@ngx-loading-bar/core';

import {
  ExportExcelService,
  FiltersService
} from '../../services';

@Component({
  selector: 'app-dragdrop-xlsx',
  templateUrl: './dragdrop-xlsx.component.html',
  styleUrls: ['./dragdrop-xlsx.component.scss']
})
export class DragdropXlsxComponent implements OnInit, OnChanges {
  @Input() type;
  @Input() formData;

  @Output() setFormData = new EventEmitter();

  rows = [];
  cols = [];

  project;

  constructor(
    private exportExcelService: ExportExcelService,
    private filtersService: FiltersService,
    private loadingBarService: LoadingBarService
  ) { }

  ngOnInit() {
    this.project = localStorage.getItem('project');
  }

  ngOnChanges(changes) {
    if (changes.formData) {
      if (!changes.formData.firstChange) {
        if (this.type == 'strategies-telegram') {
          this.spreadValues(changes.formData.currentValue);
        }
      }
    }
  }

  spreadValues(formData) {
    this.cols = Object.keys(formData.pairs[0]);

    this.cols.push('delete');

    this.rows = formData.pairs;
  }

  readFile(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.rows = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 2 }));

      this.cols = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }))[0];

      this.cols.push('delete');

      this.setFormData.emit({ pairs: this.rows });
    };

    if (target) {
      reader.readAsBinaryString(target.files[0]);
    } else {
      reader.readAsBinaryString(evt[0]);
    }
  }

  changeValue(val, column, index) {
    this.rows[index][column] = val;
  }

  deleteValue(index) {
    let id = 1;

    let row = Object.assign([{}], this.rows);

    row.splice(index, 1);

    for (let i = 0; i < row.length; i++) {
      row[i][this.cols[0]] = id;

      id++;
    }

    this.rows = row;

    this.setFormData.emit({ pairs: this.rows });
  }

  downloadExample() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.filtersService.listHeaders(this.project).subscribe((response: any) => {
      this.exportExcelService.exportAsExcelFile(response.data, 'excelExample');

      this.loadingBarService.complete();
    });
  }

}
