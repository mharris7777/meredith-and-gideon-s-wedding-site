export type Direction = "across" | "down";
export type Entry = { id: string; number: number; answer: string; clue: string; row: number; col: number; direction: Direction; theme?: "wedding" };

export const puzzle: { rows: number; cols: number; entries: Entry[] } = {
  "rows": 23,
  "cols": 29,
  "entries": [
    {
      "answer": "FOUR",
      "clue": "Meredith’s nieces and nephews count",
      "row": 17,
      "col": 11,
      "direction": "down",
      "number": 28,
      "id": "28-down"
    },
    {
      "answer": "URBANSTUDIES",
      "clue": "What we share degrees In (G&M - College Major)",
      "row": 20,
      "col": 10,
      "direction": "across",
      "number": 30,
      "id": "30-across"
    },
    {
      "answer": "LIVINGSTON",
      "clue": "Meredith’s Previous Place of “Living”",
      "row": 11,
      "col": 14,
      "direction": "down",
      "number": 18,
      "id": "18-down"
    },
    {
      "answer": "DEVILINTHEWHITECITY",
      "clue": "Chicago World's Fair Tale (G&M - Book)",
      "row": 12,
      "col": 9,
      "direction": "across",
      "number": 20,
      "id": "20-across"
    },
    {
      "answer": "AISLEBETHERE",
      "clue": "Wedding-day promise of attendance?",
      "row": 3,
      "col": 18,
      "direction": "down",
      "number": 5,
      "id": "5-down",
      "theme": "wedding"
    },
    {
      "answer": "SEALEDWITHAKISS",
      "clue": "Made official at the altar—with a smooch?",
      "row": 0,
      "col": 25,
      "direction": "down",
      "number": 1,
      "id": "1-down",
      "theme": "wedding"
    },
    {
      "answer": "TIETHEKNOT",
      "clue": "Make it official/keep your shoelaces from coming undone",
      "row": 14,
      "col": 13,
      "direction": "across",
      "number": 23,
      "id": "23-across",
      "theme": "wedding"
    },
    {
      "answer": "PERFECTMATCH",
      "clue": "Ideal Couple, or an Alcaraz/Sinner Showdown",
      "row": 9,
      "col": 14,
      "direction": "across",
      "number": 14,
      "id": "14-across",
      "theme": "wedding"
    },
    {
      "answer": "WEDDING",
      "clue": "Big day linking the four wedding-wordplay answers",
      "row": 7,
      "col": 21,
      "direction": "across",
      "number": 13,
      "id": "13-across",
      "theme": "wedding"
    },
    {
      "answer": "MEXICOCITY",
      "clue": "Their favorite city",
      "row": 9,
      "col": 21,
      "direction": "down",
      "number": 15,
      "id": "15-down"
    },
    {
      "answer": "DEMAREST",
      "clue": "Where they'll do their \"I do\"s",
      "row": 12,
      "col": 9,
      "direction": "down",
      "number": 20,
      "id": "20-down"
    },
    {
      "answer": "TENAFLY",
      "clue": "Tiger Town",
      "row": 17,
      "col": 21,
      "direction": "across",
      "number": 29,
      "id": "29-across"
    },
    {
      "answer": "BEYONCE",
      "clue": "Meredith’s Queen",
      "row": 1,
      "col": 22,
      "direction": "down",
      "number": 3,
      "id": "3-down"
    },
    {
      "answer": "ORANGE",
      "clue": "Hard word to rhyme (G - Color)",
      "row": 15,
      "col": 7,
      "direction": "across",
      "number": 24,
      "id": "24-across"
    },
    {
      "answer": "DRAKE",
      "clue": "Do it for the Graham (G - Celebrity)",
      "row": 15,
      "col": 24,
      "direction": "down",
      "number": 25,
      "id": "25-down"
    },
    {
      "answer": "JAYZ",
      "clue": "Their best celebrity encounter",
      "row": 10,
      "col": 27,
      "direction": "down",
      "number": 17,
      "id": "17-down"
    },
    {
      "answer": "USOPEN",
      "clue": "The other best part of Labor Day Weekend",
      "row": 13,
      "col": 7,
      "direction": "down",
      "number": 22,
      "id": "22-down"
    },
    {
      "answer": "JAPAN",
      "clue": "Honeymoon Locale",
      "row": 2,
      "col": 24,
      "direction": "across",
      "number": 4,
      "id": "4-across"
    },
    {
      "answer": "DOG",
      "clue": "Favorite four-legged friend",
      "row": 5,
      "col": 27,
      "direction": "down",
      "number": 9,
      "id": "9-down"
    },
    {
      "answer": "BBYO",
      "clue": "Four letters at the start of their love story",
      "row": 15,
      "col": 27,
      "direction": "down",
      "number": 26,
      "id": "26-down"
    },
    {
      "answer": "PENN",
      "clue": "Gideon’s Ivy",
      "row": 0,
      "col": 28,
      "direction": "down",
      "number": 2,
      "id": "2-down"
    },
    {
      "answer": "JTS",
      "clue": "Three more letters in Meredith’s education",
      "row": 6,
      "col": 0,
      "direction": "across",
      "number": 10,
      "id": "10-across"
    },
    {
      "answer": "STUYTOWN",
      "clue": "Home",
      "row": 6,
      "col": 2,
      "direction": "down",
      "number": 11,
      "id": "11-down"
    },
    {
      "answer": "MATZOBALLSOUP",
      "clue": "Ultimate Comfort Food",
      "row": 10,
      "col": 0,
      "direction": "across",
      "number": 16,
      "id": "16-across"
    },
    {
      "answer": "HANOIHOUSE",
      "clue": "Where we're regulars",
      "row": 13,
      "col": 0,
      "direction": "across",
      "number": 21,
      "id": "21-across"
    },
    {
      "answer": "BILLS",
      "clue": "Go _____ (G - Football Team)",
      "row": 12,
      "col": 4,
      "direction": "down",
      "number": 19,
      "id": "19-down"
    },
    {
      "answer": "HAMILTON",
      "clue": "$10 Founding Father (G&M - Show)",
      "row": 13,
      "col": 0,
      "direction": "down",
      "number": 21,
      "id": "21-down"
    },
    {
      "answer": "YANKEES",
      "clue": "Bronx Bombers (G - Baseball Team)",
      "row": 4,
      "col": 9,
      "direction": "down",
      "number": 6,
      "id": "6-down"
    },
    {
      "answer": "BARNARD",
      "clue": "Morningside Heights Site (M - College)",
      "row": 5,
      "col": 8,
      "direction": "across",
      "number": 8,
      "id": "8-across"
    },
    {
      "answer": "PAROS",
      "clue": "Proposal Place",
      "row": 4,
      "col": 12,
      "direction": "down",
      "number": 7,
      "id": "7-down"
    },
    {
      "answer": "PIANO",
      "clue": "Softly in Italian (G - Instrument)",
      "row": 6,
      "col": 4,
      "direction": "down",
      "number": 12,
      "id": "12-down"
    },
    {
      "answer": "SINGING",
      "clue": "Meredith’s talent that’s worth making a note of",
      "row": 16,
      "col": 19,
      "direction": "down",
      "number": 27,
      "id": "27-down"
    }
  ]
};
