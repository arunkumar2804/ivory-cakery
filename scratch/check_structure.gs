function checkStructure() {
  const ss = SpreadsheetApp.openById('1KMRIIQh1LGfGIcWMkNLioN_CC3nhU0edxIhLEyZjYfY');
  const sheets = ss.getSheets();
  console.log('Sheets found: ' + sheets.map(s => s.getName()).join(', '));
  
  const enqSheet = ss.getSheetByName('Enquiries');
  if (enqSheet) {
    const headers = enqSheet.getRange(1, 1, 1, enqSheet.getLastColumn()).getValues()[0];
    console.log('Enquiries Headers: ' + headers.join(' | '));
    const sampleRow = enqSheet.getRange(2, 1, 1, enqSheet.getLastColumn()).getValues()[0];
    console.log('Enquiries Row 2: ' + sampleRow.join(' | '));
  } else {
    console.log('Enquiries sheet NOT FOUND');
  }
  
  const invSheet = ss.getSheetByName('Invoice_Manager');
  if (invSheet) {
    console.log('Invoice_Manager B2: ' + invSheet.getRange('B2').getValue());
  } else {
    console.log('Invoice_Manager sheet NOT FOUND');
  }
}
