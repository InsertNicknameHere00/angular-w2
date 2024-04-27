import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  ratingArray=new Array(4);

  public counter=0;
  public modelTitle='';
  public modelNote='';
  public modelAuthor='';
  public modelSize=50;
  public modelRating=1.0;
  public NoMoreRating=false;
  public modelRates=0;

  public BookCollection=[
  {author:'Test Author1',
  title:'Test Title1',
    description:'Test Description1',
    rating:0,
    rates:0,},

    {author:'Test Author2',
    title:'Test Title2',
      description:'Test Description2',
      rating:0,
      rates:0,},

      {author:'Test Author3',
      title:'Test Title3',
        description:'Test Description3',
        rating:0,
        rates:0,},

        {author:'Test Author4',
        title:'Test Title4',
          description:'Test Description4',
          rating:0,
          rates:0,},

        {author:'Test Author5',
        title:'Test Title5',
          description:'Test Description5',
          rating:0,
        rates:0,},
  ];

 

  public ProcessNextBook(){
    this.counter++;

  if (this.counter > this.BookCollection.length - 1) {
    console.log('End of playlist');
    this.counter=0;
}
this.resetTempData();
}

  public ProcessLastBook(){
    this.counter--;

    if (this.counter < 0) {
      console.log('End of playlist');
      this.counter=this.BookCollection.length-1;
  }
  this.resetTempData();
  }

  public ResetBooklist(){
this.counter=0;
this.resetTempData();
}

public ProcessCalculateAverageRating(){
  let currentBook = this.BookCollection[this.counter];
  if (this.modelRating >= 1 && this.modelRating <= 5) {
    currentBook.rating += Number(this.modelRating);
    currentBook.rates++;
    console.log('Rating:', currentBook.rating);
    console.log('Rates:', currentBook.rates);
  }
  this.BookCollection[this.counter].rating = parseFloat((currentBook.rating / currentBook.rates).toFixed(2));
  console.log('Average Rating OF THIS BOOK:', this.BookCollection[this.counter].rating);
  this.counter++;
  if (this.counter > this.BookCollection.length - 1) {
    console.log('End of playlist');
  }
}

public ProcessSave() {
  this.BookCollection[this.counter].title = this.modelTitle;
  this.BookCollection[this.counter].description = this.modelNote;
  this.BookCollection[this.counter].author = this.modelAuthor;
  this.resetTempData();
}

private resetTempData(){
  this.modelTitle='';
  this.modelNote='';
  this.modelAuthor='';
  this.modelRating=1;
  this.modelRates=0;
}

  public ProcessBookEdit(BookElement, index) {
    this.NoMoreRating=false;
    this.counter = index;
this.modelTitle=BookElement.title;
this.modelNote=BookElement.description;
this.modelAuthor=BookElement.author;
this.modelRating=BookElement.rating;
  }

  public ProcessDeleteBook(index){
    this.BookCollection.splice(index,1);
    this.counter=0;
    this.resetTempData();
  }
    public ProcessAddBook(){
      this.BookCollection.push({author:this.modelAuthor,title:this.modelTitle,description:this.modelNote,rating:Number(this.modelRating.toString()),rates:Number(this.modelRates.toString())});
      this.resetTempData();
    }

    public ProcessConfirm(){
      this.NoMoreRating=false;
      this.ResetBooklist();
    }
    
    public ProcessDecline(){
      this.NoMoreRating=true;
      setTimeout(() => { this.NoMoreRating = false; }, 15000);
      this.counter=0;
      this.resetTempData();
    }
  }