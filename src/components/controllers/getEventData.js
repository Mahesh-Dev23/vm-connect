import React from 'react'
import axios from 'axios'

const getEventData = async () => {
    let value
    await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    .then( response => {
        // handle success
        //console.log(response.data)
        value =  response;
        return value;
      })
    // .catch(error => {
    //     // handle error
    //     console.log(error);
    //   })
}

export default getEventData