// Google Sheets data fetcher
export interface Member {
  timestamp: string;
  name: string;
  phone: string;
  linkedin: string;
  profession: string;
  industry: string;
  skills: string;
  location: string;
}

// TODO: Replace this with your actual Google Sheets ID
// After you create your Google Form and Sheet, get the Sheet ID from the URL
// and replace 'YOUR_SHEET_ID_HERE' below
const SHEET_ID = "1HNbf-2bdvQCZB2TeC2L-Yi-49VfywcuheC8Nn_51Zc4";

export async function fetchMembers(): Promise<Member[]> {
  // For development, return mock data if no sheet ID is set
  // if (SHEET_ID === 'YOUR_SHEET_ID_HERE') {
  //   return getMockMembers();
  // }

  try {
    // Google Sheets CSV export URL (works for public sheets)
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Failed to fetch Google Sheets data");
      return getMockMembers();
    }

    const csvText = await response.text();
    const members = parseCSV(csvText);

    return members;
  } catch (error) {
    console.error("Error fetching members:", error);
    return getMockMembers();
  }
}

function parseCSV(csvText: string): Member[] {
  const lines = csvText.split("\n");

  // Skip header row
  const dataLines = lines.slice(1);

  const members: Member[] = [];

  for (const line of dataLines) {
    if (!line.trim()) continue;

    // Proper CSV parsing that handles quoted fields with commas
    const fields: string[] = [];
    let currentField = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        // Toggle quote state
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        // End of field
        fields.push(currentField.trim());
        currentField = "";
      } else {
        // Add character to current field
        currentField += char;
      }
    }

    // Don't forget the last field
    if (currentField) {
      fields.push(currentField.trim());
    }

    // Skip lines that don't have all required fields
    if (fields.length < 8) continue;

    const [
      timestamp,
      name,
      phone,
      linkedin,
      profession,
      industry,
      skills,
      location,
    ] = fields;

    members.push({
      timestamp,
      name,
      phone,
      linkedin,
      profession,
      industry,
      skills,
      location,
    });
  }

  return members;
}

// Mock data for development/testing
function getMockMembers(): Member[] {
  return [
    {
      timestamp: "2025-11-08 10:30:00",
      name: "Abebe Kebede",
      phone: "+254712345678",
      linkedin: "https://linkedin.com/in/abebekebede",
      profession: "Software Engineer",
      industry: "Technology",
      skills: "JavaScript, Python, Cloud Architecture, Team Leadership",
      location: "Nairobi",
    },
    {
      timestamp: "2025-11-08 11:15:00",
      name: "Tigist Alemu",
      phone: "+254723456789",
      linkedin: "https://linkedin.com/in/tigistalemu",
      profession: "Marketing Manager",
      industry: "Retail & E-commerce",
      skills: "Digital Marketing, Brand Strategy, Social Media, Analytics",
      location: "Nairobi",
    },
    {
      timestamp: "2025-11-08 12:00:00",
      name: "Dawit Tesfaye",
      phone: "+254734567890",
      linkedin: "https://linkedin.com/in/dawittesfaye",
      profession: "Financial Analyst",
      industry: "Finance & Banking",
      skills: "Financial Modeling, Risk Analysis, Excel, Data Visualization",
      location: "Nairobi",
    },
    {
      timestamp: "2025-11-08 13:30:00",
      name: "Hanna Girma",
      phone: "+254745678901",
      linkedin: "",
      profession: "Healthcare Administrator",
      industry: "Healthcare",
      skills:
        "Healthcare Management, Operations, Compliance, Team Coordination",
      location: "Mombasa",
    },
    {
      timestamp: "2025-11-08 14:20:00",
      name: "Yohannes Mulugeta",
      phone: "+254756789012",
      linkedin: "https://linkedin.com/in/yohannesmulugeta",
      profession: "Business Consultant",
      industry: "Consulting",
      skills:
        "Strategy, Project Management, Business Development, Negotiations",
      location: "Nairobi",
    },
    {
      timestamp: "2025-11-08 15:00:00",
      name: "Meron Assefa",
      phone: "+254767890123",
      linkedin: "https://linkedin.com/in/meronassefa",
      profession: "Graphic Designer",
      industry: "Media & Entertainment",
      skills: "Adobe Creative Suite, Branding, UI/UX Design, Illustration",
      location: "Nairobi",
    },
    {
      timestamp: "2025-11-08 16:45:00",
      name: "Solomon Tadesse",
      phone: "+254778901234",
      linkedin: "https://linkedin.com/in/solomontadesse",
      profession: "Civil Engineer",
      industry: "Construction & Real Estate",
      skills:
        "Project Planning, AutoCAD, Construction Management, Quality Control",
      location: "Nakuru",
    },
    {
      timestamp: "2025-11-08 17:30:00",
      name: "Bethlehem Haile",
      phone: "+254789012345",
      linkedin: "",
      profession: "Teacher",
      industry: "Education",
      skills:
        "Curriculum Development, Student Engagement, Assessment, Mentoring",
      location: "Kisumu",
    },
  ];
}
