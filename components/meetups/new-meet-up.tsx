import React, { ChangeEvent } from 'react';
import useInputHook from '../../hooks/input-hook';
import { MeetUp } from '../../interfaces';

import {
  validate,
  VALIDATE_MIN_LENGTH,
  VALIDATE_REQUIRE,
  Validator,
} from '../../lib/validators';
import Card from '../ui/card';

import classes from './new-meet-up.module.css';

type MeetUpFormProps = {
  onAddMeetup: (meetupData: MeetUp)=> void
}


const MeetUpForm = ({ onAddMeetup }: MeetUpFormProps) => {
  const { inputState, inputHandler } = useInputHook();

  const submitMeetUpHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { title, address, description, image } = inputState.inputs;

    const meetUpData = {
      title: title.val,
      image: image.val,
      address: address.val,
      description: description.val,
    };
    onAddMeetup(meetUpData);
  };

  const inputChangeHandler = ({
    e,
    validators,
    id,
  }: {
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;
    validators: Validator[];
    id: string;
  }) => {
    const enteredValue = e.target.value;
    const isValid = validate(enteredValue, validators);
    inputHandler(id, enteredValue, isValid);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitMeetUpHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input
            type='text'
            id='title'
            required
            onChange={(e) =>
              inputChangeHandler.bind(null, {
                e,
                validators: [VALIDATE_REQUIRE()],
                id: 'title',
              })()
            }
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input
            type='url'
            id='image'
            required
            onChange={(e) =>
              inputChangeHandler.bind(null, {
                e,
                validators: [VALIDATE_REQUIRE()],
                id: 'image',
              })()
            }
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            id='address'
            required
            onChange={(e) =>
              inputChangeHandler.bind(null, {
                e,
                validators: [VALIDATE_REQUIRE()],
                id: 'address',
              })()
            }
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            onChange={(e) =>
              inputChangeHandler.bind(null, {
                e,
                validators: [VALIDATE_MIN_LENGTH(4)],
                id: 'description',
              })()
            }
          />
        </div>
        <div className={classes.actions}>
          <button disabled={!inputState.overallIsValid}>Add MeetUp</button>
        </div>
      </form>
    </Card>
  );
};

export default MeetUpForm;
