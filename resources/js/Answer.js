import confetti from "./confetti.js";

export default function () {
  return {
    data: [],

    step: 0,
    answers: [],
    wrongAnswers: [],
    score: 0,
    popupFinalStep: false,
    checkAnswer: {
      showPopup: false,
      validateAnswer: undefined,
    },

    answer: {
      question: "",
      answers: [],
    },

    async init() {
      await this.fetchJsonData();
      this.$refs.stepper.style.width = this.step * 10 + "%";
      this.nextAnswer();
    },

    async fetchJsonData() {
      try {
        let response = await fetch("/assets/json/question.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.data = await response.json();
        this.data = this.shuffleArray(this.data);
      } catch (error) {
        console.error("Errore durante il fetch del file JSON:", error);
      }
    },

    shuffleArray(arr) {
      return arr.sort(() => Math.random() - 0.5);
    },

    nextAnswer() {
      this.shuffleArray(this.data[this.step].answers); // mescolo le risposte
      this.answer = this.data[this.step];
      this.$refs.image.src=this.answer.image;
    },

    nextStep() {
      this.checkAnswer.showPopup = false;
      if (this.step < 9) {
        this.step++;
        this.nextAnswer();
        this.$refs.stepper.style.width = this.step * 10 + "%";
      } else {
        this.finalStep();
      }
    },

    handleScore(element) {
      this.checkAnswer.showPopup = true;
      const value = element.querySelector("span").getAttribute("data-type");

      this.answer.answers.forEach(el=>{
        if (el.type == "real"){
          console.log(el.answer)
          this.$refs.test.innerHTML = el.answer;
        }
      });

      if (value == "real") {
        this.checkAnswer.validateAnswer = true;
        this.score++;
      } else {
        this.checkAnswer.validateAnswer = false;
      }

    },

    finalStep() {
      this.step = 10;
      this.$refs.stepper.style.width = 100 + "%";
      this.popupFinalStep = true;
      this.score >= 7 ? this.winner()  : this.loser();
    },

    loser() {
      this.$refs.loserSong.play();
    },

    winner() {
      confetti();
      this.$refs.winnerSong.play();
    },

    // wrongData(){
    //   this.wrongAnswers.push(this.data[this.step])
    // }
  };
}
