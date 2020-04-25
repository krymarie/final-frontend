import React, { Component, Fragment } from 'react';

import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
// import FilePicker from '../../Form/Input/FilePicker';
// import Image from '../../Image/Image';
import { required, length } from '../../../util/validators';
import { generateBase64FromImage } from '../../../util/image';

const CLIENT_FORM = {
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

class ClientEdit extends Component {
  state = {
    clientForm: CLIENT_FORM,
    formIsValid: false,
    imagePreview: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedClient !== this.props.selectedClient
    ) {
      const clientForm = {
        clientName: {
          ...prevState.clientForm.clientName,
          value: this.props.selectedClient.clientName,
          valid: true
        },
        image: {
          ...prevState.clientForm.image,
          value: this.props.selectedClient.imagePath,
          valid: true
        },
        address: {
          ...prevState.clientForm.address,
          value: this.props.selectedClient.address,
          valid: true
        },
        phone: {
          ...prevState.clientForm.phone,
          value: this.props.selectedClient.phone,
          valid: true
        },
        interestLevel: {
          ...prevState.clientForm.interestLevel,
          value: this.props.selectedClient.interestLevel,
          valid: true
        },
      };
      this.setState({ clientForm: clientForm, formIsValid: true });
    }
  }

  clientInputChangeHandler = (input, value, files) => {
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
      for (const validator of prevState.clientForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.clientForm,
        [input]: {
          ...prevState.clientForm[input],
          valid: isValid,
          value: files ? files[0] : value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        clientForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        clientForm: {
          ...prevState.clientForm,
          [input]: {
            ...prevState.clientForm[input],
            touched: true
          }
        }
      };
    });
  };

  cancelClientChangeHandler = () => {
    this.setState({
      clientForm: CLIENT_FORM,
      formIsValid: false
    });
    this.props.onCancelEdit();
  };

  acceptClientChangeHandler = () => {
    const post = {
      clientName: this.state.clientForm.clientName.value,
      address: this.state.clientForm.address.value,
      phone: this.state.clientForm.phone.value,
      interestLevel: this.state.clientForm.interestLevel.value,
    };
    this.props.onFinishEdit(post);
    this.setState({
      clientForm: CLIENT_FORM,
      formIsValid: false,
      imagePreview: null
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelClientChangeHandler} />
        <Modal
          title="New Client"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelClientChangeHandler}
          onAcceptModal={this.acceptClientChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="clientName"
              label="Client Name"
              control="input"
              onChange={this.clientInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'clientName')}
              valid={this.state.clientForm['clientName'].valid}
              touched={this.state.clientForm['clientName'].touched}
              value={this.state.clientForm['clientName'].value}
            />
            {/* <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={this.clientInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'image')}
              valid={this.state.clientForm['image'].valid}
              touched={this.state.clientForm['image'].touched}
            />
            <div className="new-client__preview-image">
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
              onChange={this.clientInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'address')}
              valid={this.state.clientForm['address'].valid}
              touched={this.state.clientForm['address'].touched}
              value={this.state.clientForm['address'].value}
            />
            <Input
              id="phone"
              label="Phone"
              control="textarea"
              rows="1"
              onChange={this.clientInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'phone')}
              valid={this.state.clientForm['phone'].valid}
              touched={this.state.clientForm['phone'].touched}
              value={this.state.clientForm['phone'].value}
            />
            <Input
              id="interestLevel"
              label="Interest Level 1-5"
              control="textarea"
              rows="1"
              onChange={this.clientInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'interestLevel')}
              valid={this.state.clientForm['interestLevel'].valid}
              touched={this.state.clientForm['interestLevel'].touched}
              value={this.state.clientForm['interestLevel'].value}
            />
          </form>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default ClientEdit;
