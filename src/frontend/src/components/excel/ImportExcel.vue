<template>
  <div class="excel-import">
    <input ref="fileInput" type="file" class="hidden" accept=".xlsx, .xls" @change="handleClick" />
    <div
      class="px-8 py-16 cursor-pointer text-center border-2 border-dashed d-theme-border-grey-light d-theme-dark-bg text-xl"
      @click="$refs.fileInput.click()"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      <feather-icon
        icon="UploadCloudIcon"
        svg-classes="h-16 w-16 stroke-current text-grey"
        class="block"
      />
      <span>Drop Excel File or </span>
      <span class="font-medium text-primary" @click.stop="$refs.fileInput.click()">Browse</span>
      <!-- <vs-button type="border" @click.stop="$refs.fileInput.click()">Browse</vs-button> -->
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
  props: {
    onSuccess: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      excelData: {
        header: null,
        results: null,
        meta: null
      }
    };
  },
  methods: {
    generateData({ header, results, meta }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.excelData.meta = meta;
      if (this.onSuccess) this.onSuccess(this.excelData);
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = `UNKNOWN ${C}`; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      const { files } = e.dataTransfer;
      if (files.length !== 1) {
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'Only support uploading one file!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        });
        return;
      }
      const rawFile = files[0]; // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'Only supports upload .xlsx, .xls, .csv suffix files',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        });
        return false;
      }
      this.uploadFile(rawFile);
    },
    readerData(rawFile) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          const meta = { sheetName: firstSheetName };
          this.generateData({ header, results, meta });
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    handleClick(e) {
      const { files } = e.target;
      const rawFile = files[0];
      if (!rawFile) return;
      this.uploadFile(rawFile);
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
    uploadFile(file) {
      this.$refs.fileInput.value = null; // fix can't select the same excel
      this.readerData(file);
    }
  }
};
</script>
