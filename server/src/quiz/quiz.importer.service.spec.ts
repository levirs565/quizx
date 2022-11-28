import {
  CreateQuizParameters,
  MathQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  ShortTextQuestion,
} from '@quizx/shared';
import { QuizImporterService } from './quiz.importer.service';

describe('QuizImportService', () => {
  let service: QuizImporterService;

  beforeEach(() => {
    service = new QuizImporterService();
  });

  it('should import markdown correctly', async () => {
    const markdown = `
# Example Quiz Title *Bold*

1. First question

   ![Image Test](Yaya)

   a. Choice 1  
      Test
      Yaya

      Baga

   b. Choice 2

   c. Choice 3

   d. Choice 4

   Answer:A
2. Second question  
   a. Choice 1  
   b. Choice 2  
   c. Choice 3  
   d. Choice 4

   Answer: D
3. Question with number answer

   Answer: 12.2
4. This question does not have answer
5. This question have text answer

   Answer: This is the answer
6. Question with math answer

   Answer: $a + a$
7. Multiple choice without answer
   a. Choice 1
   b. Choice 2
   c. Choice 3
   d. Choice 4
`;
    const expected = new CreateQuizParameters();
    expected.title = 'Example Quiz Title Bold';

    const question1 = new MultipleChoiceQuestion();
    question1.question = `<p>First question</p>
<p><img src=\"Yaya\" alt=\"Image Test\"></p>`;
    question1.choices = [
      `<p>Choice 1<br>
Test Yaya</p>
<p>Baga</p>`,
      '<p>Choice 2</p>',
      '<p>Choice 3</p>',
      '<p>Choice 4</p>',
    ];
    question1.answer = 0;

    const question2 = new MultipleChoiceQuestion();
    question2.question = '<p>Second question</p>';
    question2.choices = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'];
    question2.answer = 3;

    const question3 = new NumberQuestion();
    question3.question = '<p>Question with number answer</p>';
    question3.answer = 12.2;

    const question4 = new ShortTextQuestion();
    question4.question = '<p>This question does not have answer</p>';
    question4.answer = 'Empty answer';

    const question5 = new ShortTextQuestion();
    question5.question = '<p>This question have text answer</p>';
    question5.answer = 'This is the answer';

    const question6 = new MathQuestion();
    question6.question = '<p>Question with math answer</p>';
    question6.answer = 'a + a';

    const question7 = new MultipleChoiceQuestion();
    question7.question = '<p>Multiple choice without answer</p>';
    question7.choices = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'];
    question7.answer = 0;

    expected.questions = [
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
    ];

    const quiz = await service.markdownToQuiz(markdown);

    expect(quiz).toEqual(expected);
  });

  it('should render math correctly', async () => {
    const markdown = `
# Math Test

1. Block:

   $$
   \\begin{align*}
   x^2 + y^2 = r^2
   \\end{align*}
   $$

   Inline: $x + y > 0$

   Answer: false
`;
    const expected = new CreateQuizParameters();
    expected.title = 'Math Test';

    const question = new ShortTextQuestion();
    question.question = `<p>Block:</p>
<math-block src=\"
\\begin{align*}
x^2 + y^2 = r^2
\\end{align*}
\"></math-block>
<p>Inline: <math-inline src=\"x + y &gt; 0\"></math-inline></p>`;
    question.answer = 'false';

    expected.questions = [question];

    const quiz = await service.markdownToQuiz(markdown);
    expect(quiz).toEqual(expected);
  });

  it('should use default title when title not found', async () => {
    const expected = new CreateQuizParameters();
    expected.title = 'Untitled Quiz';
    expected.questions = [];
    const quiz = await service.markdownToQuiz('');
    expect(quiz).toEqual(expected);
  });

  it('should use first heading for title', async () => {
    const expected = new CreateQuizParameters();
    expected.title = 'First Heading';
    expected.questions = [];
    const quiz = await service.markdownToQuiz('# First Heading\n\n# Second Heading');
    expect(quiz).toEqual(expected);
  });

  it('should correcly parse subscript and superscript', async () => {
    const exptected = new CreateQuizParameters();
    exptected.title = 'Untitled Quiz';

    const question = new ShortTextQuestion();
    question.question = 'Test: <sub>sub</sub> <sup>sup</sup>';
    question.answer = 'Empty answer';

    exptected.questions = [question];

    const quiz = await service.markdownToQuiz('1. Test: ~sub~ ^sup^');
    expect(quiz).toEqual(exptected);
  });
});
