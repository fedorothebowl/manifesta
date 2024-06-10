import confetti from "./confetti.js";

export default function () {
  return {
    data: [],

    step: 0,
    answers: [],
    wrongAnswers: [],
    score: 0,
    checkAnswer: {
      showPopup: false,
      validateAnswer: undefined,
    },

    answer: {
      question: "",
      answers: [],
    },

    bannerImages : [
      '/assets/images/pattern/ansia.jpg',
      '/assets/images/pattern/cina.jpg',
      '/assets/images/pattern/hangover.jpg',
      '/assets/images/pattern/tennis.jpg',
      '/assets/images/pattern/tennis.jpg',
    ],
    newBannerImages : [],

    async init() {
      await this.fetchJsonData();
      this.$refs.stepper.style.width = this.step * 20 + "%";
      this.newBannerImages = this.shuffleArray(this.bannerImages);
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

      if(this.newBannerImages.length != 0){
        this.$refs.banner.src = this.newBannerImages[0];
        this.newBannerImages.shift();
      }

    },

    nextStep() {
      this.checkAnswer.showPopup = false;
      if (this.step < 4) {
        this.step++;
        this.nextAnswer();
        this.$refs.stepper.style.width = this.step * 20 + "%";
      } else {
        this.finalStep();
      }
    },

    handleScore(element) {
      this.checkAnswer.showPopup = true;
      const value = element.querySelector("span").getAttribute("data-type");

      this.answer.answers.forEach(el=>{
        if (el.type == "real"){
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
      this.step = 5;
      this.$refs.stepper.style.width = 100 + "%";
      this.timeRestart();
      this.score >= 4 ? this.winner()  : this.loser();
    },

    timeRestart(){
      console.log(this.$refs.timeToRestart)
      let time = 10;
      setInterval(() => {
        time--;
        this.$refs.timeToRestart.innerHTML = time;
        time == 0 && (window.location.href="/");
      }, 1000);
    },

    loser() {
      this.$refs.loserSong.play();
      console.log( this.$refs.loserSong)
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
