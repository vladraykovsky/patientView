import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from './coment';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) {}

  getComments(id: string) {
    return this.http.get('https://morning-anchorage-39495.herokuapp.com/api/comment/patients/' + id);
  }

  addComment(comment: Comment){
    return this.http.post<Comment>('https://morning-anchorage-39495.herokuapp.com/api/comment',comment);
  }

  editComment(comment: Comment){
    return this.http.patch('https://morning-anchorage-39495.herokuapp.com/api/comment',comment);
  }

  deleteComment(commentId: number){
     return this.http.delete('https://morning-anchorage-39495.herokuapp.com/api/comment/'+commentId.toString());
  }


}
