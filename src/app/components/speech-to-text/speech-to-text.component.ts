import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition-service.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  text: string='';

  constructor(public service: VoiceRecognitionService) {
    this.service.init();
  }

  ngOnInit(): void {
    this.service.text$.subscribe((text: string) => {
      this.text = text;
    });
  }

  startService(): void {
    this.service.start();
  }

  stopService(): void {
    this.service.stop();
  }
}