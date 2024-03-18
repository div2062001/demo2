import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 

declare var webkitSpeechRecognition:any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  private recognition = new webkitSpeechRecognition();
  private isStoppedSpeechRecog = false;
  private textSubject = new Subject<string>();
  public text$ = this.textSubject.asObservable();
  private tempWords: string = '';
  public text = ""

  constructor() {
    this.init();
  }

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  public start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech Recognition Started");

    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End Speech Recognition");
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }

  public stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    console.log("End Speech Recognition");
  }

  private wordConcat(){
    this.text = this.text + ' '+ this.tempWords+ ".";
    this.tempWords = "";
  }
}



















// import { Injectable} from '@angular/core';

// declare var webkitSpeechRecognition:any;

// @Injectable({
//   providedIn: 'root'
// })
// export class VoiceRecognitionServiceService {
// recognition = new webkitSpeechRecognition();
// isStoppedSpeechRecog = false;
// public text = ""
// tempWords;

//   // text: string;
//   constructor() { }
//   init(){
//     this.recognition.interimResults = true;
//     this.recognition.lang = 'en-Us';

//     this.recognition.addEventListener('result', (e) => {
//       const transcript = Array.from(e.results)
//         .map((result) => result[0])
//         .map((result) => result.transcript)
//         .join('');
//       this.tempWords = transcript;
//       console.log(transcript);
      
//     });
//   }


//   start(){
//     this.isStoppedSpeechRecog = false;
//     this.recognition.start();
//     console.log("Speech Recognition Started")
//     this.recognition.addEventListener('end', () => {
//       if(this.isStoppedSpeechRecog){
//         this.recognition.stop();
//         console.log("End Speech Recognition")
//       } else {
//         this.wordConcat()
//         this.recognition.start();
        
//       }
//     });
//   }

//   stop(){
//     this.isStoppedSpeechRecog = true;
//     this.wordConcat()
//     this.recognition.stop();
//     console.log("End Speech Recognition")
//   }

//   wordConcat(){
//     this.text = this.text + ' '+ this.tempWords+ ".";
//     this.tempWords = "";
//   }

// }
