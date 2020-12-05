import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: "",
      author: "",
      comment: "",
      touched: {
        rating: false,
        author: false,
        comment: false
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
}


  render() {
    return (
      <React.Fragment>
        <Button type="submit" outline onClick={this.toggleModal} className="mb-4">
          <i className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>

            <LocalForm onSubmit={values => this.handleSubmit(values)}>

              <div className="form-group">
                <Label htmlfor="rating">Rating</Label>
                <Control.select model=".rating" name="rating" id="rating" className="form-control">
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlfor="author">Your Name</Label>
                <Control.text 
                  model=".author" 
                  name="author" 
                  id="author" 
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                      required: 'Required',
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlfor="comment">Comment</Label>
                <Control.textarea
                  model=".text"
                  name="text"
                  id="text"
                  rows="6"
                  className="form-control"
                />
              </div>

              <Button type="submit" value="submit" color="primary">Submit</Button>

            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comments) => {
          return (
            <div key={comments.id}>
              <p>{comments.text}</p>
              <p>
                {comments.author}{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comments.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm />
      </div>
    );
  }
  return <div />;
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default CampsiteInfo;
