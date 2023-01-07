import { useState } from 'react';
import supabase from '../../supabase';
import { CATEGORIES } from '../Categories/Categories';

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('http://example.com');

  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  async function handlerSubmit(e) {
    e.preventDefault();
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      // const newFact = {
      //   id: Math.round(Math.random() * 1000000),
      //   text: text,
      //   source: source,
      //   category: category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: 2023,
      // };
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select();
      console.log(newFact);
      setIsUploading(false);
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      setText('');
      setSource('');
      setCategory('');

      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handlerSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <span>{200 - text.length}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => {
          setSource(e.target.value);
        }}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button class="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

export default NewFactForm;
