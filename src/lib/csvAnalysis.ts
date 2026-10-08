type CsvRow = Record<string, string>;

type Priority = "High" | "Medium" | "Low";

export type CsvAnalysis = {
  fileName: string;
  rowsCount: number;
  headers: string[];
  detectedColumns: {
    issue?: string;
    title?: string;
    link?: string;
    id?: string;
    price?: string;
    availability?: string;
    status?: string;
  };
  issueGroups: {
    issue: string;
    count: number;
    priority: Priority;
    sample: CsvRow[];
  }[];
  warnings: string[];
  topUrls: string[];
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/^\uFEFF/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let inQuotes = false;

  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    const next = normalized[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if (char === "\n" && !inQuotes) {
      row.push(value.trim());

      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }

      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value.trim());

    if (row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  if (inQuotes) throw new Error("CSV contains an unclosed quoted field.");
  return rows;
}

function rowsToObjects(matrix: string[][]): {
  headers: string[];
  rows: CsvRow[];
} {
  const headers = matrix[0].map((header, index) => {
    const clean = header.replace(/^\uFEFF/, "").trim();
    return clean || `column_${index + 1}`;
  });

  const rows = matrix.slice(1).map((line) => {
    const row: CsvRow = {};

    headers.forEach((header, index) => {
      row[header] = line[index] ?? "";
    });

    return row;
  });

  return { headers, rows };
}

function findColumn(headers: string[], candidates: string[]): string | undefined {
  const normalizedCandidates = candidates.map(normalizeText);
  // Prefer exact aliases before trying whole phrases in longer labels.
  for (const candidate of normalizedCandidates) {
    const exact = headers.find((header) => normalizeText(header) === candidate);
    if (exact) return exact;
  }
  return headers.find((header) => {
    const padded = ` ${normalizeText(header)} `;
    return normalizedCandidates.some((candidate) =>
      padded.includes(` ${candidate} `),
    );
  });
}

function getPriority(issue: string): Priority {
  const clean = normalizeText(issue);

  if (
    clean.includes("disapproved") ||
    clean.includes("suspension") ||
    clean.includes("suspended") ||
    clean.includes("mismatched product price") ||
    clean.includes("mismatched product availability") ||
    clean.includes("mismatched domains") ||
    clean.includes("different product landing page")
  ) {
    return "High";
  }

  if (
    clean.includes("warning") ||
    clean.includes("pending") ||
    clean.includes("check") ||
    clean.includes("limited")
  ) {
    return "Medium";
  }

  return "Low";
}

export function analyzeCsvText(
  text: string,
  fileName = "demo-merchant-center-export.csv",
): CsvAnalysis {
  let matrix: string[][];
  try {
    matrix = parseCsv(text);
  } catch (error) {
    return {
      fileName, rowsCount: 0, headers: [], detectedColumns: {},
      issueGroups: [], topUrls: [],
      warnings: [error instanceof Error ? error.message : "CSV could not be parsed."],
    };
  }

  const rawHeaders = matrix[0] ?? [];
  const normalizedHeaders = rawHeaders.map(normalizeText);
  const duplicate = normalizedHeaders.find((header, index) =>
    header.length > 0 && normalizedHeaders.indexOf(header) !== index,
  );
  if (duplicate) {
    return {
      fileName, rowsCount: 0, headers: rawHeaders, detectedColumns: {},
      issueGroups: [], topUrls: [],
      warnings: ["CSV contains duplicate column names. Rename the repeated headers before analyzing."],
    };
  }

  if (matrix.length < 2) {
    return {
      fileName,
      rowsCount: 0,
      headers: matrix[0] ?? [],
      detectedColumns: {},
      issueGroups: [],
      topUrls: [],
      warnings: ["CSV looks empty or has no product rows."],
    };
  }

  const { headers, rows } = rowsToObjects(matrix);

  const detectedColumns = {
    issue: findColumn(headers, [
      "issue",
      "issues",
      "problem",
      "diagnostic issue",
      "what needs attention",
    ]),
    title: findColumn(headers, [
      "title",
      "item title",
      "product title",
      "name",
    ]),
    link: findColumn(headers, [
      "link",
      "url",
      "landing page",
      "final url",
      "product url",
    ]),
    id: findColumn(headers, ["id", "item id", "offer id", "product id", "sku"]),
    price: findColumn(headers, ["price", "sale price", "current price"]),
    availability: findColumn(headers, [
      "availability",
      "stock",
      "stock status",
    ]),
    status: findColumn(headers, ["status", "approval status", "item status"]),
  };

  const issueSource = detectedColumns.issue || detectedColumns.status;

  const grouped = new Map<string, CsvRow[]>();

  rows.forEach((row) => {
    const issue = issueSource ? row[issueSource]?.trim() : "";
    const key = issue || (issueSource ? "No issue provided" : "No issue column detected");
    const current = grouped.get(key) ?? [];
    current.push(row);
    grouped.set(key, current);
  });

  const issueGroups = Array.from(grouped.entries())
    .map(([issue, groupRows]) => ({
      issue,
      count: groupRows.length,
      priority: getPriority(issue),
      sample: groupRows.slice(0, 3),
    }))
    .sort((a, b) => {
      const priorityOrder: Record<Priority, number> = {
        High: 0,
        Medium: 1,
        Low: 2,
      };

      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return b.count - a.count;
    });

  const warnings: string[] = [];

  if (!detectedColumns.issue) {
    warnings.push(
      detectedColumns.status
        ? "No clear Issue column was detected. The checker grouped products by status instead."
        : "No Issue or Status column was detected. Products could not be classified by issue.",
    );
  }

  if (!detectedColumns.link) {
    warnings.push(
      "No product URL / landing page column was detected. URL-level checks will need manual product URLs.",
    );
  }

  if (!detectedColumns.price) {
    warnings.push(
      "No price column was detected. Price mismatch analysis will require feed price data.",
    );
  }

  if (!detectedColumns.availability) {
    warnings.push(
      "No availability column was detected. Availability mismatch analysis will require stock data.",
    );
  }

  const topUrls = detectedColumns.link
    ? rows
        .map((row) => row[detectedColumns.link as string])
        .filter(Boolean)
        .slice(0, 5)
    : [];

  return {
    fileName,
    rowsCount: rows.length,
    headers,
    detectedColumns,
    issueGroups,
    warnings,
    topUrls,
  };
}

