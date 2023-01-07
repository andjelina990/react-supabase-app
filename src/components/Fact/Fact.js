import { useState } from 'react';
import supabase from '../../supabase';
import { CATEGORIES } from '../Categories/Categories';

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    console.log(updatedFact);
    setIsUpdating(false);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)),
      );
  }
  return (
    <li key={fact.id} class="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔️DISPUTED]</span> : null}
        {fact.text}
        <a
          className="source"
          rel="noreferrer"
          href={fact.source}
          target="_blank"
        >
          (Source)
        </a>
      </p>
      <span
        class="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div class="vote-buttons">
        <button
          onClick={() => handleVote('votesInteresting')}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote('votesMindBlowing')}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindBlowing}
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default Fact;
