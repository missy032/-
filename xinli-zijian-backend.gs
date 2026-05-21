/**
 * 心力自检表 · Google 表格后台
 *
 * 使用步骤见：心力自检-后台配置说明.md
 */

var SHEET_NAME = '答卷记录';

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      '提交时间',
      '答卷编号',
      '总分',
      '结果档位',
      '是题数',
      'Q1', 'Q2', 'Q3', 'Q4', 'Q5',
      'Q6', 'Q7', 'Q8', 'Q9', 'Q10'
    ]);
    sheet.getRange(1, 1, 1, 15).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('empty body');
  }
  return JSON.parse(e.postData.contents);
}

function doPost(e) {
  try {
    var data = parsePayload_(e);
    var sheet = getSheet_();
    var answers = data.answers || [];
    while (answers.length < 10) {
      answers.push('');
    }
    sheet.appendRow([
      new Date(),
      data.recordId || '',
      data.score != null ? data.score : '',
      data.level || '',
      data.yesCount != null ? data.yesCount : '',
      answers[0], answers[1], answers[2], answers[3], answers[4],
      answers[5], answers[6], answers[7], answers[8], answers[9]
    ]);
    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, message: '心力自检表后台运行中' });
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
