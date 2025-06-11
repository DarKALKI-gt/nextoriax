const subjects = {
  Science: [
    { q: "What is the chemical formula of water?", a: "H2O", options: ["CO2", "H2O", "O2", "NaCl"] },
    { q: "Which gas is essential for breathing?", a: "Oxygen", options: ["Hydrogen", "Carbon Dioxide", "Oxygen", "Nitrogen"] },
    { q: "Electricity is measured in?", a: "Volts", options: ["Amps", "Volts", "Watts", "Joules"] },
    { q: "Which part of plant makes food?", a: "Leaves", options: ["Stem", "Root", "Leaves", "Flower"] },
    { q: "Acid turns litmus paper to?", a: "Red", options: ["Blue", "Green", "Red", "Yellow"] },
  ],
  Mathematics: [
    { q: "What is the square root of 144?", a: "12", options: ["10", "11", "12", "13"] },
    { q: "What is the value of Pi (approx)?", a: "3.14", options: ["3", "3.1", "3.14", "3.5"] },
    { q: "2x + 3 = 7, what is x?", a: "2", options: ["1", "2", "3", "4"] },
    { q: "What is the area of a square with side 5?", a: "25", options: ["10", "20", "25", "30"] },
    { q: "A triangle has how many sides?", a: "3", options: ["2", "3", "4", "5"] },
  ],
  "Social Studies": [
    { q: "Who was the first President of India?", a: "Dr. Rajendra Prasad", options: ["Mahatma Gandhi", "Nehru", "Dr. Rajendra Prasad", "APJ Abdul Kalam"] },
    { q: "Which revolution is associated with agriculture?", a: "Green Revolution", options: ["White", "Green", "Blue", "Yellow"] },
    { q: "Where is the Taj Mahal?", a: "Agra", options: ["Delhi", "Agra", "Mumbai", "Kolkata"] },
    { q: "Who wrote the Constitution of India?", a: "Dr. B.R. Ambedkar", options: ["Nehru", "Gandhi", "Ambedkar", "Tilak"] },
    { q: "Capital of Rajasthan?", a: "Jaipur", options: ["Udaipur", "Jaipur", "Jodhpur", "Ajmer"] },
  ],
  Hindi: [
    { q: "'Pustak' ka arth kya hai?", a: "Kitab", options: ["Patra", "Kagaz", "Kitab", "Shabd"] },
    { q: "'Surya' kis ling ka shabd hai?", a: "Pulling", options: ["Striling", "Pulling", "Napunsakling", "Nirdharit nahi"] },
    { q: "'Achha' ka vilom?", a: "Bura", options: ["Accha", "Bura", "Sundar", "Meetha"] },
    { q: "'Deshbhakti' ka prayog kis ke liye hota hai?", a: "Rashtra prem", options: ["Videsh", "Rashtra prem", "Sainya", "Bhasha"] },
    { q: "'Mehnat' ka paryayvachi?", a: "Shram", options: ["Kaam", "Shram", "Kary", "Bojh"] },
  ],
  English: [
    { q: "Synonym of 'Happy'?", a: "Joyful", options: ["Sad", "Joyful", "Tired", "Busy"] },
    { q: "Plural of 'Child'?", a: "Children", options: ["Childs", "Childrens", "Children", "Childer"] },
    { q: "Antonym of 'Cold'?", a: "Hot", options: ["Cool", "Warm", "Hot", "Freezing"] },
    { q: "Which is a noun?", a: "Table", options: ["Run", "Big", "Table", "Quickly"] },
    { q: "Correct spelling?", a: "Environment", options: ["Enviroment", "Environment", "Environmant", "Envirenment"] },
  ],
  Computer: [
    { q: "Full form of CPU?", a: "Central Processing Unit", options: ["Central Process Unit", "Central Processing Unit", "Control Power Unit", "Central Processor Use"] },
    { q: "Which is an input device?", a: "Keyboard", options: ["Monitor", "Printer", "Keyboard", "Speaker"] },
    { q: "HTML is used for?", a: "Web Development", options: ["Gaming", "Coding", "Web Development", "Data Entry"] },
    { q: "Save shortcut?", a: "Ctrl + S", options: ["Ctrl + P", "Ctrl + C", "Ctrl + V", "Ctrl + S"] },
    { q: "Which of these is software?", a: "MS Word", options: ["CPU", "Monitor", "Mouse", "MS Word"] },
  ]
};

const questionsDiv = document.getElementById('questions');

// Render questions
for (let subject in subjects) {
  const section = document.createElement('div');
  section.classList.add('subject');
  section.innerHTML = `<h2>${subject}</h2>`;

  subjects[subject].forEach((item, index) => {
    const qId = `${subject}_${index}`;
    let qHTML = `<div class="question"><p><strong>${item.q}</strong></p>`;
    item.options.forEach(opt => {
      qHTML += `<label><input type="radio" name="${qId}" value="${opt}" required> ${opt}</label><br>`;
    });
    qHTML += `</div>`;
    section.innerHTML += qHTML;
  });

  questionsDiv.appendChild(section);
}

// Handle result
document.getElementById('quizForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const resultData = {};

  for (let subject in subjects) {
    let correct = 0;
    subjects[subject].forEach((item, index) => {
      const qId = `${subject}_${index}`;
      const selected = document.querySelector(`input[name='${qId}']:checked`);
      if (selected && selected.value === item.a) correct++;
    });
    resultData[subject] = correct;
  }

  const sortedSubjects = Object.entries(resultData).sort((a, b) => b[1] - a[1]);

  let resultHTML = `<h2>Your Results:</h2><ul>`;
  sortedSubjects.forEach(([subject, score]) => {
    resultHTML += `<li><strong>${subject}</strong>: ${score}/5</li>`;
  });
  resultHTML += `</ul><h3>Top Subjects:</h3><ol>`;
  sortedSubjects.slice(0, 3).forEach(([s]) => {
    resultHTML += `<li>${s}</li>`;
  });
  resultHTML += `</ol>`;

  // Store top subjects
  const topSubjects = sortedSubjects.map(([subject]) => subject);
  localStorage.setItem("topSubjects", JSON.stringify(topSubjects));

  // Add next page button
  resultHTML += `<button onclick="window.location.href='fourpage.html'" class="next-btn">Next</button>`;

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = resultHTML;
  resultDiv.style.display = 'block';
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
