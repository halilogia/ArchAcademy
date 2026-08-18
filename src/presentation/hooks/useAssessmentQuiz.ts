import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { 
  Question, 
  QuizOption, 
  ArchetypeProfile, 
  interviewQuestions, 
  getArchetypeProfiles 
} from '../../data/assessmentQuestions';

export interface UseAssessmentQuizReturn {
  questions: Question[];
  currentQIndex: number;
  currentQ: Question;
  selectedOption: QuizOption | null;
  answers: { questionId: number; option: QuizOption }[];
  isCompleted: boolean;
  result: ArchetypeProfile | null;
  handleSelect: (opt: QuizOption) => void;
  handleNext: () => void;
  handleRestart: () => void;
}

export const useAssessmentQuiz = (isEn: boolean): UseAssessmentQuizReturn => {
  const { completeStep } = useProgress();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; option: QuizOption }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = interviewQuestions[currentQIndex];

  const handleSelect = (opt: QuizOption) => {
    if (selectedOption) return; // Prevent changing after selection
    setSelectedOption(opt);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const newAnswers = [...answers, { questionId: currentQ.id, option: selectedOption }];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQIndex + 1 < interviewQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      completeStep('/assessment');
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsCompleted(false);
  };

  const calculateResult = (): ArchetypeProfile => {
    const scores = { Architect: 0, Specialist: 0, OverKiller: 0, Junior: 0 };
    answers.forEach(a => {
      scores[a.option.score.type] += a.option.score.value;
    });

    let topType: keyof typeof scores = 'Architect';
    let maxScore = -1;
    (Object.keys(scores) as (keyof typeof scores)[]).forEach(k => {
      if (scores[k] > maxScore) {
        maxScore = scores[k];
        topType = k;
      }
    });

    const profiles = getArchetypeProfiles(isEn);
    return profiles[topType] || profiles.Architect;
  };

  const result = isCompleted ? calculateResult() : null;

  return {
    questions: interviewQuestions,
    currentQIndex,
    currentQ,
    selectedOption,
    answers,
    isCompleted,
    result,
    handleSelect,
    handleNext,
    handleRestart
  };
};
