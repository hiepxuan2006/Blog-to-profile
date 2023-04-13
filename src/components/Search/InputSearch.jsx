import React, { useRef } from "react"

export const InputSearch = ({
  isFocused,
  value,
  loading,
  setIsFocused,
  setValue,
  setShowResult,
  dataSearch,
  setDataSearch,
  theme,
}) => {
  const handleFocus = () => {
    setIsFocused(true)

    if (dataSearch.length) {
      setShowResult(true)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!value && dataSearch.length) {
      setShowResult(false)
      setDataSearch([])
    }
  }

  const refInput = useRef()
  const onChangeSearch = (e) => {
    setValue(e.target.value)
  }

  const handleClick = () => {
    setShowResult(false)
    setDataSearch([])
    alert("aaa")
  }
  return (
    <div className={`form__control`}>
      {isFocused || value ? (
        ""
      ) : (
        <i class="fa-solid icon-search fa-magnifying-glass"></i>
      )}
      <input
        ref={refInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChangeSearch}
        type="text"
        placeholder={isFocused ? "" : "Tìm kiếm ..."}
        className="form-input"
      />
      {isFocused && !loading ? (
        <i
          class="fa-regular icon-close icon-show fa-circle-xmark"
          onClick={handleClick}
        ></i>
      ) : (
        ""
      )}
      {value && loading ? (
        <i class="fa-solid icon-loading icon-show fa-spinner"></i>
      ) : (
        ""
      )}
    </div>
  )
}
