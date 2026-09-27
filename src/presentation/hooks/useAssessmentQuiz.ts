import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import {
  Question,
  QuizOption,
  ArchetypeProfile,
  interviewQuestions,
  getArchetypeProfiles
} from '../../data/assessmentQuestions';
import {
  ArchetypeAnswer,
  ArchetypeKey,
  QuizScore,
  rankLabel,
  scoreArchetypeQuiz,
  toAttempt
} from '../../domain/usecases/QuizScorer';

export const ASSESSMENT_QUIZ_ID = 'architect-challenge';

export interface UseAssessmentQuizReturn {
  questions: Question[];
  currentQIndex: number;
  currentQ: Question;
  selectedOption: QuizOption | null;
  answers: { questionId: number; option: QuizOption }[];
  isCompleted: boolean;
  result: ArchetypeProfile | null;
  score: QuizScore | null;
  rankLabel: string;
  handleSelect: (opt: QuizOption) => void;
  handleNext: () => void;
  handleRestart: () => void;
}

export const useAssessmentQuiz = (isEn: boolean): UseAssessmentQuizReturn => {
  const { completeStep, recordQuizAttempt } = useProgress();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; option: QuizOption }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const recordedKey = useRef<string | null>(null);

  const currentQ = interviewQuestions[currentQIndex];

  const handleSelect = useCallback((opt: QuizOption) => {
    setSelectedOption((current) => (current ? current : opt));
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;
    const newAnswers = [...answers, { questionId: currentQ.id, option: selectedOption }];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQIndex + 1 < interviewQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      return;
    }

    setIsCompleted(true);
    completeStep('/assessment');
  }, [answers, completeStep, currentQ.id, currentQIndex, selectedOption]);

  const handleRestart = useCallback(() => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsCompleted(false);
    recordedKey.current = null;
  }, []);

  const score: QuizScore | null = useMemo(
    () =>
      isCompleted
        ? scoreArchetypeQuiz(
            answers.map<ArchetypeAnswer>((answer) => ({
              questionId: answer.questionId,
              archetype: answer.option.score.type as ArchetypeKey,
              weight: answer.option.score.value
            }))
          )
        : null,
    [answers, isCompleted]
  );

  useEffect(() => {
    if (!score) return;
    const key = `${ASSESSMENT_QUIZ_ID}:${score.at}`;
    if (recordedKey.current === key) return;
    recordedKey.current = key;
    recordQuizAttempt(toAttempt(ASSESSMENT_QUIZ_ID, score));
  }, [recordQuizAttempt, score]);

  const result: ArchetypeProfile | null = score
    ? getArchetypeProfiles(isEn)[score.dominantArchetype]
    : null;

  return {
    questions: interviewQuestions,
    currentQIndex,
    currentQ,
    selectedOption,
    answers,
    isCompleted,
    result,
    score,
    rankLabel: score ? rankLabel(score.rank, isEn) : '',
    handleSelect,
    handleNext,
    handleRestart
  };
};
