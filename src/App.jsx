import React from 'react';

function App() {
  const [refresh, setRefresh] = React.useState(false);
  const [quote, setQuote] = React.useState({
    content: '',
    author: '',
  });

  React.useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => setQuote(data));
  }, [refresh]);

  function newQuote() {
    setRefresh(prevValue => !prevValue);
  }

  return (
    <div id="quote-box">
      {quote.content !== '' && (
        <div>
          <p id="text">
            <i class="fa-solid fa-quote-left quotes"></i>
            {quote.content}
            <i class="fa-solid fa-quote-right quotes"></i>
          </p>
          <p id="author">- {quote.author}</p>
          <div className="links">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${quote.content} -${quote.author}`}
              target="_blank">
              <i class="fa-brands fa-twitter"></i>
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
