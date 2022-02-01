import './App.css';
import React, { useEffect, useState, useCallback } from 'react' 

const App = () => {
  const [user, setUser] = useState({})
  const [clicked, setClicked] = useState(false)
  const savedRows = sessionStorage.getItem("rows")
  const [dataRows, setDataRows] = useState(() => {
    return savedRows ? JSON.parse(savedRows) : 1
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getUser', {
          headers: {
             'Content-type': 'application/json'
          }
        })
        
        const responseData = await response.json()
        setUser(responseData.userResult)
      } catch (error) {
        //console.log(error);
      }
    }

    fetchUser()
  }, [])


  useEffect(() => {
    sessionStorage.setItem("rows", dataRows)
  }, [savedRows, dataRows])
  

  const fetchMoreUserInfo = useCallback(async() => {
    const offset = parseInt(dataRows) + 1
    setDataRows(offset)

    try {
      const response = await fetch('http://localhost:5000/api/getMore', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
       },
       body: JSON.stringify({
         rows: dataRows
       })
      })

      const responseData = await response.json()
      setUser({...user, ...responseData})
      setClicked(true)
    } catch (error) {
      //console.log(error);
    }
    
  }, [dataRows, user])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple react app</h1>
      </header>
      <main>
        <section className='App-content'>
          <div className="app-data image">
            <img src={user && `http://localhost:5000/dummy_avatar.png`} alt="profile"/>
          </div>
          <div className="app-data firstname">
            <h3>Firstname:</h3>
            <p>{user && user.firstname}</p>
          </div>
          <div className="app-data lastname">
            <h3>Lastname:</h3>
            <p>{user && user.lastname}</p>
          </div>
          {clicked ? 
          <>
          <div className="app-data image">
            <img src={user && `http://localhost:5000/dummy_avatar.png`} alt="profile"/>
          </div>
          <div className="app-data firstname">
            <h3>Firstname:</h3>
            <p>{user && user.firstname}</p>
          </div>
          <div className="app-data lastname">
            <h3>Lastname:</h3>
            <p>{user && user.lastname}</p>
          </div>
        </>
        :
        null
          }
        </section>
        <div className='load-more'>
            <button type='button' onClick={fetchMoreUserInfo}>Load more</button>
          </div>
      </main>        
    </div>
  );
}

export default App;
