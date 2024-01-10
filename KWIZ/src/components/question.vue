<script setup>
const { question, answers, id } = defineProps({
  question: String,
  answers: Array,
  id: String
})

const emit = defineEmits(['answer'])

const emitAnswer = (answer) => {
  emit('answer', id, answer)
}

</script>
<template>
  <div class="question">
    <div class="question-text">
      {{ question }}
    </div>
    <div class="answers">
      <button class="answer" v-for="answer in answers" :key="answer"
        @click="emitAnswer(answer)">
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.question-text {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>