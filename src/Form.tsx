import React, { useState } from 'react';

const Form = () => {
  const [text, setText] = useState<string>('');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="submit"
        value='追加'
        onChange={(e) => e.preventDefault()}
      />
    </form>
  )
}

export default Form;
