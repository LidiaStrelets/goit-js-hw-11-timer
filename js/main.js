const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  minutes: document.querySelector('span[data-value="mins"]'),
  seconds: document.querySelector('span[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate, updateTimerData }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.remainingTime = 0;
    this.updateTimerData = updateTimerData;

    this.setTime();
  }
  setTime() {
    const currentTime = new Date();
    this.remainingTime = this.targetDate - currentTime;
    this.updateTimerData(this.getTimeComponents(this.remainingTime));
  }
  switchTime() {
    setInterval(() => {
      this.setTime();
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('December 25, 2025'),
  updateTimerData,
});

timer.switchTime();

function updateTimerData({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = mins;
  refs.seconds.textContent = secs;
}
