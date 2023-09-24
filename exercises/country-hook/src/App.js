import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  console.log(name, 'name')

  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`).then((result) => {
        setCountry(...result.data)
      }).catch((error) => {
        setCountry(null)
      })
    }

  }, [name])

  return country
}

const Country = ({ country, search }) => {
  console.log(country, 'from country component')
  if (!search) {
    return null
  }

  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>

      <h3>{country.name.common} </h3>
      {country.capital.map((country, index) => <div key={index}>{country}</div>)}

      <div>population {country.population}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const [search, setSearch] = useState(false)
  const country = useCountry(name)
  console.log(country, 'from app component')


  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    setSearch(true)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} search={search} />
    </div>
  )
}

export default App