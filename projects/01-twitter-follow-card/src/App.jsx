import React from 'react'

import './App.css'
import TwitterFollowCard from './TwitterFollowCard'

const users = [
  {
    userName: 'reddit.com',
    name: 'Pagina de Reddit',
    isFollowing: true
  },
  {
    userName: 'sigridbazan',
    name: 'Sigrid Bazan',
    isFollowing: false
  },
  {
    userName: 'midudev',
    name: 'Miguel Angel Duran',
    isFollowing: true
  }
]

const App = () => {
  return (
    <div className='App'>
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </div>
  )
}

export default App
