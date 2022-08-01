import axios from 'axios';

function a() {
  const bodyFormData = new FormData();

  bodyFormData.append('userName', 'Fred');

  bodyFormData.append('image', imageFile);

  axios({
    method: 'post',
    url: 'myurl',
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}
