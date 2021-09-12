app.controller("Home", function($scope){


});

app.controller("BlackJack", function($scope){
    let Black_Jack = {
        you: { scorespan: "#my_score", div: "#my_box", score: 0 },
        dealer: { scorespan: "#pc_score", div: "#pc_box", score: 0 },
        Cardval: {
          "Images/BJ/Cards/A.png": [1, 10],
          "Images/BJ/Cards/K.png": 10,
          "Images/BJ/Cards/Q.png": 10,
          "Images/BJ/Cards/J.png": 10,
          "Images/BJ/Cards/2.png": 2,
          "Images/BJ/Cards/3.png": 3,
          "Images/BJ/Cards/4.png": 4,
          "Images/BJ/Cards/5.png": 5,
          "Images/BJ/Cards/6.png": 6,
          "Images/BJ/Cards/7.png": 7,
          "Images/BJ/Cards/8.png": 8,
          "Images/BJ/Cards/9.png": 9,
          "Images/BJ/Cards/10.png": 10,
        },
      };
      
      const YOU = Black_Jack["you"];
      const DEALER = Black_Jack["dealer"];
      const aww1 = new Audio("Music/aww.mp3");
      const cash1 = new Audio("Music/cash.mp3");
      const statics = new Audio("Music/swish.m4a");
      const punchh = new Audio("Music/punch.mp3");
      
      document.querySelector("#hit_btn").addEventListener("click", btnhit);
      
      function btnhit() {
        showCard(YOU);
      
        youBusted();
      }
      function showCard(active_player) {
        let CardImg = document.createElement("img");
        rn = Math.floor(Math.random() * 13);
      
        let all_src = [
          "Images/BJ/Cards/A.png",
          "Images/BJ/Cards/K.png",
          "Images/BJ/Cards/Q.png",
          "Images/BJ/Cards/J.png",
          "Images/BJ/Cards/2.png",
          "Images/BJ/Cards/3.png",
          "Images/BJ/Cards/4.png",
          "Images/BJ/Cards/5.png",
          "Images/BJ/Cards/6.png",
          "Images/BJ/Cards/7.png",
          "Images/BJ/Cards/8.png",
          "Images/BJ/Cards/9.png",
          "Images/BJ/Cards/10.png",
        ];
      
        CardImg.src = all_src[rn];
      
        document.querySelector(active_player["div"]).appendChild(CardImg);
        statics.play();
      
        if (rn === 0) {
          if (
            active_player["score"] + Black_Jack["Cardval"][all_src[0]][1] <=
            21
          ) {
            active_player["score"] += Black_Jack["Cardval"][all_src[0]][1];
          } else {
            active_player["score"] += Black_Jack["Cardval"][all_src[0]][0];
          }
        } else {
          active_player["score"] += Black_Jack["Cardval"][all_src[rn]];
        }
        document.querySelector(active_player["scorespan"]).textContent =
          active_player["score"];
      }
      //---------------------------------------------------------------------
      
      document.querySelector("#deal_btn").addEventListener("click", deal_btn1);
      
      function deal_btn1() {
        let my_img = document.querySelector("#my_box").querySelectorAll("img");
        let del_img = document.querySelector("#pc_box").querySelectorAll("img");
        for (i = 0; i < my_img.length; i++) {
          my_img[i].remove();
        }
        for (i = 0; i < del_img.length; i++) {
          del_img[i].remove();
        }
      
        YOU["score"] = 0;
        DEALER["score"] = 0;
        document.querySelector(YOU["scorespan"]).textContent = 0;
        document.querySelector(DEALER["scorespan"]).textContent = 0;
        document.getElementById("bj_result").textContent = "Let's Play";
      }
      
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      
      document.querySelector("#stand").addEventListener("click", standbtn);
      async function standbtn() {
        if (YOU["score"] > 0) {
          showCard(DEALER);
          showCard(DEALER);
      
          console.log(DEALER["score"], "pc after 2 cards");
          await sleep(1000);
          if (DEALER["score"] >= 17) {
            console.log(DEALER["score"], "pc stop here");
          } else {
            showCard(DEALER);
            if (DEALER["score"] >= 15) {
              console.log(DEALER["score"], "pc played 3rd card");
            } else {
              showCard(DEALER);
            }
          }
      
          busted();
        }
      }
      let you_win = 0;
      let pc_win = 0;
      let tiee = 0;
      
      function winner() {
        if (YOU["score"] <= 21 && YOU["score"] > DEALER["score"]) {
          document.getElementById("bj_result").textContent = "You win";
          cash1.play();
          you_win += 1;
          document.getElementById("winCount").textContent = you_win;
        } else if (YOU["score"] === DEALER["score"]) {
          document.getElementById("bj_result").textContent = "It's Tie";
          aww1.play();
          tiee += 1;
          document.getElementById("tieCount").textContent = tiee;
        } else if (DEALER["score"] <= 21 && DEALER["score"] > YOU["score"]) {
          document.getElementById("bj_result").textContent = "You Lose";
          aww1.play();
          pc_win += 1;
          document.getElementById("loseCount").textContent = pc_win;
        }
      }
      
      function busted() {
        if (YOU["score"] > 21) {
          document.getElementById("bj_result").textContent = "You Busteddddd";
          punchh.play();
          pc_win += 1;
          document.getElementById("loseCount").textContent = pc_win;
          console.log(YOU["score"], "Darpit bustd");
      
          setTimeout(() => {
            deal_btn1();
          }, 2000);
        } else if (DEALER["score"] > 21) {
          document.getElementById("bj_result").textContent = "Pc Busteddddd";
          cash1.play();
          you_win += 1;
      
          document.getElementById("winCount").textContent = you_win;
      
          setTimeout(() => {
            deal_btn1();
          }, 2000);
        } else {
          console.log("You are not a winner");
          winner();
        }
      }
      
      function youBusted() {
        if (YOU["score"] > 21) {
          document.querySelector(YOU["scorespan"]).textContent = "BUST";
          //document.querySelector(YOU['scorespan']).style.color = "red"
          document.getElementById("bj_result").textContent = "You Bustedddddd";
          punchh.play();
          pc_win += 1;
          document.getElementById("loseCount").textContent = pc_win;
          console.log(YOU["score"], "Darpit bustd");
      
          setTimeout(() => {
            deal_btn1();
          }, 2000);
        }
      }
});
