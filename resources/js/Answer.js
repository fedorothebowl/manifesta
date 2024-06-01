import confetti from './confetti.js';

export default function () {

  return {

    data: [],

    step: 0,
    answers: [],
    wrongAnswers:[],
    score: 0,
    showPopUp:false,

    answer: {
      question: "",
      answers: [],
    },

    async init() {
      await this.fetchJsonData();
      this.$refs.stepper.style.width = (this.step) * 10 + "%";
      this.nextAnswer();
    },

    async fetchJsonData() {
      try {
        let response = await fetch('/assets/json/question.json');

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
    },

    nextStep() {
      if (this.step < 9) {
        this.step++;
        this.nextAnswer();
        this.$refs.stepper.style.width = (this.step) * 10 + "%";
      }else{
        this.finalStep();
      }
    },

    handleScore(element) {
      const value = element.querySelector("span").getAttribute("data-type");
      value == "real" ? this.score++ : this.wrongData();
      this.nextStep();
    },

    finalStep(){
      this.$refs.stepper.style.width = 100 + "%";
      setTimeout(() => {
        this.step = 10;
        this.showPopUp = true;
        if(this.score >= 7){
          this.winner();
        }else{
          this.loser(); 
        }
      }, 1000);
    },

    loser(){
      this.$refs.loserSong.play();
    },

    winner(){
      confetti();
      this.$refs.winnerSong.play();
    },

    wrongData(){
      this.wrongAnswers.push(this.data[this.step])
    }

  };

}
