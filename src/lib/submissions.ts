import fs from "fs/promises";
import path from "path";

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budgetRange: string;
  message: string;
  createdAt: string;
  status: "new" | "in-review" | "contacted" | "booked" | "archived";
  notes?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

// Initial sample inquiries so admin panel has rich demonstration data immediately
const SEED_SUBMISSIONS: FormSubmission[] = [
  {
    id: "sub_1727601200001",
    name: "Genevieve De Montmirail",
    email: "g.montmirail@haute-luxury.fr",
    phone: "+33 6 12 34 56 78",
    eventType: "High-End Weddings",
    eventDate: "2026-11-14",
    guestCount: "200 - 500 Guests",
    budgetRange: "$250,000 - $500,000",
    message: "Seeking complete creative direction and spatial staging for our 3-day wedding celebration at a private château in Loire Valley. Need acoustic design and Michelin-caliber catering logistics.",
    createdAt: "2026-09-28T14:22:00.000Z",
    status: "new",
  },
  {
    id: "sub_1727601200002",
    name: "Marcus Vance",
    email: "marcus.vance@apexglobal.com",
    phone: "+1 (415) 890-2134",
    eventType: "Corporate Summits & Galas",
    eventDate: "2026-12-05",
    guestCount: "500+ Guests",
    budgetRange: "$500,000+",
    message: "Annual Global Leadership Summit in Dubai. High-profile VIP speakers, holographic keynote stage, and diplomatic tier security protocols required.",
    createdAt: "2026-09-27T09:15:30.000Z",
    status: "in-review",
    notes: "Followed up with executive assistant regarding technical rider and Dubai venue permits.",
  },
];

async function ensureDataFileExists(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      // File does not exist, initialize with seed
      await fs.writeFile(DATA_FILE, JSON.stringify(SEED_SUBMISSIONS, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error ensuring submissions data file:", error);
  }
}

export async function getSubmissions(): Promise<FormSubmission[]> {
  await ensureDataFileExists();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return [];
  } catch (error) {
    console.error("Failed to read submissions JSON:", error);
    return [];
  }
}

export async function addSubmission(
  submission: Omit<FormSubmission, "id" | "createdAt" | "status">
): Promise<FormSubmission> {
  await ensureDataFileExists();
  const submissions = await getSubmissions();

  const newEntry: FormSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...submission,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  submissions.unshift(newEntry);
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  return newEntry;
}

export async function updateSubmission(
  id: string,
  updates: Partial<Pick<FormSubmission, "status" | "notes">>
): Promise<FormSubmission | null> {
  await ensureDataFileExists();
  const submissions = await getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index === -1) return null;

  submissions[index] = {
    ...submissions[index],
    ...updates,
  };

  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  return submissions[index];
}

export async function deleteSubmission(id: string): Promise<boolean> {
  await ensureDataFileExists();
  const submissions = await getSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);

  if (filtered.length === submissions.length) {
    return false;
  }

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
