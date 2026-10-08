import test from "node:test";
import assert from "node:assert/strict";
import { analyzeCsvText } from "../src/lib/csvAnalysis.ts";

test("groups affected products and sorts by severity", () => {
  const result = analyzeCsvText("Item ID,Issue,Link\na,Warning,https://example.com/a\nb,Mismatched product price,https://example.com/b\nc,Mismatched product price,https://example.com/c");
  assert.equal(result.rowsCount, 3);
  assert.deepEqual(result.issueGroups.map(({ issue, count, priority }) => ({ issue, count, priority })), [
    { issue: "Mismatched product price", count: 2, priority: "High" },
    { issue: "Warning", count: 1, priority: "Medium" },
  ]);
});
test("preserves commas and escaped quotes in quoted fields", () => {
  const result = analyzeCsvText('ID,Title,Issue\n1,"Cup, ""blue""",Warning');
  assert.equal(result.issueGroups[0].sample[0].Title, 'Cup, "blue"');
});
test("supports embedded line breaks and CRLF records", () => {
  const result = analyzeCsvText('ID,Title,Issue\r\n1,"Two\r\nlines",Warning\r\n');
  assert.equal(result.rowsCount, 1);
  assert.equal(result.issueGroups[0].sample[0].Title, "Two\nlines");
});
test("ignores empty lines", () => {
  assert.equal(analyzeCsvText("ID,Issue\n\n1,Warning\n\n").rowsCount, 1);
});
test("accepts UTF-8 BOM headers", () => {
  const result = analyzeCsvText("\uFEFFItem ID,Issue\n1,Warning");
  assert.equal(result.detectedColumns.id, "Item ID");
});
test("prefers an exact column alias to a longer partial label", () => {
  const result = analyzeCsvText("Approval Status,Status,ID\nApproved,Disapproved,1");
  assert.equal(result.detectedColumns.status, "Status");
  assert.equal(result.issueGroups[0].issue, "Disapproved");
});
test("does not mistake grid for ID", () => {
  assert.equal(analyzeCsvText("Grid,Issue\n123,Warning").detectedColumns.id, undefined);
});
test("rejects duplicate headers instead of silently overwriting values", () => {
  const result = analyzeCsvText("ID,Issue,Issue\n1,Warning,Disapproved");
  assert.equal(result.rowsCount, 0);
  assert.match(result.warnings[0], /duplicate column names/);
});
test("also rejects duplicate headers that differ only in casing", () => {
  assert.match(analyzeCsvText("ID,Issue,issue\n1,Warning,Disapproved").warnings[0], /duplicate/);
});
test("does not claim status-based grouping when neither column exists", () => {
  const result = analyzeCsvText("ID,Title\n1,Cup");
  assert.match(result.warnings[0], /No Issue or Status/);
  assert.equal(result.issueGroups[0].issue, "No issue column detected");
});
test("distinguishes an empty issue cell from a missing column", () => {
  const result = analyzeCsvText("ID,Issue\n1,");
  assert.equal(result.issueGroups[0].issue, "No issue provided");
});
test("rejects unclosed quoted fields", () => {
  const result = analyzeCsvText('ID,Title,Issue\n1,"Cup,Warning');
  assert.equal(result.rowsCount, 0);
  assert.match(result.warnings[0], /unclosed quoted field/);
});
test("header-only files return a clear warning", () => {
  const result = analyzeCsvText("ID,Issue\n");
  assert.equal(result.rowsCount, 0);
  assert.match(result.warnings[0], /no product rows/);
});
