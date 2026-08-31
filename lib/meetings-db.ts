import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: May 10"],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of new Primary president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "Special Musical Number",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past",
    },
    closingPrayer: "Brother Davis",
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Sister Johnson",
    announcements: ["Youth activity this Friday"],
    openingHymn: {
      number: 81,
      title: "Press Forward, Saints",
    },
    openingPrayer: "Brother Miller",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [],
    closingHymn: {
      number: 227,
      title: "There Is Sunshine in My Soul Today",
    },
    closingPrayer: "Sister Davis",
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Wilson",
    announcements: ["Temple recommend interviews next Sunday"],
    openingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    openingPrayer: "Sister Clark",
    wardBusiness: [
      {
        description: "Sustaining of new Relief Society presidency",
      },
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 194,
      title: "There Is a Green Hill Far Away",
    },
    speakers: [
      {
        name: "Brother Anderson",
        topic: "Following the Savior",
        type: "speaker",
      },
      {
        name: "Sister Taylor",
        topic: "Service in the Church",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 270,
      title: "I'll Go Where You Want Me to Go",
    },
    closingPrayer: "Brother Harris",
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "Stake President Adams",
    conducting: "Brother Moore",
    announcements: ["Stake conference schedule"],
    openingHymn: {
      number: 27,
      title: "Praise to the Lord, the Almighty",
    },
    openingPrayer: "Sister Martin",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 193,
      title: "I Stand All Amazed",
    },
    speakers: [
      {
        name: "President Adams",
        topic: "Building Faith in Jesus Christ",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 219,
      title: "Because I Have Been Given Much",
    },
    closingPrayer: "Brother Moore",
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "general",
    presiding: "President Carter",
    conducting: "Sister Lee",
    announcements: ["Summer youth conference registration"],
    openingHymn: {
      number: 66,
      title: "Rejoice, the Lord Is King!",
    },
    openingPrayer: "Brother Young",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 172,
      title: "In Humility, Our Savior",
    },
    speakers: [
      {
        name: "Sister Peterson",
        topic: "The Importance of Prayer",
        type: "speaker",
      },
      {
        name: "Brother Walker",
        topic: "Serving Others",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 96,
      title: "Dearest Children, God Is Near You",
    },
    closingPrayer: "Sister Young",
  },
  {
    id: 6,
    date: "2026-08-30",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward activity next Saturday"],
    openingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of new Primary teachers",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Brother Anderson",
        topic: "Following the Savior",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 227,
      title: "There Is Sunshine in My Soul Today",
    },
    closingPrayer: "Brother Davis",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}