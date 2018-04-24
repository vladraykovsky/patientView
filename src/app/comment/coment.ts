export class Comment {

  public commentId: number ;
  public commentValue: string;
  public patientId: number;

  constructor(_comments_id: number, _comment_value: string, _patient_id: number) {
    this.commentId = _comments_id;
    this.commentValue = _comment_value;
    this.patientId = _patient_id;
  }

}
