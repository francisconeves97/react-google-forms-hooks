import React, { useEffect, useState } from 'react'

import { googleFormsToJson, GoogleForm } from 'react-google-forms'
import 'react-google-forms/dist/index.css'

const App = () => {
  const [json, setJson] = useState<GoogleForm>()

  useEffect(() => {
    const fetchGoogleForm = async () => {
      const json = await googleFormsToJson('https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform')
      setJson(json)
    }

    fetchGoogleForm()
  }, [])

  return <div>{json}</div>
}

export default App
