import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommentService} from './comment.service';
import {Patient} from '../patient/patient';
import {Comment} from './coment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.html',
  styleUrls: ['./comments.css'],
  providers: [CommentService]
})
export class CommentComponent implements OnChanges {
  displayChange = 0;
  commentPointer: Comment;

  newComment = 'new comment';

  @Input() patient: Patient;
  comments: Comment[];

  constructor(private service: CommentService) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.patient !== undefined) {
      this.service.getComments(this.patient.patientId.toString()).subscribe(data => {
        this.comments = <Comment[]> data;
      });
    }
  }

  changeCommentValue(comment: Comment) {
    this.commentPointer = comment;
    this.displayChange = 1;
  }


  add() {
    let comment: Comment = new Comment(0, this.newComment, this.patient.patientId);
    this.service.addComment(comment).subscribe(data =>{
      comment = <Comment>data;
      this.comments.push(comment);
      console.log('added');
    });
  }

  edit() {
    // let comment: Comment = new Comment(this.commentPointer.commentId,this.commentPointer.commentValue ,this.commentPointer.patientId);
    this.service.editComment(this.commentPointer).subscribe(data => this.commentPointer = <Comment>data);
    this.displayChange = 0;
  }

  delete(comment: Comment) {
    this.service.deleteComment(comment.commentId).subscribe(data =>
    { this.commentPointer = <Comment>data;
      this.comments.filter(p => p !== this.commentPointer);
      console.log('comments delete');
      console.log(data);
    });
    const indexOfComment = this.comments.indexOf(comment);
    this.comments.splice(indexOfComment, 1);

  }


}
