import { Component } from '@angular/core';
import { ChatService } from './chat.services';
import { Movie } from '../movieComp/movie.model';

interface ChatMessage {
  text: string;
  isBotResponse: boolean;
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatBotComponent {
  chatMessages: ChatMessage[] = [];
  userInput: string = '';
  showModal: boolean = false;
  topRecommendedMovies: Movie[] = [];

  constructor(private chatService: ChatService) {}

  predefinedOptions: string[] = [
    "What is the status of my ticket?",
    "Best movie of the day",
    "What can you do?",
    "What is your name?"
  ];

  showOptions: boolean = true;
  isLoading: boolean = false;

  selectOption(option: string) {
    this.userInput = option;
    this.showOptions = false;
    this.sendMessage();
  }


  sendMessage() {
    if (this.userInput.trim() === '') return;
  
    // Save user message to chat messages
    this.chatMessages.push({ text: this.userInput, isBotResponse: false });
    this.isLoading = true;
  
    // Check if the user message corresponds to a predefined option
    const isPredefinedOption = this.predefinedOptions.includes(this.userInput);
  
    if (isPredefinedOption) {
      this.showOptions = true;
      this.chatService.sendMessage(this.userInput).subscribe(
        (response) => {
          // Save bot response to chat messages
          this.chatMessages.push({ text: response.response, isBotResponse: true });
          this.isLoading = false;
          // Clear the user input
          this.userInput = '';
        },
        (error) => {
          console.error('Error fetching bot response:', error);
          this.isLoading = false;
          // Handle any error messages or display a toast/notification here
        }
      );
    } else {
    //   this.showOptions = false;
      this.chatService.sendMessage(this.userInput).subscribe(
        (response) => {
          // Save bot response to chat messages
          this.chatMessages.push({ text: response.response, isBotResponse: true });
          this.isLoading = false;
          // Clear the user input
          this.userInput = '';
        },
        (error) => {
          console.error('Error fetching bot response:', error);
          this.isLoading = false;
          // Handle any error messages or display a toast/notification here
        }
      );
    }
  }
}
