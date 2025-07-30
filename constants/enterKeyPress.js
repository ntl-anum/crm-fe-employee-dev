
export const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") {
      e.preventDefault();
    }
  };
  

