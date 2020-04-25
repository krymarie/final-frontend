import React, { Component, Fragment } from 'react';

import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
// import FilePicker from '../../Form/Input/FilePicker';
// import Image from '../../Image/Image';
import { required, length } from '../../../util/validators';
import { generateBase64FromImage } from '../../../util/image';

const POST_FORM = {
  clientName: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  address: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  phone: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 10 })]
  },
  interestLevel: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 1 })]
  }
};

class FeedEdit extends Component {
  state = {
    postForm: POST_FORM,
    formIsValid: false,
    imagePreview: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedPost !== this.props.selectedPost
    ) {
      const postForm = {
        clientName: {
          ...prevState.postForm.clientName,
          value: this.props.selectedPost.clientName,
          valid: true
        },
        image: {
          ...prevState.postForm.image,
          value: this.props.selectedPost.imagePath,
          valid: true
        },
        address: {
          ...prevState.postForm.address,
          value: this.props.selectedPost.address,
          valid: true
        },
        phone: {
          ...prevState.postForm.phone,
          value: this.props.selectedPost.phone,
          valid: true
        },
        interestLevel: {
          ...prevState.postForm.interestLevel,
          value: this.props.selectedPost.interestLevel,
          valid: true
        },
      };
      this.setState({ postForm: postForm, formIsValid: true });
    }
  }

  postInputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(e => {
          this.setState({ imagePreview: null });
        });
    }
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.postForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.postForm,
        [input]: {
          ...prevState.postForm[input],
          valid: isValid,
          value: files ? files[0] : value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        postForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        postForm: {
          ...prevState.postForm,
          [input]: {
            ...prevState.postForm[input],
            touched: true
          }
        }
      };
    });
  };

  cancelPostChangeHandler = () => {
    this.setState({
      postForm: POST_FORM,
      formIsValid: false
    });
    this.props.onCancelEdit();
  };

  acceptPostChangeHandler = () => {
    const post = {
      clientName: this.state.postForm.clientName.value,
      address: this.state.postForm.address.value,
      phone: this.state.postForm.phone.value,
      interestLevel: this.state.postForm.interestLevel.value,
    };
    this.props.onFinishEdit(post);
    this.setState({
      postForm: POST_FORM,
      formIsValid: false,
      imagePreview: null
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelPostChangeHandler} />
        <Modal
          title="New Client"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelPostChangeHandler}
          onAcceptModal={this.acceptPostChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="clientName"
              label="Client Name"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'clientName')}
              valid={this.state.postForm['clientName'].valid}
              touched={this.state.postForm['clientName'].touched}
              value={this.state.postForm['clientName'].value}
            />
            {/* <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'image')}
              valid={this.state.postForm['image'].valid}
              touched={this.state.postForm['image'].touched}
            />
            <div className="new-post__preview-image">
              {!this.state.imagePreview && <p>Please choose an image.</p>}
              {this.state.imagePreview && (
                <Image imageUrl={this.state.imagePreview} contain left />
              )}
            </div> */}
            <Input
              id="address"
              label="Address"
              control="textarea"
              rows="4"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'address')}
              valid={this.state.postForm['address'].valid}
              touched={this.state.postForm['address'].touched}
              value={this.state.postForm['address'].value}
            />
            <Input
              id="phone"
              label="Phone"
              control="textarea"
              rows="1"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'phone')}
              valid={this.state.postForm['phone'].valid}
              touched={this.state.postForm['phone'].touched}
              value={this.state.postForm['phone'].value}
            />
            <Input
              id="interestLevel"
              label="Interest Level 1-5"
              control="textarea"
              rows="1"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'interestLevel')}
              valid={this.state.postForm['interestLevel'].valid}
              touched={this.state.postForm['interestLevel'].touched}
              value={this.state.postForm['interestLevel'].value}
            />
          </form>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default FeedEdit;
