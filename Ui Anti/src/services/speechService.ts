// Speech Service handling SpeechRecognition and SpeechSynthesis

export interface SpeechRecognitionResultCallback {
  (text: string, isFinal: boolean): void;
}

export interface SpeechRecognitionErrorCallback {
  (error: string): void;
}

class SpeechService {
  private isVoiceEnabled: boolean = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private recognition: any = null;
  private isRecognizing: boolean = false;
  private onSpeakingStateChangeListeners: ((speaking: boolean, currentMessageId?: string) => void)[] = [];
  private activeSpeakingMessageId?: string;

  constructor() {
    try {
      const saved = localStorage.getItem('college_ai_voice_enabled');
      this.isVoiceEnabled = saved !== null ? saved === 'true' : true;
    } catch {
      this.isVoiceEnabled = true;
    }

    this.initRecognition();
  }

  public getVoiceEnabled(): boolean {
    return this.isVoiceEnabled;
  }

  public setVoiceEnabled(enabled: boolean): void {
    this.isVoiceEnabled = enabled;
    try {
      localStorage.setItem('college_ai_voice_enabled', String(enabled));
    } catch {
      // ignore
    }
    if (!enabled) {
      this.stopSpeaking();
    }
  }

  private initRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;

    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      } catch (err) {
        console.warn('SpeechRecognition initialization error:', err);
      }
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    return typeof window !== 'undefined' && (
      'SpeechRecognition' in window ||
      'webkitSpeechRecognition' in window ||
      'mozSpeechRecognition' in window ||
      'msSpeechRecognition' in window
    );
  }

  public startListening(
    onResult: SpeechRecognitionResultCallback,
    onError?: SpeechRecognitionErrorCallback,
    onEnd?: () => void
  ): boolean {
    if (!this.isSpeechRecognitionSupported() || !this.recognition) {
      if (onError) onError('Voice input is not supported in this browser. You can type your question instead.');
      return false;
    }

    if (this.isRecognizing) {
      this.stopListening();
    }

    this.stopSpeaking();

    this.recognition.onstart = () => {
      this.isRecognizing = true;
    };

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const text = finalTranscript || interimTranscript;
      onResult(text, Boolean(finalTranscript));
    };

    this.recognition.onerror = (event: any) => {
      this.isRecognizing = false;
      let msg = 'Voice recognition error occurred.';
      if (event.error === 'not-allowed') {
        msg = 'Microphone permission was denied. Please allow microphone access in your browser.';
      } else if (event.error === 'no-speech') {
        msg = 'No speech was detected. Please try speaking again.';
      }
      if (onError) onError(msg);
    };

    this.recognition.onend = () => {
      this.isRecognizing = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (err) {
      console.warn('Error starting speech recognition:', err);
      this.isRecognizing = false;
      if (onError) onError('Unable to start microphone.');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isRecognizing) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isRecognizing = false;
    }
  }

  public isSpeechSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  public addSpeakingListener(listener: (speaking: boolean, currentMessageId?: string) => void): () => void {
    this.onSpeakingStateChangeListeners.push(listener);
    return () => {
      this.onSpeakingStateChangeListeners = this.onSpeakingStateChangeListeners.filter(l => l !== listener);
    };
  }

  private notifySpeakingState(speaking: boolean, messageId?: string) {
    this.activeSpeakingMessageId = speaking ? messageId : undefined;
    this.onSpeakingStateChangeListeners.forEach(listener => listener(speaking, messageId));
  }

  public cleanTextForSpeech(rawText: string): string {
    return rawText
      .replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[*_~`#>\-•]/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\(B\.E\. \/ B\.Tech\)/gi, 'B E and B Tech')
      .replace(/P\.T\. Lee CNCET/gi, 'P T Lee College of Engineering')
      .replace(/CSE/gi, 'Computer Science and Engineering')
      .replace(/IT/gi, 'Information Technology')
      .replace(/ECE/gi, 'Electronics and Communication')
      .trim();
  }

  public speak(text: string, messageId?: string, force: boolean = false): void {
    if (!this.isSpeechSynthesisSupported()) return;
    if (!this.isVoiceEnabled && !force) return;

    this.stopSpeaking();

    const cleanText = this.cleanTextForSpeech(text);
    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira'))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.notifySpeakingState(true, messageId);
      };

      utterance.onend = () => {
        this.notifySpeakingState(false);
        this.currentUtterance = null;
      };

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('Speech synthesis error:', e);
        }
        this.notifySpeakingState(false);
        this.currentUtterance = null;
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis invocation failed:', err);
      this.notifySpeakingState(false);
    }
  }

  public stopSpeaking(): void {
    if (this.isSpeechSynthesisSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.currentUtterance = null;
    this.notifySpeakingState(false);
  }

  public isCurrentlySpeaking(): boolean {
    return (
      this.isSpeechSynthesisSupported() &&
      window.speechSynthesis.speaking &&
      !window.speechSynthesis.paused
    );
  }

  public getActiveSpeakingMessageId(): string | undefined {
    return this.activeSpeakingMessageId;
  }
}

export const speechService = new SpeechService();
