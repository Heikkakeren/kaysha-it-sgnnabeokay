// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Music player functionality
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    let isPlaying = false;

    // Check if audio file exists
    audioPlayer.addEventListener('loadstart', function() {
        console.log('Audio loading started...');
    });

    audioPlayer.addEventListener('error', function(e) {
        console.log('Audio error:', e);
        // Show gentle message if audio file is missing
        const musicTitle = document.querySelector('.music-title');
        musicTitle.textContent = 'letakkan file sedih.mp3 di folder ini';
        musicTitle.style.fontStyle = 'italic';
        musicTitle.style.color = '#a0aec0';
    });

    audioPlayer.addEventListener('canplaythrough', function() {
        console.log('Audio ready to play');
    });

    // Play/Pause functionality
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            audioPlayer.play().then(() => {
                isPlaying = true;
                playBtn.textContent = '⏸️';
                playBtn.style.background = 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)';
                
                // Add gentle pulsing animation
                playBtn.classList.add('playing');
                addPlayingStyle();
            }).catch(error => {
                console.log('Playback failed:', error);
                showGentle('Tidak bisa memutar musik. Pastikan file sedih.mp3 ada di folder ini.');
            });
        } else {
            audioPlayer.pause();
            isPlaying = false;
            playBtn.textContent = '▶️';
            playBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            playBtn.classList.remove('playing');
        }
    });

    // Volume control
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = this.value / 100;
    });

    // Set initial volume
    audioPlayer.volume = 0.5;

    // Auto-reset when song ends
    audioPlayer.addEventListener('ended', function() {
        isPlaying = false;
        playBtn.textContent = '▶️';
        playBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        playBtn.classList.remove('playing');
    });

    // Message writing functionality
    const userMessage = document.getElementById('userMessage');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const saveNotification = document.getElementById('saveMessage');

    // Load saved message on page load
    loadSavedMessage();

    // Save message
    saveBtn.addEventListener('click', function() {
        const message = userMessage.value.trim();
        if (message) {
            localStorage.setItem('kaysha_message', message);
            showSaveNotification();
            addSaveAnimation();
        } else {
            showGentle('Tulis sesuatu dulu ya... 💙');
        }
    });

    // Clear message
    clearBtn.addEventListener('click', function() {
        if (userMessage.value.trim()) {
            showConfirmDialog('Yakin mau hapus tulisanmu?', function() {
                userMessage.value = '';
                localStorage.removeItem('kaysha_message');
                showGentle('Tulisan sudah dihapus. Kamu bisa mulai lagi kapan aja 💙');
            });
        }
    });

    // Auto-save while typing (gentle auto-save)
    let autoSaveTimeout;
    userMessage.addEventListener('input', function() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            if (userMessage.value.trim()) {
                localStorage.setItem('kaysha_message', userMessage.value);
            }
        }, 2000); // Auto-save after 2 seconds of no typing
    });

    // Breathing exercise functionality
    const breathingCircle = document.getElementById('breathingCircle');
    const breathingText = document.getElementById('breathingText');
    const breathingBtn = document.getElementById('breathingBtn');
    let breathingActive = false;
    let breathingInterval;

    breathingBtn.addEventListener('click', function() {
        if (!breathingActive) {
            startBreathingExercise();
        } else {
            stopBreathingExercise();
        }
    });

    breathingCircle.addEventListener('click', function() {
        if (!breathingActive) {
            startBreathingExercise();
        }
    });

    // Helper functions
    function addPlayingStyle() {
        const style = document.createElement('style');
        style.textContent = `
            .playing {
                animation: gentlePulse 2s infinite ease-in-out;
            }
            @keyframes gentlePulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }

    function loadSavedMessage() {
        const saved = localStorage.getItem('kaysha_message');
        if (saved) {
            userMessage.value = saved;
        }
    }

    function showSaveNotification() {
        saveNotification.classList.remove('hidden');
        setTimeout(() => {
            saveNotification.classList.add('hidden');
        }, 3000);
    }

    function addSaveAnimation() {
        saveBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            saveBtn.style.transform = 'scale(1)';
        }, 150);
    }

    function showGentle(message) {
        // Create a gentle notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
            color: #234e52;
            padding: 15px 20px;
            border-radius: 15px;
            border: 1px solid rgba(129, 230, 217, 0.3);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            font-weight: 500;
            max-width: 300px;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    function showConfirmDialog(message, callback) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: all 0.3s ease;
        `;

        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            margin: 20px;
            transform: scale(0.8);
            transition: all 0.3s ease;
        `;

        dialog.innerHTML = `
            <p style="margin-bottom: 25px; font-size: 1.1rem; color: #4a5568;">${message}</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="confirmYes" style="
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                ">Ya, hapus</button>
                <button id="confirmNo" style="
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
                    color: #4a5568;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                ">Batal</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        // Show with animation
        setTimeout(() => {
            overlay.style.opacity = '1';
            dialog.style.transform = 'scale(1)';
        }, 10);

        // Event listeners
        document.getElementById('confirmYes').addEventListener('click', () => {
            callback();
            closeDialog();
        });

        document.getElementById('confirmNo').addEventListener('click', closeDialog);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeDialog();
        });

        function closeDialog() {
            overlay.style.opacity = '0';
            dialog.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }
    }

    function startBreathingExercise() {
        breathingActive = true;
        breathingBtn.textContent = 'berhenti';
        breathingBtn.style.background = 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)';
        
        let cycle = 0;
        const totalCycles = 5;
        
        function breatheCycle() {
            // Inhale phase
            breathingText.textContent = 'tarik nafas...';
            breathingCircle.classList.remove('breathing-out');
            breathingCircle.classList.add('breathing-in');
            
            setTimeout(() => {
                if (!breathingActive) return;
                
                // Hold phase
                breathingText.textContent = 'tahan...';
                
                setTimeout(() => {
                    if (!breathingActive) return;
                    
                    // Exhale phase
                    breathingText.textContent = 'hembuskan...';
                    breathingCircle.classList.remove('breathing-in');
                    breathingCircle.classList.add('breathing-out');
                    
                    setTimeout(() => {
                        if (!breathingActive) return;
                        
                        cycle++;
                        if (cycle < totalCycles) {
                            breatheCycle();
                        } else {
                            // Finished
                            breathingText.textContent = 'selesai! kamu hebat 💙';
                            setTimeout(() => {
                                if (breathingActive) {
                                    stopBreathingExercise();
                                }
                            }, 2000);
                        }
                    }, 4000); // Exhale for 4 seconds
                }, 2000); // Hold for 2 seconds
            }, 4000); // Inhale for 4 seconds
        }
        
        breatheCycle();
    }

    function stopBreathingExercise() {
        breathingActive = false;
        breathingBtn.textContent = 'mulai latihan nafas';
        breathingBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        breathingText.textContent = 'klik untuk mulai';
        breathingCircle.classList.remove('breathing-in', 'breathing-out');
        
        if (breathingInterval) {
            clearInterval(breathingInterval);
        }
    }

    // Add some gentle interactions
    document.querySelectorAll('.message-card, .music-player, .write-card, .breathing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add a subtle welcome message
    setTimeout(() => {
        showGentle('Selamat datang, Kaysha. Ini tempat amanmu 💙');
    }, 1000);

    // Gentle random encouraging messages
    const encouragingMessages = [
        'Kamu sudah sangat kuat sampai sejauh ini 💙',
        'Gak apa-apa kalau hari ini berat, besok bisa lebih baik ✨',
        'Perasaanmu valid, apapun itu 🤍',
        'Istirahat itu bukan kelemahan, itu kebutuhan 💙',
        'Kamu pantas mendapat kebahagiaan ✨'
    ];

    // Show random message every 5 minutes
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
            showGentle(randomMessage);
        }
    }, 300000); // 5 minutes
});