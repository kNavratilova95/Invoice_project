import React from "react";

export function FlashMessage({ theme, message }) {
  return <div className={"alert alert-" + theme}>{message}</div>;
}

export default FlashMessage;