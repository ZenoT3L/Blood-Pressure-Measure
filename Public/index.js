let button = document.querySelector("button");
let title = document.querySelector("h1");
let systolic = document.querySelector(".systolic");
let diastolic = document.querySelector(".diastolic");
button.addEventListener("click", () => {
  if (systolic.value === "" || diastolic.value === "") {
    if (systolic.value === "" && diastolic.value !== "") {
      title.innerHTML = "Please Enter Your Systolic Blood Pressure";
    } else if (systolic.value !== "" && diastolic.value === "") {
      title.innerHTML = "Please Enter Your Diastolic Blood Pressure";
    } else {
      title.innerHTML = "Please Enter Your Blood Pressure";
    }
  } else {
    if (systolic.value < 0 || diastolic.value < 0) {
      title.innerHTML = "Please Enter A Valid Number";
    } else {
      if (systolic.value < 120 && diastolic.value < 80) {
        title.innerHTML = "Normal";
      } else if (
        systolic.value >= 120 &&
        systolic.value <= 129 &&
        diastolic.value < 80
      ) {
        title.innerHTML = "Elevated";
      } else if (
        (systolic.value >= 130 && systolic.value <= 139) ||
        (diastolic.value >= 80 && diastolic.value <= 89)
      ) {
        title.innerHTML = "Stage 1 Hypertension";
      } else if (
        (systolic.value >= 140 && systolic.value <= 180) ||
        (diastolic.value >= 90 && diastolic.value <= 120)
      ) {
        title.innerHTML = "Stage 2 Hypertension";
      } else if (systolic.value > 180 || diastolic.value > 120) {
        title.innerHTML = "What Are You Doing Here, Get To A Hospital";
      }
    }
  }
});
