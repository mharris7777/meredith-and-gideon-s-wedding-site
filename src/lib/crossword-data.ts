export type Direction = "across" | "down";
export type Entry = { id: string; number: number; answer: string; clue: string; row: number; col: number; direction: Direction; theme?: "wedding" };

export const puzzle: { rows: number; cols: number; entries: Entry[] } = {
  "rows": 23,
  "cols": 24,
  "entries": [
    {
      "answer": "DEVILINTHEWHITECITY",
      "clue": "Their favorite novel, centered around the Chicago World's Fair",
      "row": 14,
      "col": 4,
      "direction": "across",
      "number": 23,
      "id": "23-across"
    },
    {
      "answer": "AISLEBETHERE",
      "clue": "Wedding-day promise of attendance?",
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
      "row": 6,
      "col": 5,
      "direction": "across",
      "number": 13,
      "id": "13-across"
    },
    {
      "answer": "SEALEDWITHAKISS",
      "clue": "Made official at the altar—with a smooch?",
      "row": 2,
      "col": 20,
      "direction": "down",
      "number": 6,
      "id": "6-down",
      "theme": "wedding"
    },
    {
      "answer": "TIETHEKNOT",
      "clue": "Get hitched—or finish fastening a bow tie?",
      "row": 16,
      "col": 8,
      "direction": "across",
      "number": 25,
      "id": "25-across",
      "theme": "wedding"
    },
    {
      "answer": "MATZOBALLSOUP",
      "clue": "Ultimate Comfort Food",
      "row": 0,
      "col": 6,
      "direction": "down",
      "number": 2,
      "id": "2-down"
    },
    {
      "answer": "PERFECTMATCH",
      "clue": "Ideal Couple, or an Alcaraz/Sinner Showdown",
      "row": 11,
      "col": 9,
      "direction": "across",
      "number": 18,
      "id": "18-across",
      "theme": "wedding"
    },
    {
      "answer": "LIVINGSTON",
      "clue": "Meredith’s Previous Place of “Living”",
      "row": 13,
      "col": 9,
      "direction": "down",
      "number": 22,
      "id": "22-down"
    },
    {
      "answer": "URBANSTUDIES",
      "clue": "What they both studied in undergrad",
      "row": 22,
      "col": 5,
      "direction": "across",
      "number": 31,
      "id": "31-across"
    },
    {
      "answer": "WEDDING",
      "clue": "Big day linking the four wedding-wordplay answers",
      "row": 9,
      "col": 16,
      "direction": "across",
      "number": 17,
      "id": "17-across",
      "theme": "wedding"
    },
    {
      "answer": "MEXICOCITY",
      "clue": "Their favorite city",
      "row": 11,
      "col": 16,
      "direction": "down",
      "number": 19,
      "id": "19-down"
    },
    {
      "answer": "DEMAREST",
      "clue": "Where they'll do their \"I do\"s",
      "row": 14,
      "col": 4,
      "direction": "down",
      "number": 23,
      "id": "23-down"
    },
    {
      "answer": "HANOIHOUSE",
      "clue": "Where they’re regulars",
      "row": 0,
      "col": 9,
      "direction": "down",
      "number": 3,
      "id": "3-down"
    },
    {
      "answer": "BILLS",
      "clue": "Pegula’s pride",
      "row": 4,
      "col": 8,
      "direction": "across",
      "number": 10,
      "id": "10-across"
    },
    {
      "answer": "TENAFLY",
      "clue": "Tiger Town",
      "row": 19,
      "col": 16,
      "direction": "across",
      "number": 30,
      "id": "30-across"
    },
    {
      "answer": "BEYONCE",
      "clue": "Meredith’s Queen",
      "row": 3,
      "col": 17,
      "direction": "down",
      "number": 8,
      "id": "8-down"
    },
    {
      "answer": "STUYTOWN",
      "clue": "Their ride or die (town)",
      "row": 2,
      "col": 2,
      "direction": "across",
      "number": 4,
      "id": "4-across"
    },
    {
      "answer": "HAMILTON",
      "clue": "The Ten-Dollar, Founding Father",
      "row": 0,
      "col": 9,
      "direction": "across",
      "number": 3,
      "id": "3-across"
    },
    {
      "answer": "ORANGE",
      "clue": "Gideon’s favorite color comes with a peel",
      "row": 17,
      "col": 2,
      "direction": "across",
      "number": 26,
      "id": "26-across"
    },
    {
      "answer": "YANKEES",
      "clue": "Gideon’s team in pinstripes",
      "row": 9,
      "col": 0,
      "direction": "across",
      "number": 16,
      "id": "16-across"
    },
    {
      "answer": "BARNARD",
      "clue": "Where Meredith went from having 2 Sisters to Seven",
      "row": 8,
      "col": 1,
      "direction": "down",
      "number": 15,
      "id": "15-down"
    },
    {
      "answer": "DRAKE",
      "clue": "Gideon’s favorite celebrity started from the bottom",
      "row": 17,
      "col": 19,
      "direction": "down",
      "number": 27,
      "id": "27-down"
    },
    {
      "answer": "JAYZ",
      "clue": "Their best celebrity encounter",
      "row": 12,
      "col": 22,
      "direction": "down",
      "number": 21,
      "id": "21-down"
    },
    {
      "answer": "SINGING",
      "clue": "Meredith’s talent that’s worth making a note of",
      "row": 2,
      "col": 15,
      "direction": "down",
      "number": 5,
      "id": "5-down"
    },
    {
      "answer": "PAROS",
      "clue": "Proposal Place",
      "row": 12,
      "col": 0,
      "direction": "across",
      "number": 20,
      "id": "20-across"
    },
    {
      "answer": "USOPEN",
      "clue": "The other best part of Labor Day Weekend",
      "row": 15,
      "col": 2,
      "direction": "down",
      "number": 24,
      "id": "24-down"
    },
    {
      "answer": "PIANO",
      "clue": "Where Gideon can strike a chord",
      "row": 4,
      "col": 2,
      "direction": "across",
      "number": 9,
      "id": "9-across"
    },
    {
      "answer": "JAPAN",
      "clue": "Half of their highly anticipated honeymoon",
      "row": 4,
      "col": 19,
      "direction": "across",
      "number": 11,
      "id": "11-across"
    },
    {
      "answer": "DOG",
      "clue": "Favorite four-legged friend",
      "row": 7,
      "col": 22,
      "direction": "down",
      "number": 14,
      "id": "14-down"
    },
    {
      "answer": "BBYO",
      "clue": "Four letters at the start of their love story",
      "row": 17,
      "col": 22,
      "direction": "down",
      "number": 28,
      "id": "28-down"
    },
    {
      "answer": "PENN",
      "clue": "Gideon’s Ivy",
      "row": 2,
      "col": 23,
      "direction": "down",
      "number": 7,
      "id": "7-down"
    },
    {
      "answer": "FOUR",
      "clue": "Meredith’s nieces and nephews count",
      "row": 19,
      "col": 6,
      "direction": "down",
      "number": 29,
      "id": "29-down"
    },
    {
      "answer": "JTS",
      "clue": "Three more letters in Meredith’s education",
      "row": 0,
      "col": 2,
      "direction": "down",
      "number": 1,
      "id": "1-down"
    }
  ]
};
