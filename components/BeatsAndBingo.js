'use client'

import React, { useState, useEffect } from 'react';
import { Music, Users, Settings, Play, Pause, RotateCcw, Trophy, Volume2, UserPlus, Grid3X3, MessageCircle } from 'lucide-react';

const BeatsAndBingo = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userType, setUserType] = useState('user');
  const [playerName, setPlayerName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [gameState, setGameState] = useState('waiting');
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [currentSong, setCurrentSong] = useState(null);
  const [players, setPlayers] = useState([]);

  // Sample bingo card data
  const [bingoCard] = useState([
    ['Bohemian Rhapsody', 'Queen', 'Sweet Child O Mine', 'GNR', 'Hotel California'],
    ['The Eagles', 'Stairway to Heaven', 'Led Zeppelin', 'Purple Haze', 'Jimi Hendrix'],
    ['Back in Black', 'AC/DC', '🎵 FREE 🎵', 'Don\'t Stop Believin\'', 'Journey'],
    ['Livin\' on a Prayer', 'Bon Jovi', 'More Than a Feeling', 'Boston', 'Tom Sawyer'],
    ['Rush', 'Welcome to the Jungle', 'GNR', 'We Will Rock You', 'Queen']
  ]);

  const [adminData, setAdminData] = useState({
    sessionName: '',
    maxPlayers: 10,
    genre: 'rock',
    gameMode: 'bingo',
    playlist: []
  });

  const toggleCell = (row, col) => {
    const cellId = `${row}-${col}`;
    const newSelected = new Set(selectedCells);
    if (newSelected.has(cellId)) {
      newSelected.delete(cellId);
    } else {
      newSelected.add(cellId);
    }
    setSelectedCells(newSelected);
  };

  const checkBingo = () => {
    // Simple bingo check logic (you'd expand this)
    return selectedCells.size >= 5;
  };

  // Login Screen
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-4 rounded-full">
              <Music className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Beats and Bingo
          </h1>
          <p className="text-gray-600 mt-2">Music meets gaming</p>
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setUserType('user')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              userType === 'user' 
                ? 'bg-white shadow-sm text-purple-600' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Player
          </button>
          <button
            onClick={() => setUserType('admin')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              userType === 'admin' 
                ? 'bg-white shadow-sm text-purple-600' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Settings className="h-4 w-4 inline mr-2" />
            Admin
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder={userType === 'admin' ? 'Admin Name' : 'Your Name'}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
          
          {userType === 'user' && (
            <input
              type="text"
              placeholder="Session ID"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          )}

          <button
            onClick={() => setCurrentView(userType === 'admin' ? 'admin-setup' : 'game')}
            disabled={!playerName || (userType === 'user' && !sessionId)}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all transform hover:scale-105"
          >
            {userType === 'admin' ? 'Create Session' : 'Join Game'}
          </button>
        </div>
      </div>
    </div>
  );

  // User Game Screen
  const GameScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-cyan-100 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Session: {sessionId}</h2>
              <p className="text-gray-600">Welcome, {playerName}!</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">8/10 players</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Song */}
        {currentSong && (
          <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl p-4 mb-4 text-white shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Volume2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Now Playing</p>
                <p className="text-white/90">{currentSong.title} - {currentSong.artist}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bingo Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Grid3X3 className="h-5 w-5 mr-2" />
              Your Bingo Card
            </h3>
            {checkBingo() && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                <Trophy className="h-4 w-4 inline mr-1" />
                BINGO!
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {bingoCard.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const cellId = `${rowIndex}-${colIndex}`;
                const isSelected = selectedCells.has(cellId);
                const isFree = cell.includes('FREE');
                
                return (
                  <button
                    key={cellId}
                    onClick={() => toggleCell(rowIndex, colIndex)}
                    className={`aspect-square p-2 rounded-lg text-xs font-medium transition-all transform hover:scale-105 ${
                      isFree
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                        : isSelected
                        ? 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cell}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
            <Trophy className="h-4 w-4 inline mr-2" />
            Call Bingo!
          </button>
          <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Admin Setup Screen
  const AdminSetupScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create New Session</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Session Name</label>
                <input
                  type="text"
                  placeholder="Friday Night Beats"
                  value={adminData.sessionName}
                  onChange={(e) => setAdminData({...adminData, sessionName: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Max Players</label>
                <select
                  value={adminData.maxPlayers}
                  onChange={(e) => setAdminData({...adminData, maxPlayers: parseInt(e.target.value)})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value={5}>5 Players</option>
                  <option value={10}>10 Players</option>
                  <option value={20}>20 Players</option>
                  <option value={50}>50 Players</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Genre</label>
                <select
                  value={adminData.genre}
                  onChange={(e) => setAdminData({...adminData, genre: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="rock">Classic Rock</option>
                  <option value="pop">Pop Hits</option>
                  <option value="hiphop">Hip Hop</option>
                  <option value="country">Country</option>
                  <option value="electronic">Electronic</option>
                  <option value="mixed">Mixed Genre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Game Mode</label>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setAdminData({...adminData, gameMode: 'bingo'})}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      adminData.gameMode === 'bingo'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Music Bingo
                  </button>
                  <button
                    onClick={() => setAdminData({...adminData, gameMode: 'quiz'})}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      adminData.gameMode === 'quiz'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Music Quiz
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Playlist Preview</label>
                <div className="bg-gray-50 rounded-xl p-4 h-48 overflow-y-auto">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <span>Bohemian Rhapsody</span>
                      <span className="text-gray-500">Queen</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <span>Sweet Child O' Mine</span>
                      <span className="text-gray-500">Guns N' Roses</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <span>Hotel California</span>
                      <span className="text-gray-500">Eagles</span>
                    </div>
                    <div className="text-center text-gray-400 p-2">
                      + 47 more songs...
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                Import from Spotify
              </button>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => setCurrentView('admin-dashboard')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Create Session
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Admin Dashboard
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Session Info */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Session Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Session ID:</span>
                <span className="font-mono font-bold">ABC123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Players:</span>
                <span className="font-semibold">8/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Genre:</span>
                <span className="capitalize">{adminData.genre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Active</span>
              </div>
            </div>
          </div>

          {/* Player List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Players
            </h3>
            <div className="space-y-2">
              {['Alex', 'Sarah', 'Mike', 'Emma', 'Chris', 'Luna', 'David', 'Maya'].map((name, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">{name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Controls */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Game Controls</h3>
            <div className="space-y-4">
              <button
                onClick={() => setCurrentSong({title: 'Bohemian Rhapsody', artist: 'Queen'})}
                className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Game
              </button>
              
              <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </button>
              
              <button className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors flex items-center justify-center">
                <RotateCcw className="h-4 w-4 mr-2" />
                Next Song
              </button>
              
              <button className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors">
                End Session
              </button>
            </div>
          </div>

          {/* Current Song Display */}
          <div className="lg:col-span-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Music className="h-5 w-5 mr-2" />
              Now Playing
            </h3>
            {currentSong ? (
              <div>
                <p className="text-2xl font-bold">{currentSong.title}</p>
                <p className="text-white/80 text-lg">{currentSong.artist}</p>
                <div className="mt-4 bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-1/3 transition-all"></div>
                </div>
              </div>
            ) : (
              <p className="text-white/80">No song playing - Ready to start!</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Game Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Songs Played</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-gray-600">Bingos</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">12:34</div>
                <div className="text-sm text-gray-600">Game Time</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">47</div>
                <div className="text-sm text-gray-600">Total Songs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  switch (currentView) {
    case 'login':
      return <LoginScreen />;
    case 'game':
      return <GameScreen />;
    case 'admin-setup':
      return <AdminSetupScreen />;
    case 'admin-dashboard':
      return <AdminDashboard />;
    default:
      return <LoginScreen />;
  }
};

export default BeatsAndBingo;
