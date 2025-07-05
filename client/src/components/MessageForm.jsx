import React from "react"

export function MessageForm() {
  return (
    <>
      <form onSubmit={submitevent}>
        <input type="text" placeholder="....enter message here" required />
      </form>
    </>
  )
}
