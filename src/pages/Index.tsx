import { useEffect, useRef, useState } from 'react';

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [userMessage, setUserMessage] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingText, setBreathingText] = useState('klik untuk mulai');

  useEffect(() => {
    // Load saved message
    const saved = localStorage.getItem('kaysha_message');
    if (saved) {
      setUserMessage(saved);
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const saveUserMessage = () => {
    localStorage.setItem('kaysha_message', userMessage);
    setSaveMessage('Pesanmu sudah tersimpan dengan aman 💙');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const clearMessage = () => {
    setUserMessage('');
    localStorage.removeItem('kaysha_message');
  };

  const startBreathing = () => {
    if (isBreathing) return;
    
    setIsBreathing(true);
    let cycle = 0;
    const maxCycles = 5;
    
    const breatheCycle = () => {
      if (cycle >= maxCycles) {
        setBreathingText('selesai 💙');
        setIsBreathing(false);
        setTimeout(() => setBreathingText('klik untuk mulai'), 2000);
        return;
      }
      
      // Tarik nafas
      setBreathingText('tarik nafas...');
      setTimeout(() => {
        // Tahan
        setBreathingText('tahan...');
        setTimeout(() => {
          // Buang nafas
          setBreathingText('buang nafas...');
          setTimeout(() => {
            cycle++;
            breatheCycle();
          }, 4000);
        }, 2000);
      }, 4000);
    };
    
    breatheCycle();
  };

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-70"
            style={{
              left: `${20 + i * 15}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {i % 2 === 0 ? '💙' : '🤍'}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            Untuk Kaysha
          </h1>
          <div className="text-xl text-white/90">✨ tempat tenang untukmu ✨</div>
        </div>

        {/* Music Player */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🎵</div>
              <div className="flex-1 flex items-center gap-4">
                <button
                  onClick={toggleMusic}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <span className="text-white font-medium">musik untuk hati</span>
                <div className="flex items-center gap-2 ml-auto">
                  <span>🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
            <audio ref={audioRef} preload="auto">
              <source src="/sedih.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>

        {/* Message Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">💌</span>
              <span className="text-white text-lg font-medium">pesan untukmu</span>
            </div>
            <div className="text-white/90 leading-relaxed space-y-4">
              <p>aku gak tau pasti apa yang lagi kamu rasain sekarang,</p>
              <p>tapi kalau hatimu lagi gemetar, kalau napasmu berat, dan dunia terasa terlalu ramai</p>
              <p><strong>aku harap kamu tau: gak apa-apa buat merasa lelah. gak apa-apa kalau belum siap cerita apa-apa.</strong></p>
              
              <p>kamu gak harus jelaskan semuanya. cukup istirahat… pelan-pelan aja.</p>
              <p>aku gak datang buat nanya atau maksa apa-apa.</p>
              <p><strong>aku cuma pengen kamu ngerasa gak sendirian,</strong></p>
              <p>meskipun aku bukan lagi orang yang nemenin kamu setiap hari.</p>
              
              <p>aku harap malam ini kamu bisa ketemu tenang, walau sedikit.</p>
              <p>dan semoga besok, hatimu bisa lebih ringan, walau belum pulih sepenuhnya.</p>
              <p><strong>kamu pantas ngerasa tenang, sayang… meskipun dunia lagi berat.</strong></p>
            </div>
          </div>
        </div>

        {/* Write Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">✍️</span>
              <span className="text-white text-lg font-medium">tulis perasaanmu disini</span>
            </div>
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="kamu bisa tulis apa aja disini... gak ada yang akan menghakimi. ini tempat aman untukmu 💙"
              className="w-full h-32 bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={saveUserMessage}
                className="bg-green-500/20 hover:bg-green-500/30 text-white px-6 py-2 rounded-full transition-all duration-200 border border-green-500/20"
              >
                💾 simpan
              </button>
              <button
                onClick={clearMessage}
                className="bg-red-500/20 hover:bg-red-500/30 text-white px-6 py-2 rounded-full transition-all duration-200 border border-red-500/20"
              >
                🗑️ hapus
              </button>
            </div>
            {saveMessage && (
              <div className="mt-4 text-green-300 text-center">{saveMessage}</div>
            )}
          </div>
        </div>

        {/* Breathing Exercise */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-2xl">🫁</span>
              <span className="text-white text-lg font-medium">latihan nafas</span>
            </div>
            <div 
              className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-1000 hover:scale-105"
              onClick={startBreathing}
              style={{
                transform: isBreathing && breathingText === 'tarik nafas...' ? 'scale(1.3)' : 'scale(1)',
                background: isBreathing 
                  ? (breathingText === 'tarik nafas...' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)')
                  : 'rgba(255,255,255,0.2)'
              }}
            >
              <div className="text-white text-center text-sm font-medium">
                {breathingText}
              </div>
            </div>
            <button
              onClick={startBreathing}
              disabled={isBreathing}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white px-6 py-3 rounded-full transition-all duration-200"
            >
              mulai latihan nafas
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/80 text-lg">kamu gak sendirian. ada yang peduli, bahkan dari jauh 💙</p>
        </div>
      </div>

    </div>
  );
};

export default Index;
