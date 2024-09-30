import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for questions and options
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questionsData: Question[] = [
  {
      "id": 1,
      "question": "What is the time complexity of binary search?",
      "options": [
          "O(n)",
          "O(log n)",
          "O(n^2)",
          "O(1)"
      ],
      "correctAnswer": 1
  },
  {
      "id": 2,
      "question": "Which data structure is used for BFS traversal?",
      "options": [
          "Stack",
          "Queue",
          "Heap",
          "Graph"
      ],
      "correctAnswer": 1
  },
  {
      "id": 3,
      "question": "What is the space complexity of merge sort?",
      "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n log n)"
      ],
      "correctAnswer": 2
  },
  {
      "id": 4,
      "question": "Which of the following is not a stable sorting algorithm?",
      "options": [
          "Merge Sort",
          "Quick Sort",
          "Bubble Sort",
          "Insertion Sort"
      ],
      "correctAnswer": 1
  },
  {
      "id": 5,
      "question": "In a min-heap, for a node at index i, where is its parent located?",
      "options": [
          "i/2",
          "(i-1)/2",
          "i*2",
          "i-2"
      ],
      "correctAnswer": 1
  },
  {
      "id": 6,
      "question": "What is the best-case time complexity of Quick Sort?",
      "options": [
          "O(n)",
          "O(n log n)",
          "O(n^2)",
          "O(log n)"
      ],
      "correctAnswer": 1
  },
  {
      "id": 7,
      "question": "What is a self-balancing binary search tree?",
      "options": [
          "Heap",
          "Trie",
          "AVL Tree",
          "Graph"
      ],
      "correctAnswer": 2
  },
  {
      "id": 8,
      "question": "Which graph traversal algorithm uses a stack?",
      "options": [
          "BFS",
          "DFS",
          "Dijkstra",
          "A*"
      ],
      "correctAnswer": 1
  },
  {
      "id": 9,
      "question": "What is the time complexity of inserting a node in an AVL tree?",
      "options": [
          "O(log n)",
          "O(n log n)",
          "O(n)",
          "O(1)"
      ],
      "correctAnswer": 0
  },
  {
      "id": 10,
      "question": "Which data structure is used in the implementation of recursion?",
      "options": [
          "Queue",
          "Stack",
          "Heap",
          "Tree"
      ],
      "correctAnswer": 1
  },
  {
      "id": 11,
      "question": "Which sorting algorithm is best suited for nearly sorted arrays?",
      "options": [
          "Bubble Sort",
          "Insertion Sort",
          "Selection Sort",
          "Merge Sort"
      ],
      "correctAnswer": 1
  },
  {
      "id": 12,
      "question": "Which algorithm is used to find the shortest path in an unweighted graph?",
      "options": [
          "Dijkstra",
          "Floyd-Warshall",
          "Bellman-Ford",
          "BFS"
      ],
      "correctAnswer": 3
  },
  {
      "id": 13,
      "question": "Which of the following data structures allows duplicate elements?",
      "options": [
          "Set",
          "Stack",
          "Queue",
          "Priority Queue"
      ],
      "correctAnswer": 2
  },
  {
      "id": 14,
      "question": "What is the height of a complete binary tree with N nodes?",
      "options": [
          "log N",
          "N",
          "N log N",
          "N^2"
      ],
      "correctAnswer": 0
  },
  {
      "id": 15,
      "question": "In a binary search tree, which traversal gives the nodes in non-decreasing order?",
      "options": [
          "Preorder",
          "Postorder",
          "Inorder",
          "Level order"
      ],
      "correctAnswer": 2
  },
  {
      "id": 16,
      "question": "Which of the following algorithms is not used for pathfinding?",
      "options": [
          "A*",
          "Dijkstra",
          "DFS",
          "Prim's"
      ],
      "correctAnswer": 3
  },
  {
      "id": 17,
      "question": "Which of the following sorting algorithms is not comparison-based?",
      "options": [
          "Merge Sort",
          "Quick Sort",
          "Bubble Sort",
          "Radix Sort"
      ],
      "correctAnswer": 3
  },
  {
      "id": 18,
      "question": "What is the maximum number of edges in a simple graph with n vertices?",
      "options": [
          "n",
          "n^2",
          "n(n-1)/2",
          "n(n+1)/2"
      ],
      "correctAnswer": 2
  },
  {
      "id": 19,
      "question": "Which of the following algorithms is used for minimum spanning tree?",
      "options": [
          "Kruskal",
          "Dijkstra",
          "A*",
          "Floyd-Warshall"
      ],
      "correctAnswer": 0
  },
  {
      "id": 20,
      "question": "Which of the following is not an application of dynamic programming?",
      "options": [
          "Fibonacci sequence",
          "Longest common subsequence",
          "Binary search",
          "Knapsack problem"
      ],
      "correctAnswer": 2
  },
  {
      "id": 21,
      "question": "What is the time complexity of heapify in a binary heap?",
      "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n log n)"
      ],
      "correctAnswer": 1
  },
  {
      "id": 22,
      "question": "Which data structure is most suitable for implementing LRU cache?",
      "options": [
          "Array",
          "Linked List",
          "Queue",
          "Hash Map with Doubly Linked List"
      ],
      "correctAnswer": 3
  },
  {
      "id": 23,
      "question": "Which of the following algorithms is used to detect cycles in a graph?",
      "options": [
          "DFS",
          "BFS",
          "Kruskal",
          "Floyd-Warshall"
      ],
      "correctAnswer": 0
  },
  {
      "id": 24,
      "question": "Which of the following is a self-balancing binary search tree?",
      "options": [
          "Binary Heap",
          "B-Tree",
          "Red-Black Tree",
          "Hash Table"
      ],
      "correctAnswer": 2
  },
  {
      "id": 25,
      "question": "Which sorting algorithm is used in Timsort?",
      "options": [
          "Merge Sort",
          "Quick Sort",
          "Insertion Sort",
          "Both A and C"
      ],
      "correctAnswer": 3
  },
  {
      "id": 26,
      "question": "Which of the following problems can be solved using a greedy algorithm?",
      "options": [
          "0/1 Knapsack",
          "Travelling Salesman",
          "Prim's Algorithm",
          "Subset Sum"
      ],
      "correctAnswer": 2
  },
  {
      "id": 27,
      "question": "Which of the following data structures is not linear?",
      "options": [
          "Array",
          "Tree",
          "Queue",
          "Linked List"
      ],
      "correctAnswer": 1
  },
  {
      "id": 28,
      "question": "Which of the following is true for a full binary tree?",
      "options": [
          "Every node has 2 children",
          "All leaves are at the same level",
          "Every node has 0 or 2 children",
          "All internal nodes have 1 child"
      ],
      "correctAnswer": 2
  },
  {
      "id": 29,
      "question": "What is the best-case time complexity of selection sort?",
      "options": [
          "O(n)",
          "O(n log n)",
          "O(n^2)",
          "O(log n)"
      ],
      "correctAnswer": 2
  },
  {
      "id": 30,
      "question": "What is the time complexity of adding an element to a heap?",
      "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n log n)"
      ],
      "correctAnswer": 2
  },
  // The remaining questions will be added, focusing on various aptitude topics
  {
      "id": 31,
      "question": "What is the sum of the first 10 natural numbers?",
      "options": [
          "45",
          "55",
          "65",
          "75"
      ],
      "correctAnswer": 1
  },
  {
      "id": 32,
      "question": "If a train travels at 60 km/h and covers a distance of 120 km, how long does it take?",
      "options": [
          "1 hour",
          "2 hours",
          "3 hours",
          "4 hours"
      ],
      "correctAnswer": 1
  },
  {
      "id": 33,
      "question": "What is the next number in the series: 2, 4, 8, 16, ___?",
      "options": [
          "18",
          "20",
          "32",
          "64"
      ],
      "correctAnswer": 2
  },
  {
      "id": 34,
      "question": "What is the average of the numbers: 5, 10, 15, 20, and 25?",
      "options": [
          "10",
          "12",
          "15",
          "20"
      ],
      "correctAnswer": 2
  },
  {
      "id": 35,
      "question": "A car travels 150 km in 3 hours. What is its average speed?",
      "options": [
          "30 km/h",
          "50 km/h",
          "60 km/h",
          "70 km/h"
      ],
      "correctAnswer": 1
  },
  {
      "id": 36,
      "question": "What is the capital of France?",
      "options": [
          "Berlin",
          "Madrid",
          "Paris",
          "Rome"
      ],
      "correctAnswer": 2
  },
  {
      "id": 37,
      "question": "If x = 5 and y = 3, what is the value of x^2 + y^2?",
      "options": [
          "25",
          "34",
          "50",
          "64"
      ],
      "correctAnswer": 1
  },
  {
      "id": 38,
      "question": "What is the square root of 144?",
      "options": [
          "10",
          "11",
          "12",
          "13"
      ],
      "correctAnswer": 2
  },
  {
      "id": 39,
      "question": "What is 15% of 200?",
      "options": [
          "20",
          "25",
          "30",
          "35"
      ],
      "correctAnswer": 2
  },
  {
      "id": 40,
      "question": "What is the synonym of 'Happy'?",
      "options": [
          "Sad",
          "Joyful",
          "Angry",
          "Confused"
      ],
      "correctAnswer": 1
  },
  {
    "id": 41,
    "question": "A father is 5 times as old as his son. In 20 years, the father will be twice as old as his son. What is the father's current age?",
    "options": [
        "30",
        "40",
        "50",
        "60"
    ],
    "correctAnswer": 3
},
{
    "id": 42,
    "question": "What is the chemical symbol for the element Gold?",
    "options": [
        "Ag",
        "Au",
        "Pb",
        "Pt"
    ],
    "correctAnswer": 1
},
{
    "id": 43,
    "question": "If 3x + 4 = 19, what is the value of x?",
    "options": [
        "3",
        "4",
        "5",
        "6"
    ],
    "correctAnswer": 2
},
{
    "id": 44,
    "question": "Which planet is known as the Red Planet?",
    "options": [
        "Venus",
        "Mars",
        "Jupiter",
        "Saturn"
    ],
    "correctAnswer": 1
},
{
    "id": 45,
    "question": "A sum of money triples itself in 12 years at simple interest. What is the rate of interest per annum?",
    "options": [
        "10%",
        "12%",
        "16.67%",
        "20%"
    ],
    "correctAnswer": 2
},
{
    "id": 46,
    "question": "Which of the following is the largest prime number less than 20?",
    "options": [
        "13",
        "17",
        "19",
        "23"
    ],
    "correctAnswer": 2
},
{
    "id": 47,
    "question": "What is the missing number in the sequence: 2, 5, 10, 17, ___, 37?",
    "options": [
        "20",
        "26",
        "28",
        "30"
    ],
    "correctAnswer": 1
},
{
    "id": 48,
    "question": "In which year did World War II end?",
    "options": [
        "1939",
        "1940",
        "1943",
        "1945"
    ],
    "correctAnswer": 3
},
{
    "id": 49,
    "question": "What is the least common multiple (LCM) of 6 and 8?",
    "options": [
        "12",
        "16",
        "24",
        "48"
    ],
    "correctAnswer": 2
},
{
    "id": 50,
    "question": "Who wrote the play 'Hamlet'?",
    "options": [
        "William Wordsworth",
        "William Shakespeare",
        "John Keats",
        "Charles Dickens"
    ],
    "correctAnswer": 1
},
{
    "id": 51,
    "question": "What is the area of a rectangle with length 5 cm and width 3 cm?",
    "options": [
        "8 sq cm",
        "12 sq cm",
        "15 sq cm",
        "20 sq cm"
    ],
    "correctAnswer": 2
},
{
    "id": 52,
    "question": "In a right triangle, what is the length of the hypotenuse if the other two sides are 6 cm and 8 cm?",
    "options": [
        "7 cm",
        "10 cm",
        "12 cm",
        "14 cm"
    ],
    "correctAnswer": 1
},
{
    "id": 53,
    "question": "If the ratio of boys to girls in a class is 3:2, and there are 18 boys, how many girls are there?",
    "options": [
        "9",
        "10",
        "12",
        "15"
    ],
    "correctAnswer": 2
},
{
    "id": 54,
    "question": "What is the value of 2^5?",
    "options": [
        "16",
        "24",
        "32",
        "64"
    ],
    "correctAnswer": 2
},
{
    "id": 55,
    "question": "Which gas is most abundant in the Earth's atmosphere?",
    "options": [
        "Oxygen",
        "Nitrogen",
        "Carbon Dioxide",
        "Hydrogen"
    ],
    "correctAnswer": 1
},
{
    "id": 56,
    "question": "If a book costs $30 after a 25% discount, what was the original price?",
    "options": [
        "$35",
        "$36",
        "$40",
        "$50"
    ],
    "correctAnswer": 2
},
{
    "id": 57,
    "question": "In which direction does the sun rise?",
    "options": [
        "North",
        "South",
        "East",
        "West"
    ],
    "correctAnswer": 2
},
{
    "id": 58,
    "question": "What is the perimeter of a square with side length 7 cm?",
    "options": [
        "21 cm",
        "28 cm",
        "35 cm",
        "49 cm"
    ],
    "correctAnswer": 1
},
{
    "id": 59,
    "question": "Which is the largest continent in the world by area?",
    "options": [
        "Africa",
        "Asia",
        "Europe",
        "North America"
    ],
    "correctAnswer": 1
},
{
    "id": 60,
    "question": "If a person travels at a speed of 45 km/h and covers a distance of 135 km, how much time does it take?",
    "options": [
        "1 hour",
        "2 hours",
        "3 hours",
        "4 hours"
    ],
    "correctAnswer": 2
}
,
{
  "id": 61,
  "question": "What is the square of 15?",
  "options": [
      "200",
      "210",
      "225",
      "250"
  ],
  "correctAnswer": 2
},
{
  "id": 62,
  "question": "Who invented the telephone?",
  "options": [
      "Thomas Edison",
      "Alexander Graham Bell",
      "Nikola Tesla",
      "Albert Einstein"
  ],
  "correctAnswer": 1
},
{
  "id": 63,
  "question": "If a triangle has angles of 30° and 60°, what is the measure of the third angle?",
  "options": [
      "30°",
      "60°",
      "90°",
      "120°"
  ],
  "correctAnswer": 2
},
{
  "id": 64,
  "question": "Which is the smallest prime number?",
  "options": [
      "0",
      "1",
      "2",
      "3"
  ],
  "correctAnswer": 2
},
{
  "id": 65,
  "question": "How many sides does a hexagon have?",
  "options": [
      "4",
      "5",
      "6",
      "8"
  ],
  "correctAnswer": 2
},
{
  "id": 66,
  "question": "If you reverse the digits of the number 132, what is the result?",
  "options": [
      "123",
      "231",
      "312",
      "321"
  ],
  "correctAnswer": 3
},
{
  "id": 67,
  "question": "Which planet is known as the 'Morning Star'?",
  "options": [
      "Mars",
      "Venus",
      "Jupiter",
      "Saturn"
  ],
  "correctAnswer": 1
},
{
  "id": 68,
  "question": "In which country is the Eiffel Tower located?",
  "options": [
      "Italy",
      "Spain",
      "France",
      "Germany"
  ],
  "correctAnswer": 2
},
{
  "id": 69,
  "question": "Which is the largest ocean on Earth?",
  "options": [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean"
  ],
  "correctAnswer": 3
},
{
  "id": 70,
  "question": "What is the value of π (pi) approximately?",
  "options": [
      "2.14",
      "3.14",
      "3.24",
      "3.44"
  ],
  "correctAnswer": 1
},
{
  "id": 71,
  "question": "If you have 4 apples and you give away 2, how many apples do you have left?",
  "options": [
      "0",
      "1",
      "2",
      "4"
  ],
  "correctAnswer": 2
},
{
  "id": 72,
  "question": "What is the capital of Japan?",
  "options": [
      "Beijing",
      "Seoul",
      "Bangkok",
      "Tokyo"
  ],
  "correctAnswer": 3
},
{
  "id": 73,
  "question": "Which number is a perfect square?",
  "options": [
      "10",
      "15",
      "25",
      "30"
  ],
  "correctAnswer": 2
},
{
  "id": 74,
  "question": "What is the full form of CPU in computers?",
  "options": [
      "Central Process Unit",
      "Central Processing Unit",
      "Control Process Unit",
      "Control Processing Unit"
  ],
  "correctAnswer": 1
},
{
  "id": 75,
  "question": "Which month has 28 days in a common year?",
  "options": [
      "February",
      "April",
      "June",
      "All months"
  ],
  "correctAnswer": 3
},
{
  "id": 76,
  "question": "What is the perimeter of a circle known as?",
  "options": [
      "Radius",
      "Diameter",
      "Circumference",
      "Area"
  ],
  "correctAnswer": 2
},
{
  "id": 77,
  "question": "If a dice is thrown, what is the probability of getting a number greater than 4?",
  "options": [
      "1/3",
      "1/2",
      "2/3",
      "1/6"
  ],
  "correctAnswer": 1
},
{
  "id": 78,
  "question": "Which element is represented by the symbol 'O' in the periodic table?",
  "options": [
      "Osmium",
      "Oxygen",
      "Gold",
      "Carbon"
  ],
  "correctAnswer": 1
},
{
  "id": 79,
  "question": "How many degrees are there in a right angle?",
  "options": [
      "45°",
      "90°",
      "120°",
      "180°"
  ],
  "correctAnswer": 1
},
{
  "id": 80,
  "question": "Which word is the antonym of 'Difficult'?",
  "options": [
      "Complex",
      "Hard",
      "Easy",
      "Tough"
  ],
  "correctAnswer": 2
},
{
  "id": 81,
  "question": "Who is known as the father of computers?",
  "options": [
      "Bill Gates",
      "Charles Babbage",
      "Steve Jobs",
      "Alan Turing"
  ],
  "correctAnswer": 1
},
{
  "id": 82,
  "question": "If the average of three numbers is 20 and the first two numbers are 18 and 22, what is the third number?",
  "options": [
      "20",
      "18",
      "22",
      "24"
  ],
  "correctAnswer": 0
},
{
  "id": 83,
  "question": "What is the square root of 169?",
  "options": [
      "11",
      "12",
      "13",
      "14"
  ],
  "correctAnswer": 2
},
{
  "id": 84,
  "question": "What is the freezing point of water in degrees Celsius?",
  "options": [
      "0°C",
      "32°C",
      "100°C",
      "-10°C"
  ],
  "correctAnswer": 0
},
{
  "id": 85,
  "question": "What is the factorial of 5?",
  "options": [
      "25",
      "50",
      "120",
      "150"
  ],
  "correctAnswer": 2
},
{
  "id": 86,
  "question": "Which country is known as the Land of the Rising Sun?",
  "options": [
      "China",
      "India",
      "Japan",
      "Australia"
  ],
  "correctAnswer": 2
},
{
  "id": 87,
  "question": "If you multiply any number by zero, what will be the result?",
  "options": [
      "The number itself",
      "Zero",
      "One",
      "Negative of the number"
  ],
  "correctAnswer": 1
},
{
  "id": 88,
  "question": "Who wrote the novel 'Pride and Prejudice'?",
  "options": [
      "Jane Austen",
      "Charlotte Bronte",
      "Emily Bronte",
      "Charles Dickens"
  ],
  "correctAnswer": 0
},
{
  "id": 89,
  "question": "How many minutes are there in 3 hours?",
  "options": [
      "120",
      "150",
      "160",
      "180"
  ],
  "correctAnswer": 3
},
{
  "id": 90,
  "question": "Which is the longest river in the world?",
  "options": [
      "Amazon",
      "Nile",
      "Yangtze",
      "Mississippi"
  ],
  "correctAnswer": 1
},
{
  "id": 91,
  "question": "Which is the hottest planet in the solar system?",
  "options": [
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter"
  ],
  "correctAnswer": 1
},
{
  "id": 92,
  "question": "What is 5% of 2000?",
  "options": [
      "50",
      "100",
      "150",
      "200"
  ],
  "correctAnswer": 1
},
{
  "id": 93,
  "question": "Which shape has only one side?",
  "options": [
      "Square",
      "Triangle",
      "Circle",
      "Rectangle"
  ],
  "correctAnswer": 2
},
{
  "id": 94,
  "question": "How many continents are there in the world?",
  "options": [
      "5",
      "6",
      "7",
      "8"
  ],
  "correctAnswer": 2
},
{
  "id": 95,
  "question": "What is the boiling point of water in degrees Celsius?",
  "options": [
      "50°C",
      "75°C",
      "90°C",
      "100°C"
  ],
  "correctAnswer": 3
},
{
  "id": 96,
  "question": "How many vowels are there in the English alphabet?",
  "options": [
      "4",
      "5",
      "6",
      "7"
  ],
  "correctAnswer": 1
},
{
  "id": 97,
  "question": "What is the name of the currency used in Japan?",
  "options": [
      "Yuan",
      "Won",
      "Yen",
      "Dollar"
  ],
  "correctAnswer": 2
},
{
  "id": 98,
  "question": "Which gas do plants absorb from the atmosphere?",
  "options": [
      "Oxygen",
      "Nitrogen",
      "Carbon Dioxide",
      "Hydrogen"
  ],
  "correctAnswer": 2
},
{
  "id": 99,
  "question": "What is the result of 20 - (4 + 6)?",
  "options": [
      "10",
      "12",
      "14",
      "16"
  ],
  "correctAnswer": 0
},
{
  "id": 100,
  "question": "What is the synonym of 'Begin'?",
  "options": [
      "End",
      "Start",
      "Finish",
      "Close"
  ],
  "correctAnswer": 1
}
];


const Aptitude = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [results, setResults] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });

  useEffect(() => {
    handleStartQuiz();
  }, [numberOfQuestions]);

  const handleStartQuiz = () => {
    const shuffledQuestions = [...questionsData].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffledQuestions.slice(0, numberOfQuestions));
    setResponses(Array(numberOfQuestions).fill(-1));
    setShowResults(false);
  };

  const handleResponseChange = (questionIndex: number, optionIndex: number) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = optionIndex;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    const correctCount = selectedQuestions.reduce((acc, question, index) => {
      return acc + (question.correctAnswer === responses[index] ? 1 : 0);
    }, 0);
    const wrongCount = numberOfQuestions - correctCount;

    setResults({ correct: correctCount, wrong: wrongCount });
    setShowResults(true);
  };

  const chartData = {
    labels: ['Correct Answers', 'Wrong Answers'],
    datasets: [
      {
        data: [results.correct, results.wrong],
        backgroundColor: ['#4ade80', '#f87171'],
        hoverBackgroundColor: ['#22c55e', '#ef4444'],
      },
    ],
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  };

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'centre',
    marginBottom: '20px',
  };

  const selectStyle: React.CSSProperties = {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #3498db',
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    fontSize: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const questionGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    marginBottom: '20px',
  };

  const questionCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const questionStyle: React.CSSProperties = {
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#2c3e50',
  };

  const optionsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1px',
  };

  const optionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const checkboxStyle: React.CSSProperties = {
    marginRight: '10px',
  };

  const resultsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '20px',
  };

  const resultCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={containerStyle}
    >
      <h1 style={headerStyle}>Aptitude Quiz</h1>
      <div style={controlsStyle}>
        <select
          style={selectStyle}
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        >
          {[10, 15, 20, 25, 30].map((num) => (
            <option key={num} value={num}>
              {num} questions
            </option>
          ))}
        </select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={buttonStyle}
          onClick={handleStartQuiz}
        >
          Start New Quiz
        </motion.button>
      </div>

      {selectedQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={questionGridStyle}
        >
          {selectedQuestions.map((question, questionIndex) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: questionIndex * 0.1 }}
              style={questionCardStyle}
            >
              <p style={questionStyle}>{`${questionIndex + 1}. ${question.question}`}</p>
              <div style={optionsGridStyle}>
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} style={optionStyle}>
                    <input
                      type="checkbox"
                      style={checkboxStyle}
                      checked={responses[questionIndex] === optionIndex}
                      onChange={() => handleResponseChange(questionIndex, optionIndex)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </motion.div>
          ))}
          <motion.div
            style={{ textAlign: 'center', marginTop: '20px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button style={buttonStyle} onClick={handleSubmit}>
              Submit Quiz
            </button>
          </motion.div>
        </motion.div>
      )}

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={resultsGridStyle}
        >
          <div style={resultCardStyle}>
            <h2 style={{ marginBottom: '10px', color: '#2c3e50' }}>Results</h2>
            <p style={{ fontSize: '1.2rem', color: '#27ae60' }}>Correct Answers: {results.correct}</p>
            <p style={{ fontSize: '1.2rem', color: '#e74c3c' }}>Wrong Answers: {results.wrong}</p>
          </div>
          <div style={resultCardStyle}>
            <Pie data={chartData} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Aptitude;










