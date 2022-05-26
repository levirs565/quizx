import {
  CreateQuizParameters,
  MathQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  ShortTextQuestion,
} from 'types/quiz';
import { QuizImporterService } from './quiz.importer.service';

describe('QuizImportService', () => {
  let service: QuizImporterService;

  beforeEach(() => {
    service = new QuizImporterService();
  });

  it('should import markdown correctly', () => {
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
`;
    const expected = new CreateQuizParameters();
    expected.title = 'Example Quiz Title *Bold*';

    const question1 = new MultipleChoiceQuestion();
    question1.question = `<p>First question</p>
<p><img src=\"Yaya\" alt=\"Image Test\"></p>
`;
    question1.choices = [
      `<p>Choice 1<br>
Test
Yaya</p>
<p>Baga</p>
`,
      '<p>Choice 2</p>\n',
      '<p>Choice 3</p>\n',
      '<p>Choice 4</p>\n',
    ];
    question1.answer = 0;

    const question2 = new MultipleChoiceQuestion();
    question2.question = '<p>Second question</p>\n';
    question2.choices = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'];
    question2.answer = 3;

    const question3 = new NumberQuestion();
    question3.question = '<p>Question with number answer</p>\n';
    question3.answer = 12.2;

    const question4 = new ShortTextQuestion();
    question4.question = '<p>This question does not have answer</p>\n';
    question4.answer = 'Empty answer';

    const question5 = new ShortTextQuestion();
    question5.question = '<p>This question have text answer</p>\n';
    question5.answer = 'This is the answer';

    const question6 = new MathQuestion();
    question6.question = '<p>Question with math answer</p>\n';
    question6.answer = 'a + a';

    expected.questions = [question1, question2, question3, question4, question5, question6];

    const quiz = service.markdownToQuiz(markdown);

    expect(quiz).toEqual(expected);
  });

  it('should render math correctly', () => {
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
<math-block src=\"\\begin{align*}
   x^2 + y^2 = r^2
   \\end{align*}\"></math-block><p>Inline: <math src=\"x + y &gt; 0\"></math></p>
`;
    question.answer = 'false';

    expected.questions = [question];

    const quiz = service.markdownToQuiz(markdown);
    expect(quiz).toEqual(expected);
  });
});
