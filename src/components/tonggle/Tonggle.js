import React, { useContext, useEffect, useState } from "react"
import { DataContext } from "../../Context/AppContext"

export const Toggle = () => {
  const { toggleTheme } = useContext(DataContext)
  const [checked, setChecked] = useState(false)

  const onChangeChecked = (e) => {
    setChecked(e.target.checked)
  }
  useEffect(() => {
    toggleTheme()
  }, [checked])
  return (
    <div class=" Toggle">
      <input
        onChange={onChangeChecked}
        id="checkbox"
        name="checkbox"
        type="checkbox"
      />
      <label class="label" for="checkbox"></label>
    </div>
  )
}
