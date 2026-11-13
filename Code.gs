/** Deploy as Web app: Execute as Me; Who has access: Anyone. */
const SPREADSHEET_ID = '10CN5CMjuJwtqT0e-azg8Ofe6_n_ep4IFiFk7ApxFPWM';
const TAB_NAME = 'Website RSVPs';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const v = (e && e.parameter) || {};
    if (v.website) return ContentService.createTextOutput('OK'); // spam trap
    const name = String(v.name || '').trim().slice(0, 200);
    const email = String(v.email || '').trim().slice(0, 250);
    const attendance = String(v.attending || '');
    const id = String(v.submissionId || '').slice(0, 100);
    if (!name || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
        !['accepts', 'declines'].includes(attendance) || !id) {
      return ContentService.createTextOutput('Invalid submission');
    }
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TAB_NAME);
    if (!sheet) throw new Error('Website RSVPs tab missing');
    const last = sheet.getLastRow();
    if (last > 1 && sheet.getRange(2, 8, last - 1, 1).getValues().some(row => row[0] === id)) {
      return ContentService.createTextOutput('OK');
    }
    // Prefix text with apostrophe to avoid spreadsheet formula injection.
    const safe = value => {
      const s = String(value || '').slice(0, 2000);
      return /^[=+@-]/.test(s) ? "'" + s : s;
    };
    sheet.appendRow([
      new Date(), safe(name), safe(email), attendance,
      attendance === 'accepts' ? safe(v.guests) : '0',
      attendance === 'accepts' ? safe(v.dietary) : '',
      safe(v.message), id
    ]);
    return ContentService.createTextOutput('OK');
  } catch (error) {
    console.error(error);
    return ContentService.createTextOutput('ERROR');
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
