/* eslint-disable jsx-a11y/label-has-associated-control,react/jsx-no-bind,react-hooks/exhaustive-deps */
import React, { useEffect, useId } from "react"
import { useDispatch, useSelector } from "react-redux"
import "../style.css"
import InputField from "../../input-field/input-field"
import Button from "../../button/button"
import addNewVideo from "../../../../external_func/add-video/add-video"
import ErrorMessage from "../form_error/form-error"
import { closeForm } from "../../../../external_func/dispatches/dispatches"

export default function VideoForm() {
  const dispatch = useDispatch()
  const close = () => closeForm(dispatch)
  const link = useId()
  const videoName = useId()
  const videoDesc = useId()
  let linkField
  let nameField
  let descField
  useEffect(() => {
    linkField = document.getElementById(`${link}`)
    nameField = document.getElementById(`${videoName}`)
    descField = document.getElementById(`${videoDesc}`)
  })
  function addVideo() {
    addNewVideo(dispatch, linkField.value, nameField.value, descField.value)
  }
  return (
    <div className="add-new-vid">
      <h1>Add New Video</h1>
      <ErrorMessage />
      <form>
        <label htmlFor={link}>
          Youtube Link
          <InputField
            variant="smallText"
            id={link}
            placeholder="Past link..."
          />
        </label>
        <label htmlFor={videoName}>
          Name of video
          <InputField
            variant="smallText"
            id={videoName}
            placeholder="Type name..."
          />
        </label>
        <label htmlFor={videoDesc}>
          Description
          <InputField
            id={videoDesc}
            variant="bigText"
            placeholder="Type description..."
          />
        </label>
        <div className="form-buttons">
          <Button text="Cancel" secondary click={close} />
          <Button text="Submit" click={addVideo} />
        </div>
      </form>
    </div>
  )
}
