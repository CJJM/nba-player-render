import useSWR from 'swr';

import { useState, useEffect } from 'react';

import 'tailwindcss/tailwind.css';

const fetcher = (...args) => fetch(...args).then(res => res.json()).then(final => console.log(final));

export default function Home() {
  const { players, playerError } = useSWR('/api/players', fetcher);
  const { teams, teamError } = useSWR('/api/teams', fetcher);

  function findLogo(playerTeam, teamData) {
    teamData.find(team => (
      playerTeam === team.ta
    ));
  }

  if (playerError || teamError) return <div>failed to load. {errorMsg}</div>
  if (!players || !teams) return <div>loading players</div>
  return (
    <div>
      {/* <Head>
        <title>NBA Player Viewer</title>
        <meta name="description" content="Generated by Connor Maloney" />
        <link rel="icon" href="/nba-favicon.ico" />
      </Head> */}

      <main>
        {
          players.slice(0,6).map((elm, i) => (
            <div key={i} className="playerCard">
              <img src={elm.headshot} alt={elm.slug}/>
              <img src={findLogo(elm.ta, teams)} />
              <div className="player-stats">
                <p>#{elm.num} | {elm.pos}</p>
                <p>{elm.fn}</p>
                <p>{elm.ln}</p>
              </div>
              <div className="points">
                <p>PPG</p>
                <p>{elm.pts}</p>
              </div>
              <div className="rebounds">
                <p>RPG</p>
                <p>{elm.reb}</p>
              </div>
              <div className="assists">
                <p>APG</p>
                <p>{elm.ast}</p>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  )
}
