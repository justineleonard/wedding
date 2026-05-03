class Toffee {
  constructor() {
    this.form = document.getElementById('rsvp-form');

    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => {
      this.submitForm(e);
    });
  }

  submitForm(e) {
    e.preventDefault();

    const data = new FormData(this.form);

    const values = Object.fromEntries(data.entries());
    this.checkAttendance(values.attending);

    this.postData(values);

  }

  checkAttendance(attending) {
    if(attending === 'no') {
      document.body.classList.add('animating');

      var audio = new Audio('assets/audio/toffee.mp4');
      audio.loop = true;
      audio.play();

      setTimeout(() => {
        document.body.classList.remove('animating');
        audio.pause();
      }, 4000);
    }
  }

  postData(formData) {
    const elemsToHide = document.querySelectorAll('.js-hide-on-message');
    const loading = document.querySelector('.rsvp__loading');
    const message = document.querySelector('.js-show-on-message');

    let successMessage = '<p>Thank you for RSVPing. We look forward to celebrating with you!</p>';

    if(formData.attending === 'no') {
      successMessage = '<p>We\'re sorry to hear that you won\'t be able to make it. Toffee will now hunt you down.</p>';
    }

    elemsToHide.forEach((elem) => {
      elem.style.display = 'none';
    });

    loading.style.display = 'block';

    fetch('https://sheetdb.io/api/v1/t1573cx19c40u', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          data: [formData]
      })
    })
      .then((response) => response.json())
      .then((data) => {

        loading.style.display = 'none';

        message.innerHTML = successMessage;
        message.style.display = 'block';
      });
  }
}

export default Toffee;
