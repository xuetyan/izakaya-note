<template>
  <div v-if="false" class="get-xlsx">
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="readXlsx">
  </div>
  <RouterView />
</template>

<script lang="ts" setup name="Menu">
import * as XLSX from 'xlsx'

const excelData = {
  header: null,
  results: null
}

const readXlsx = function(e: any) {
  const files = e.target.files
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  upload(rawFile)
}

const upload = function(rawFile: any) {
  readerData(rawFile)
}

const readerData = function(rawFile: Blob) {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = e?.target?.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const header = getHeaderRow(worksheet)
      const results = XLSX.utils.sheet_to_json(worksheet)
      generateData({ header, results })
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}

const generateData = function({ header, results }: any) {
  excelData.header = header
  excelData.results = results
}

const getHeaderRow = function(sheet: XLSX.WorkSheet) {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

</script>

<style scoped>
.get-xlsx {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: pink;
  margin-bottom: 50px;
  text-align: center;
}
</style>