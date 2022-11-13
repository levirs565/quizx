import { Injectable } from '@nestjs/common';
import {
  CreateQuizParameters,
  MathQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  Question,
  ShortTextQuestion,
} from '@quizx/shared';
import markdownIt, { PluginWithOptions } from 'markdown-it';
import { markdownItFancyListPlugin } from 'markdown-it-fancy-lists';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import dollarmathPlugin from 'markdown-it-dollarmath';
import Token from 'markdown-it/lib/token.js';
import { RenderRule } from 'markdown-it/lib/renderer.js';
import { escapeHtml } from 'markdown-it/lib/common/utils.js';

@Injectable()
export class QuizImporterService {
  private markdownProcessor = markdownIt()
    .use(markdownItSub)
    .use(markdownItSup)
    .use(markdownItFancyListPlugin as PluginWithOptions)
    .use(dollarmathPlugin, {
      allow_digits: true,
    });

  constructor() {
    const inlineRenderer: RenderRule = (tokens, index) => {
      const content = escapeHtml(tokens[index].content.trim());
      return `<math src="${content}"></math>`;
    };
    const blockRenderer: RenderRule = (tokens, index) => {
      const content = escapeHtml(tokens[index].content.trim());
      return `<math-block src="${content}"></math-block>`;
    };

    this.markdownProcessor.renderer.rules['math_inline'] = inlineRenderer;
    this.markdownProcessor.renderer.rules['math_inline_double'] = inlineRenderer;
    this.markdownProcessor.renderer.rules['math_block'] = blockRenderer;
    this.markdownProcessor.renderer.rules['math_block_label'] = blockRenderer;
  }

  private collectTokenUntilType(
    tokenList: Token[],
    from: number,
    endType: String,
    endLevel: number
  ): {
    endIndex: number;
    result: Token[];
  } {
    let index = from;
    const result: Token[] = [];

    while (true) {
      const token = tokenList[index];
      if (token.type == endType && token.level == endLevel) break;
      else result.push(token);
      index++;
    }

    return {
      endIndex: index,
      result,
    };
  }

  private extractOrderedListItems(
    tokenList: Token[],
    from: number
  ): {
    endNodeIndex: number;
    listItems: Array<Array<Token>>;
  } {
    const openNode = tokenList[from];
    let nodeIndex = from + 1;
    let childToken: Token = tokenList[nodeIndex];

    const listItems: Array<Array<Token>> = [];

    while (!(childToken.type === 'ordered_list_close' && childToken.level === openNode.level)) {
      const collected = this.collectTokenUntilType(
        tokenList,
        nodeIndex + 1,
        'list_item_close',
        childToken.level
      );
      listItems.push(collected.result);
      nodeIndex = collected.endIndex;

      nodeIndex++;
      childToken = tokenList[nodeIndex];
    }

    return {
      endNodeIndex: nodeIndex,
      listItems,
    };
  }

  private renderTokensToHTML(tokens: Token[]): string {
    return this.markdownProcessor.renderer.render(tokens, {}, {});
  }

  private analyzeQuestionAnswerFromTokens(tokens: Token[]): {
    text: string;
    tokenIndex?: number;
  } {
    if (tokens[tokens.length - 1].type !== 'paragraph_close') {
      return {
        text: '',
      };
    }

    const lastInlineText = tokens[tokens.length - 2].content;
    const answerRegex = /^\s*answer\s*:\s*/i;
    const regexResult = answerRegex.exec(lastInlineText);

    if (!(regexResult && regexResult[0])) {
      return {
        text: '',
      };
    }

    return {
      text: lastInlineText.slice(regexResult[0].length).trim(),
      tokenIndex: tokens.length - 3,
    };
  }

  private analyzeQuestionTokens(tokens: Token[]): Question {
    const answer = this.analyzeQuestionAnswerFromTokens(tokens);
    const multipleChoiceAnswerRegex = /^[a-z]$/i;
    const choiceIndex = tokens.findIndex(
      (token) =>
        token.type === 'ordered_list_open' && ['A', 'a'].includes(token.attrGet('type') || '')
    );
    if (choiceIndex >= 0 && (answer.text === '' || multipleChoiceAnswerRegex.test(answer.text))) {
      const bodyTokens = tokens.slice(0, choiceIndex);
      const questionHTML = this.renderTokensToHTML(bodyTokens);
      const answerIndex =
        answer.text !== '' ? answer.text.toLowerCase().codePointAt(0)! - 'a'.codePointAt(0)! : 0;

      const choicesTokens = tokens.slice(choiceIndex, answer.tokenIndex);
      const choicesHTML = this.extractOrderedListItems(choicesTokens, 0).listItems.map((tokens) =>
        this.renderTokensToHTML(tokens)
      );

      const question = new MultipleChoiceQuestion();
      question.question = questionHTML;
      question.choices = choicesHTML;
      question.answer = answerIndex;
      return question;
    } else {
      const bodyTokens = tokens.slice(0, answer.tokenIndex);
      const bodyHTML = this.renderTokensToHTML(bodyTokens);

      if (/^-?[\d.]+$/.test(answer.text)) {
        const question = new NumberQuestion();
        question.question = bodyHTML;
        question.answer = parseFloat(answer.text);
        return question;
      } else if (answer.text.startsWith('$') && answer.text.endsWith('$')) {
        const question = new MathQuestion();
        question.question = bodyHTML;
        question.answer = answer.text.slice(1, answer.text.length - 1);
        return question;
      } else {
        const question = new ShortTextQuestion();
        question.question = bodyHTML;
        question.answer = answer.text.length > 0 ? answer.text : 'Empty answer';
        return question;
      }
    }
  }

  markdownToQuiz(text: string): CreateQuizParameters {
    const quiz = new CreateQuizParameters();
    quiz.questions = [];

    const ast = this.markdownProcessor.parse(text, {});
    let nodeIndex = 0;
    while (nodeIndex < ast.length) {
      const node = ast[nodeIndex];

      if (node.type === 'heading_open') {
        nodeIndex++;
        const headingInline = ast[nodeIndex];
        if (!quiz.title) quiz.title = headingInline.content;
        nodeIndex++;
      } else if (node.type === 'ordered_list_open' && node.attrs?.length == 0) {
        // Ordererd list with number marker doest not have attrs
        const listItems = this.extractOrderedListItems(ast, nodeIndex);
        for (let questionToken of listItems.listItems) {
          quiz.questions.push(this.analyzeQuestionTokens(questionToken));
        }
        nodeIndex = listItems.endNodeIndex;
      }

      nodeIndex++;
    }

    if (!quiz.title) quiz.title = 'Untitled Quiz';

    return quiz;
  }
}
