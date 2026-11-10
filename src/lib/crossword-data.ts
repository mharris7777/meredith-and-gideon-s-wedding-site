export type Direction = "across" | "down";
export type Entry = { id: string; number: number; answer: string; clue: string; row: number; col: number; direction: Direction };

export const puzzle: { rows: number; cols: number; entries: Entry[] } = {
  "rows": 21,
  "cols": 21,
  "entries": [
    {
      "answer": "DEVILINTHEWHITECITY",
      "clue": "Favorite book (5 words)",
      "row": 10,
      "col": 1,
      "direction": "across",
      "number": 16,
      "id": "16-across"
    },
    {
      "answer": "MATZOBALLSOUP",
      "clue": "Meredith’s favorite Jewish food (3 words)",
      "row": 8,
      "col": 18,
      "direction": "down",
      "number": 14,
      "id": "14-down"
    },
    {
      "answer": "URBANSTUDIES",
      "clue": "College major for both (2 words)",
      "row": 17,
      "col": 7,
      "direction": "across",
      "number": 26,
      "id": "26-across"
    },
    {
      "answer": "MEXICOCITY",
      "clue": "Favorite city (2 words)",
      "row": 7,
      "col": 6,
      "direction": "down",
      "number": 13,
      "id": "13-down"
    },
    {
      "answer": "HAMILTON",
      "clue": "Broadway favorite",
      "row": 7,
      "col": 4,
      "direction": "across",
      "number": 12,
      "id": "12-across"
    },
    {
      "answer": "HANOIHOUSE",
      "clue": "Most visited restaurant (2 words)",
      "row": 1,
      "col": 10,
      "direction": "down",
      "number": 5,
      "id": "5-down"
    },
    {
      "answer": "LAMBORGHINI",
      "clue": "Gideon’s dream car",
      "row": 0,
      "col": 4,
      "direction": "down",
      "number": 1,
      "id": "1-down"
    },
    {
      "answer": "KNUCKLES",
      "clue": "Meredith’s pet peeve",
      "row": 3,
      "col": 9,
      "direction": "across",
      "number": 8,
      "id": "8-across"
    },
    {
      "answer": "STUYTOWN",
      "clue": "Where they live (2 words)",
      "row": 15,
      "col": 5,
      "direction": "across",
      "number": 21,
      "id": "21-across"
    },
    {
      "answer": "BEYONCE",
      "clue": "Meredith’s favorite celebrity",
      "row": 2,
      "col": 15,
      "direction": "down",
      "number": 6,
      "id": "6-down"
    },
    {
      "answer": "ORANGE",
      "clue": "Gideon’s favorite color",
      "row": 15,
      "col": 10,
      "direction": "down",
      "number": 22,
      "id": "22-down"
    },
    {
      "answer": "SINGING",
      "clue": "Meredith’s talent",
      "row": 5,
      "col": 6,
      "direction": "across",
      "number": 10,
      "id": "10-across"
    },
    {
      "answer": "LIVINGSTON",
      "clue": "Meredith’s hometown",
      "row": 12,
      "col": 10,
      "direction": "across",
      "number": 17,
      "id": "17-across"
    },
    {
      "answer": "BARNARD",
      "clue": "Meredith’s undergraduate college",
      "row": 14,
      "col": 14,
      "direction": "across",
      "number": 18,
      "id": "18-across"
    },
    {
      "answer": "TENAFLY",
      "clue": "Gideon’s hometown",
      "row": 9,
      "col": 2,
      "direction": "down",
      "number": 15,
      "id": "15-down"
    },
    {
      "answer": "DEMAREST",
      "clue": "Wedding location",
      "row": 1,
      "col": 1,
      "direction": "across",
      "number": 4,
      "id": "4-across"
    },
    {
      "answer": "YANKEES",
      "clue": "Gideon’s baseball team",
      "row": 6,
      "col": 13,
      "direction": "across",
      "number": 11,
      "id": "11-across"
    },
    {
      "answer": "JAYZ",
      "clue": "Most famous person they’ve met (hyphenated)",
      "row": 15,
      "col": 0,
      "direction": "across",
      "number": 20,
      "id": "20-across"
    },
    {
      "answer": "PENN",
      "clue": "Gideon’s college",
      "row": 0,
      "col": 6,
      "direction": "down",
      "number": 2,
      "id": "2-down"
    },
    {
      "answer": "BBYO",
      "clue": "Where they met",
      "row": 4,
      "col": 1,
      "direction": "across",
      "number": 9,
      "id": "9-across"
    },
    {
      "answer": "BILLS",
      "clue": "Gideon’s football team",
      "row": 4,
      "col": 1,
      "direction": "down",
      "number": 9,
      "id": "9-down"
    },
    {
      "answer": "DRAKE",
      "clue": "Gideon’s favorite celebrity",
      "row": 0,
      "col": 13,
      "direction": "down",
      "number": 3,
      "id": "3-down"
    },
    {
      "answer": "USOPEN",
      "clue": "Favorite sporting event (2 words)",
      "row": 20,
      "col": 6,
      "direction": "across",
      "number": 27,
      "id": "27-across"
    },
    {
      "answer": "JAPAN",
      "clue": "Meredith’s dream destination",
      "row": 15,
      "col": 0,
      "direction": "down",
      "number": 20,
      "id": "20-down"
    },
    {
      "answer": "PIANO",
      "clue": "Gideon’s instrument",
      "row": 17,
      "col": 0,
      "direction": "across",
      "number": 25,
      "id": "25-across"
    },
    {
      "answer": "PAROS",
      "clue": "Proposal destination",
      "row": 2,
      "col": 19,
      "direction": "down",
      "number": 7,
      "id": "7-down"
    },
    {
      "answer": "JTS",
      "clue": "Meredith’s other school",
      "row": 16,
      "col": 13,
      "direction": "down",
      "number": 24,
      "id": "24-down"
    },
    {
      "answer": "FOUR",
      "clue": "Number of Meredith’s nieces and nephews",
      "row": 16,
      "col": 4,
      "direction": "down",
      "number": 23,
      "id": "23-down"
    },
    {
      "answer": "DOG",
      "clue": "Favorite animal",
      "row": 14,
      "col": 20,
      "direction": "down",
      "number": 19,
      "id": "19-down"
    }
  ]
};
