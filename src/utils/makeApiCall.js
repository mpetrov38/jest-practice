export function makeAPICall(url, options) {
  return fetch(url, options)
    .then(response => {
      if (response.ok) {

        return new Promise((res, rej) => {
          response.json()
            .then(body => {
              return res(body)

            })
            .catch(error => res(error))
        })
      }

      return new Promise((res, rej) => {

        response.json().
          then(body => {
            rej(body.message);
          })
      })
    })

}