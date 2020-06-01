import React, { useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import useAxios, {configure} from 'axios-hooks'

// Define axios instance, you could use env to split up production & development
// The useAxios provides directly by axios-hooks use the same instance
// If you need more than one axios instance, explain later
const axiosInstance = Axios.create({baseURL: 'http://www.mocky.io/v2'})
configure({axios: axiosInstance})

// You should define your api url somewhere in your project.
const api = {
  getMail: { url: () => '/5ed0a6ea3500005d00ff9d7b?mocky-delay=2000ms', method: 'GET'}, 
  putMail: { url: (id) => `/5ed0a49e3500009300ff9d6b/${id}`, method: 'POST'}
}

function App() {
  // The example to get some data
  // Execute once the component did mount
  const [{data = {iam: 'default data'}, loading, error}] = useAxios({
    url: api.getMail.url(),
    method: api.getMail.method, 
    data: {haha: "yes"}
  })
  // The example to CUD data
  // Pass { manual: true } into useAxios, then it won't execute when component did mount
  const [{data: updatedData}, updateData] = useAxios({method: api.putMail.method}, {manual: true})
  return (
    <div >
      {error && <div>error</div>}
      {data && <div>{`${JSON.stringify(data)} ${loading?'loading':''}`}</div>}
      {updateData && <div>{JSON.stringify(updatedData)}</div>}
      <button onClick={() => {
          // You can set the common authorization header like this way
          axiosInstance.defaults.headers.authorization='test101'
          // Example to update data
          updateData({url: api.putMail.url('myid'), data: {thedata: 'you want to put'}, headers: {'g-response-token': 'anotherheader'}})
            .then((data) => {console.log(data)}) // Use it by the way you want, even with redux store
      }}>
        test
      </button>
    </div>
  );
}

// If you need more than one axios instance, set up with makeUseAxios & export it
// const anotherInstance = Axios.create({baseURL: 'http://some.another.api.url'})
// export const useAnotherAxios = makeUseAxios({axios: anotherInstance})

export default App;
