import CommentForm from '../CommentForm';

function CreateComment() {
  const comment = {
    comment: ''
  };

  return (
    <CommmentForm comment={comment} formType='Create Commment'/>
  );
}

export default CreateComment;
