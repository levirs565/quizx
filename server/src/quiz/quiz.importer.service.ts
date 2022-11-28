import { Injectable } from '@nestjs/common';
import {
  CreateQuizParameters,
  MathQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  ShortTextQuestion,
} from '@quizx/shared';
import { spawn } from 'node:child_process';
import { CommonServiceException } from '../common/common-service.exception.js';
import { parseDocument } from 'htmlparser2';
import { Document, isTag, isText, Element, ChildNode } from 'domhandler';
import {
  appendChild,
  textContent,
  replaceElement,
  getChildren,
  getElementsByTagName,
  removeElement,
} from 'domutils';
import render from 'dom-serializer';

@Injectable()
export class QuizImporterService {
  private convertMathTag(node: ChildNode[]) {
    for (const child of node) {
      if (isTag(child) && child.tagName == 'span') {
        const classList = child.attribs.class?.split(' ') ?? [];
        if (classList.includes('math')) {
          const attrs = {
            src: textContent(child),
          };
          if (classList.includes('inline'))
            replaceElement(child, new Element('math-inline', attrs));
          else if (classList.includes('display'))
            replaceElement(child.parent!, new Element('math-block', attrs));
        }
      } else {
        this.convertMathTag(getChildren(child));
      }
    }
  }

  private trimElement(element: Element): Element {
    if (element.lastChild && isText(element.lastChild) && element.lastChild.data.trim().length == 0)
      removeElement(element.lastChild);
    if (element.lastChild && isTag(element.lastChild!) && element.lastChild.tagName == 'br')
      removeElement(element.lastChild);
    return element;
  }

  private extractListItems(list: Element) {
    const result: Element[] = [];
    list.children.forEach((ch) => {
      if (isTag(ch)) result.push(ch);
      else if (isText(ch) && ch.data.trim().length == 0) return;
      else throw new CommonServiceException('List children must element. ');
    });
    return result;
  }

  private analyzeDocument(dom: Document) {
    let title: string | undefined = undefined;
    const questionNodeList: Element[] = [];
    let enterQuestion = false;

    while (dom.children.length > 0) {
      const child = dom.firstChild!;
      if (isTag(child) && child.tagName == 'ol' && child.attribs.type == '1') {
        enterQuestion = true;
        questionNodeList.push(...this.extractListItems(child));
        removeElement(child);
      } else if (enterQuestion) {
        const node = questionNodeList[questionNodeList.length - 1];
        appendChild(node, child);
      } else if (isTag(child) && !title) {
        title = textContent(child);
        removeElement(child);
      } else {
        removeElement(child);
      }
    }

    return {
      title,
      questionNodeList,
    };
  }

  private analyzeQuestionAnswer(node: Element) {
    this.trimElement(node);
    const lastNode = node.lastChild;
    if (lastNode) {
      const lastText = textContent(lastNode);
      const answerRegex = /^\s*answer\s*:\s*/i;
      const regexResult = answerRegex.exec(lastText);
      if (regexResult && regexResult[0]) {
        const mathNodes = getElementsByTagName('math-inline', getChildren(lastNode), false, 1);
        removeElement(lastNode);
        if (mathNodes.length > 0) {
          return {
            isMath: true,
            canChoice: false,
            answer: mathNodes[0].attribs.src,
          };
        } else {
          const multipleChoiceAnswerRegex = /^[a-z]$/i;
          const answer = lastText.substring(regexResult[0].length).trim();
          return {
            isMath: false,
            canChoice: multipleChoiceAnswerRegex.test(answer),
            answer,
          };
        }
      }
    }
    return {
      isMath: false,
      canChoice: true,
      answer: undefined,
    };
  }

  private analyzeQuestionBody(node: Element, canChoice: boolean) {
    const questionElement: Element = new Element('html', {});
    const choiceElements: Element[] = [];

    let enterChoice = false;
    while (node.children.length > 0) {
      const child = node.firstChild!;
      if (
        canChoice &&
        isTag(child) &&
        child.tagName == 'ol' &&
        ['a', 'A'].includes(child.attribs.type)
      ) {
        enterChoice = true;
        choiceElements.push(...this.extractListItems(child))
        removeElement(child);
      } else if (enterChoice) {
        appendChild(choiceElements[choiceElements.length - 1], child);
      } else appendChild(questionElement, child);
    }

    return {
      questionElement,
      choiceElements,
    };
  }

  private renderInnerNodes(node: Element): string {
    return node.children.map((child) => render(child)).join('');
  }

  async markdownToQuiz(text: string): Promise<CreateQuizParameters> {
    const htmlOutput = await this.runPandoc(
      ['-f', 'markdown-raw_tex-implicit_figures', '-t', 'html', '--katex'],
      text
    );
    const dom = parseDocument(htmlOutput);

    this.convertMathTag(dom.children);
    const { title, questionNodeList } = this.analyzeDocument(dom);

    const questions = questionNodeList.map((node) => {
      const { isMath, canChoice, answer } = this.analyzeQuestionAnswer(node);
      const { questionElement, choiceElements } = this.analyzeQuestionBody(node, canChoice);

      const text = this.renderInnerNodes(this.trimElement(questionElement));
      if (choiceElements.length > 0) {
        const question = new MultipleChoiceQuestion();
        question.question = text;
        question.choices = choiceElements.map((node) =>
          this.renderInnerNodes(this.trimElement(node))
        );
        question.answer =
          answer !== undefined ? answer.toLowerCase().codePointAt(0)! - 'a'.codePointAt(0)! : 0;
        return question;
      } else if (isMath) {
        const question = new MathQuestion();
        question.question = text;
        question.answer = answer;
        return question;
      } else if (answer && /^-?[\d.]+$/.test(answer)) {
        const question = new NumberQuestion();
        question.question = text;
        question.answer = parseFloat(answer);
        return question;
      } else {
        const question = new ShortTextQuestion();
        question.question = text;
        question.answer = answer ?? 'Empty answer';
        return question;
      }
    });

    const quiz = new CreateQuizParameters();
    if (title) quiz.title = title;
    else quiz.title = 'Untitled Quiz';
    quiz.questions = questions;

    return quiz;
  }

  runPandoc(args: string[], input: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let result = '';

      const pandocProcess = spawn('pandoc', args);
      pandocProcess.stdin.end(input, 'utf-8');

      pandocProcess.stdout.on('data', (data) => {
        result += String(data);
      });
      pandocProcess.stdout.on('end', () => {
        resolve(result);
      });
      pandocProcess.stderr.on('error', (err) => {
        reject(new CommonServiceException(err.message));
      });
    });
  }
}
