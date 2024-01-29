<script setup>
import {useQuestionStore} from "@/stores/QuestionStore.js";
import {storeToRefs} from "pinia";
import Question from "@/components/question.vue";
import router from "@/router/index.js";
import {computed, ref} from "vue";
import trueSvg from "@/assets/true.svg";
import falseSvg from "@/assets/false.svg";
const questionStore = useQuestionStore();
const { game, index } = storeToRefs(questionStore);

const isCorrect = ref(null);
const score = computed(() => {
  return game.value.questions.filter(q => q.correctlyAnswered).length;
})

questionStore.createGame();

const ActualQuestion = computed(() => {
  return game.value.questions[index.value];
})

async function onAnswer(questionId, answer) {
  isCorrect.value = await questionStore.answerQuestion(questionId, answer);

  setTimeout(async () => {
    isCorrect.value = null;

    // game end ?
    if (questionStore.goToNextQuestion())
      await router.push('/');

  }, 2000);
}

</script>

<template>
  <main>
    <div class="center-screen">
      <div class="title floating-div">KWIZ GAME</div>
      <div class="loading" v-if="game.loading">
        Chargement ...
      </div>
      <div class="error" v-else-if="game.error">
        Oups ! {{ game.error }}
      </div>
      <div class="game" v-else>
        <!-- svg -->
        <div class="svg-container" v-if="isCorrect !== null">
          <img :src="isCorrect ? trueSvg : falseSvg" alt="svg" />
        </div>
        <Question :key="ActualQuestion.id"
            :question="ActualQuestion.questionText"
            :id="ActualQuestion.id"
            :answers="ActualQuestion.answers"
            @answer="onAnswer"/>
        <div class="score">
          Score : {{ score }}
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.title {
  font-weight: bolder;
  font-size: 4rem;
  transition: 0.4s;
  font-family: DiloWorld, sans-serif;
  letter-spacing: 0.5rem;
  line-height: 1.2;
  margin-bottom: 2rem;
}

.svg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.score {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  border-top: 1px solid black;
}
</style>