export type Direction = "across" | "down";
export type Entry = { id: string; number: number; answer: string; clue: string; row: number; col: number; direction: Direction; theme?: "wedding" };

export const puzzle: { rows: number; cols: number; entries: Entry[] } = {
  "rows": 22,
  "cols": 24,
  "entries": [
    {
      "answer": "SEALEDWITHAKISS",
      "clue": "Made official at the altar—with a smooch?",
      "row": 11,
      "col": 9,
      "direction": "across",
      "number": 19,
      "id": "19-across",
      "theme": "wedding"
    },
    {
      "answer": "DEVILINTHEWHITECITY",
      "clue": "Favorite Larson book pairing a fair with foul play",
      "row": 2,
      "col": 10,
      "direction": "down",
      "number": 5,
      "id": "5-down"
    },
    {
      "answer": "TAKETHEPLUNGE",
      "clue": "Say “I do”—or jump into the deep end?",
      "row": 5,
      "col": 13,
      "direction": "down",
      "number": 12,
      "id": "12-down",
      "theme": "wedding"
    },
    {
      "answer": "LAMBORGHINI",
      "clue": "\"Mercy\" car - Gideon's dream",
      "row": 13,
      "col": 13,
      "direction": "across",
      "number": 22,
      "id": "22-across"
    },
    {
      "answer": "PERFECTMATCH",
      "clue": "Ideal couple—or just the thing to light a unity candle?",
      "row": 9,
      "col": 4,
      "direction": "across",
      "number": 15,
      "id": "15-across",
      "theme": "wedding"
    },
    {
      "answer": "URBANSTUDIES",
      "clue": "What they both studied in undergrad",
      "row": 19,
      "col": 4,
      "direction": "across",
      "number": 29,
      "id": "29-across"
    },
    {
      "answer": "HANOIHOUSE",
      "clue": "Where they’re regulars",
      "row": 12,
      "col": 4,
      "direction": "down",
      "number": 21,
      "id": "21-down"
    },
    {
      "answer": "MEXICOCITY",
      "clue": "Their favorite city",
      "row": 3,
      "col": 9,
      "direction": "across",
      "number": 7,
      "id": "7-across"
    },
    {
      "answer": "DEMAREST",
      "clue": "Where they'll do their \"I do\"s",
      "row": 5,
      "col": 6,
      "direction": "down",
      "number": 11,
      "id": "11-down"
    },
    {
      "answer": "MATZOBALLSOUP",
      "clue": "Ultimate Comfort Food",
      "row": 9,
      "col": 17,
      "direction": "down",
      "number": 16,
      "id": "16-down"
    },
    {
      "answer": "LIVINGSTON",
      "clue": "Meredith’s Previous Place of “Living”",
      "row": 10,
      "col": 21,
      "direction": "down",
      "number": 18,
      "id": "18-down"
    },
    {
      "answer": "BEYONCE",
      "clue": "Meredith’s Queen",
      "row": 15,
      "col": 8,
      "direction": "down",
      "number": 24,
      "id": "24-down"
    },
    {
      "answer": "TIETHEKNOT",
      "clue": "Get hitched—or finish fastening a bow tie?",
      "row": 5,
      "col": 13,
      "direction": "across",
      "number": 12,
      "id": "12-across",
      "theme": "wedding"
    },
    {
      "answer": "WEDDING",
      "clue": "Big day linking the four wedding-wordplay answers",
      "row": 16,
      "col": 0,
      "direction": "across",
      "number": 25,
      "id": "25-across",
      "theme": "wedding"
    },
    {
      "answer": "HAMILTON",
      "clue": "The Ten-Dollar, Founding Father",
      "row": 0,
      "col": 16,
      "direction": "down",
      "number": 1,
      "id": "1-down"
    },
    {
      "answer": "USOPEN",
      "clue": "Their favorite sporting event",
      "row": 21,
      "col": 14,
      "direction": "across",
      "number": 32,
      "id": "32-across"
    },
    {
      "answer": "SINGING",
      "clue": "Meredith’s talent that’s worth making a note of",
      "row": 0,
      "col": 20,
      "direction": "down",
      "number": 2,
      "id": "2-down"
    },
    {
      "answer": "PIANO",
      "clue": "Where Gideon can strike a chord",
      "row": 1,
      "col": 14,
      "direction": "across",
      "number": 3,
      "id": "3-across"
    },
    {
      "answer": "DRAKE",
      "clue": "Gideon’s favorite celebrity started from the bottom",
      "row": 12,
      "col": 1,
      "direction": "down",
      "number": 20,
      "id": "20-down"
    },
    {
      "answer": "BILLS",
      "clue": "Pegula’s pride",
      "row": 20,
      "col": 0,
      "direction": "across",
      "number": 31,
      "id": "31-across"
    },
    {
      "answer": "BARNARD",
      "clue": "Where Meredith went from having 2 Sisters to Seven",
      "row": 5,
      "col": 0,
      "direction": "across",
      "number": 10,
      "id": "10-across"
    },
    {
      "answer": "TENAFLY",
      "clue": "Tiger Town",
      "row": 17,
      "col": 12,
      "direction": "across",
      "number": 26,
      "id": "26-across"
    },
    {
      "answer": "STUYTOWN",
      "clue": "Their ride or die (town)",
      "row": 1,
      "col": 22,
      "direction": "down",
      "number": 4,
      "id": "4-down"
    },
    {
      "answer": "PENN",
      "clue": "Gideon’s Ivy",
      "row": 8,
      "col": 20,
      "direction": "across",
      "number": 14,
      "id": "14-across"
    },
    {
      "answer": "JAPAN",
      "clue": "Destination on Meredith’s wish list—and their honeymoon itinerary",
      "row": 14,
      "col": 0,
      "direction": "across",
      "number": 23,
      "id": "23-across"
    },
    {
      "answer": "PAROS",
      "clue": "Proposal Place",
      "row": 3,
      "col": 2,
      "direction": "down",
      "number": 6,
      "id": "6-down"
    },
    {
      "answer": "YANKEES",
      "clue": "Gideon’s team in pinstripes",
      "row": 4,
      "col": 8,
      "direction": "down",
      "number": 9,
      "id": "9-down"
    },
    {
      "answer": "JAYZ",
      "clue": "Their biggest celebrity encounter",
      "row": 4,
      "col": 4,
      "direction": "down",
      "number": 8,
      "id": "8-down"
    },
    {
      "answer": "BBYO",
      "clue": "Four letters at the start of their love story",
      "row": 18,
      "col": 1,
      "direction": "across",
      "number": 27,
      "id": "27-across"
    },
    {
      "answer": "DOG",
      "clue": "Their favorite animal is famously a best friend",
      "row": 19,
      "col": 12,
      "direction": "down",
      "number": 30,
      "id": "30-down"
    },
    {
      "answer": "ORANGE",
      "clue": "Gideon’s favorite color comes with a peel",
      "row": 9,
      "col": 19,
      "direction": "down",
      "number": 17,
      "id": "17-down"
    },
    {
      "answer": "FOUR",
      "clue": "Meredith’s nieces and nephews count",
      "row": 18,
      "col": 20,
      "direction": "across",
      "number": 28,
      "id": "28-across"
    },
    {
      "answer": "JTS",
      "clue": "Three more letters in Meredith’s education",
      "row": 7,
      "col": 0,
      "direction": "across",
      "number": 13,
      "id": "13-across"
    }
  ]
};
