import { defineStore } from 'pinia'
import {fetchWrapper} from "@/stores/fetch-wrapper.js";

const baseUrl = `http://localhost:5133/Games`;
export const useQuestionStore = defineStore({
    id: 'actions',
    state: () => ({
        game: {},
        index: 0
    }),
    actions: {
        goToNextQuestion() {
            this.index++;
            return this.index === 10;
        },
        async createGame() {
            this.game = {loading: true};

            fetchWrapper.post(baseUrl, {})
                .then(response => {
                    this.game = response;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async answerQuestion(questionId, attemptedAnwser) {

            let res = false;

            await fetchWrapper.post(baseUrl + `/${this.game.id}/answer`, {id: questionId, attemptedAnwser: attemptedAnwser})
                .then(response => {
                    // set correctlyAnswered for the id of the question
                    this.game.questions.find(q => q.id === response.id).correctlyAnswered = response.correctlyAnswered;
                    res = response.correctlyAnswered;
                })
                .catch(error => {
                    console.error(error);
                });

            return res;
        }
    }
})
