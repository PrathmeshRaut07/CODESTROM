// src/components/tts.ts
export const speakText = (text: string, voiceIndex = 0) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
  
    // Get available voices
    const voices = synth.getVoices();
    
    // Set a specific voice if available
    if (voices.length > voiceIndex) {
      utterance.voice = voices[voiceIndex];
    }
    
    utterance.rate = 1;
    utterance.pitch = 1;
    
    synth.speak(utterance);
  };
  