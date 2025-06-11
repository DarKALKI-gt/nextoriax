const subjects = {
  Mathematics: [
    { q: "What is the derivative of tan(x)?", a: "sec²(x)", options: ["sec²(x)", "cos²(x)", "-sin(x)", "cosec²(x)"] },
    { q: "∫ 1/x dx equals?", a: "ln|x| + C", options: ["ln|x| + C", "x + C", "1/x + C", "x²/2 + C"] },
    { q: "What is the determinant of a 2x2 matrix [[a, b], [c, d]]?", a: "ad - bc", options: ["ab + cd", "a + d", "ad - bc", "ac - bd"] },
    { q: "What is the inverse of sin(x)?", a: "sin⁻¹(x)", options: ["cos(x)", "1/sin(x)", "sin⁻¹(x)", "-sin(x)"] },
    { q: "If A is a 2×2 matrix and |A| = 0, then A is?", a: "Singular", options: ["Singular", "Invertible", "Symmetric", "Identity"] },
  ],
  Hindi: [
    { q: "'Prayas' ka vilom kya hai?", a: "Aalas", options: ["Aalas", "Sahas", "Mehnat", "Prarthana"] },
    { q: "'Vidyarthi' ka paryayvachi?", a: "Chhatra", options: ["Adhyapak", "Chhatra", "Pustak", "Pathshala"] },
    { q: "'Satya' kis ling ka shabd hai?", a: "Napunsakling", options: ["Pulling", "Striling", "Napunsakling", "Anishchit"] },
    { q: "'Bharat' kis vachan mein hai?", a: "Ekvachan", options: ["Bahuvachan", "Ekvachan", "Dvivachan", "Kriya"] },
    { q: "'Aakash' ka vilom kya hai?", a: "Prithvi", options: ["Pawan", "Prithvi", "Pani", "Surya"] },
  ],
  English: [
    { q: "Antonym of 'Generous'?", a: "Stingy", options: ["Kind", "Stingy", "Polite", "Careful"] },
    { q: "Correct passive form: 'He writes a letter.'", a: "A letter is written by him.", options: ["He is written a letter.", "A letter is written by him.", "A letter was wrote by him.", "A letter writes him."] },
    { q: "Identify the adjective: 'The tall boy ran fast.'", a: "Tall", options: ["Boy", "Ran", "Fast", "Tall"] },
    { q: "Choose the correct spelling:", a: "Accommodate", options: ["Acomodate", "Accomodate", "Acommodate", "Accommodate"] },
    { q: "Synonym of 'Brilliant'?", a: "Intelligent", options: ["Shiny", "Bright", "Intelligent", "Dull"] },
  ],
  Physics: [
    { q: "SI unit of electric current?", a: "Ampere", options: ["Volt", "Ohm", "Ampere", "Watt"] },
    { q: "Newton's Second Law is expressed as?", a: "F = ma", options: ["F = ma", "F = mv", "F = mgh", "F = qE"] },
    { q: "Speed of light in vacuum?", a: "3 × 10^8 m/s", options: ["3 × 10^6 m/s", "3 × 10^8 m/s", "3 × 10^10 m/s", "3 × 10^5 m/s"] },
    { q: "Work done is zero when angle between force and displacement is?", a: "90°", options: ["0°", "45°", "90°", "180°"] },
    { q: "Which of these is not a vector quantity?", a: "Speed", options: ["Force", "Acceleration", "Velocity", "Speed"] },
  ],
  Chemistry: [
    { q: "Atomic number of Carbon?", a: "6", options: ["12", "14", "6", "8"] },
    { q: "pH value of neutral solution?", a: "7", options: ["0", "7", "14", "1"] },
    { q: "Chemical formula of washing soda?", a: "Na₂CO₃", options: ["NaHCO₃", "Na₂CO₃", "CaCO₃", "NaCl"] },
    { q: "Which element is a noble gas?", a: "Neon", options: ["Oxygen", "Nitrogen", "Chlorine", "Neon"] },
    { q: "Which of the following is a strong acid?", a: "HCl", options: ["CH₃COOH", "H₂CO₃", "HCl", "H₂O"] },
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
  
}
);
