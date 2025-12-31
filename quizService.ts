import { Subject, Difficulty, Question } from '../types';

// Fix: Moved question data into separate constants to avoid self-referencing during initialization.
const engineeringMathematicsQuestions: Record<Difficulty, Question[]> = {
  [Difficulty.Easy]: [
    { id: 1, question: 'What is the determinant of a 2x2 matrix [[a, b], [c, d]]?', options: ['ad-bc', 'ac-bd', 'ab-cd', 'ad+bc'], correctAnswerIndex: 0, explanation: 'The determinant of a 2x2 matrix is calculated as ad-bc.' },
    { id: 2, question: 'The derivative of x^n is:', options: ['n*x^(n-1)', 'x^n / n', 'n*x^(n+1)', 'x^(n-1)'], correctAnswerIndex: 0, explanation: 'The power rule of differentiation states that d/dx(x^n) = n*x^(n-1).'},
  ],
  [Difficulty.Medium]: [
    { id: 1, question: 'What is the rank of the matrix [[1, 2, 3], [2, 4, 6], [3, 6, 9]]?', options: ['1', '2', '3', '0'], correctAnswerIndex: 0, explanation: 'All rows are multiples of the first row, so the rank is 1.' },
    { id: 2, question: 'Evaluate the integral of sin(x) from 0 to pi.', options: ['2', '0', '1', '-1'], correctAnswerIndex: 0, explanation: 'The integral of sin(x) is -cos(x). Evaluating from 0 to pi gives -cos(pi) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2.' },
  ],
  [Difficulty.Hard]: [
    { id: 1, question: 'Find the eigenvalues of the matrix [[2, -1], [4, -3]].', options: ['1, -2', '-1, 2', '1, 2', '-1, -2'], correctAnswerIndex: 0, explanation: 'The characteristic equation is (2-λ)(-3-λ) - (-1)(4) = 0, which simplifies to λ^2 + λ - 2 = 0. The roots are λ=1 and λ=-2.' },
    { id: 2, question: 'Solve the differential equation dy/dx = y with y(0)=1.', options: ['y = e^x', 'y = e^-x', 'y = sin(x)', 'y = cos(x)'], correctAnswerIndex: 0, explanation: 'This is a separable differential equation. Integrating dy/y = dx gives ln|y| = x + C. With y(0)=1, we get C=0, so y=e^x.' },
  ],
};

const strengthOfMaterialsQuestions: Record<Difficulty, Question[]> = {
  [Difficulty.Easy]: [
      { id: 1, question: 'What does Hooke\'s Law state?', options: ['Stress is proportional to strain', 'Stress is inversely proportional to strain', 'Stress is constant', 'Strain is constant'], correctAnswerIndex: 0, explanation: 'Hooke\'s Law states that for small deformations, stress is directly proportional to strain within the elastic limit.' },
      { id: 2, question: 'The unit of stress is the same as that of:', options: ['Pressure', 'Force', 'Strain', 'Work'], correctAnswerIndex: 0, explanation: 'Stress (Force/Area) and Pressure (Force/Area) share the same units, typically Pascals (Pa) or N/m^2.'},
  ],
  [Difficulty.Medium]: [
      { id: 1, question: 'What is the point of contraflexure?', options: ['Point where Bending Moment is zero', 'Point where Shear Force is zero', 'Point of maximum bending moment', 'Point of maximum shear force'], correctAnswerIndex: 0, explanation: 'The point of contraflexure in a beam is the point where the bending moment changes its sign, which means it is zero at that point.' },
      { id: 2, question: 'Poisson\'s ratio is the ratio of:', options: ['Lateral strain to longitudinal strain', 'Longitudinal strain to lateral strain', 'Stress to strain', 'Shear stress to shear strain'], correctAnswerIndex: 0, explanation: 'Poisson\'s ratio is a measure of the Poisson effect, the phenomenon in which a material tends to expand in directions perpendicular to the direction of compression.'},
  ],
  [Difficulty.Hard]: [
      { id: 1, question: 'For a thin-walled spherical shell subjected to internal pressure, the circumferential stress is:', options: ['pd/4t', 'pd/2t', 'pd/t', '2pd/t'], correctAnswerIndex: 0, explanation: 'The circumferential or hoop stress in a thin-walled spherical shell is given by the formula σ = pd/4t, where p is pressure, d is diameter, and t is thickness.' },
      { id: 2, question: 'The maximum shear stress theory is also known as:', options: ['Tresca\'s theory', 'Rankine\'s theory', 'Von Mises theory', 'St. Venant\'s theory'], correctAnswerIndex: 0, explanation: 'The maximum shear stress theory, which states that yielding begins when the maximum shear stress reaches the maximum shear stress in a simple tension test, is also known as Tresca\'s theory.'},
  ],
};

const questionsBank: Record<Subject, Record<Difficulty, Question[]>> = {
  [Subject.EngineeringMathematics]: engineeringMathematicsQuestions,
  [Subject.StrengthOfMaterials]: strengthOfMaterialsQuestions,
  // Add mock data for other subjects similarly
  [Subject.EngineeringMechanics]: strengthOfMaterialsQuestions,
  [Subject.TheoryOfMachines]: engineeringMathematicsQuestions,
  [Subject.FluidMechanics]: strengthOfMaterialsQuestions,
  [Subject.HeatTransfer]: engineeringMathematicsQuestions,
  [Subject.ManufacturingEngineering]: strengthOfMaterialsQuestions,
};

export const getQuestions = (subject: Subject, difficulty: Difficulty): Question[] => {
  return questionsBank[subject]?.[difficulty] || [];
};