import React from 'react';

function App() {
  const [refresh, setRefresh] = React.useState(false);
  const [quote, setQuote] = React.useState({
    content: '',
    author: '',
  });
  const [color, setColor] = React.useState(randomPastelColor());

  React.useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => setQuote(data));
    document.documentElement.style.setProperty('--primary-color', color);
  }, [refresh]);

  function randomPastelColor() {
    return (
      'hsl(' +
      360 * Math.random() +
      ',' +
      (25 + 10 * Math.random()) +
      '%,' +
      (50 + 10 * Math.random()) +
      '%)'
    );
  }

  function newQuote() {
    setRefresh(prevValue => !prevValue);
    setColor(randomPastelColor);
    document.documentElement.style.setProperty('--primary-color', color);
  }

  return (
    <div id="quote-box">
      {quote.content !== '' && (
        <div>
          <div id="text-box">
            <i className="fa-solid fa-quote-left quotes left-quote"></i>
            <p id="text">{quote.content}</p>
            <i className="fa-solid fa-quote-right quotes right-quote"></i>
          </div>
          <p id="author">- {quote.author}</p>
          <div className="links">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${quote.content} -${quote.author}`}
              target="_blank">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <button id="new-quote" onClick={newQuote}>
              New Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
