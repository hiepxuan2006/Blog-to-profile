import React, { useRef, useState } from "react"
import { InputSearch } from "./InputSearch"

export const Search = ({ isSearch }) => {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }
  const refInput = useRef()
  const onChangeSearch = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className={`Search ${isSearch ? "hide-on" : "hide-off"}`}>
      <h3>Tìm kiếm</h3>
      <InputSearch
        value={value}
        setLoading={setLoading}
        setValue={setValue}
        loading={loading}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
    </div>
  )
}
